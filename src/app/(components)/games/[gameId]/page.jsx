'use client'
import React from 'react';
import styles from './page.module.css'
import Image from "next/image"
import { Suspense } from "react";
import ReviewForm from "../../reviews/ReviewForm/ReviewForm";
import useSWR from 'swr';
import Spinner from '../../Spinner/Spinner';
import Modal from '../../Modal/Modal';
import useToggle from '../../../hooks/useToggle';
import Review from '../../reviews/[reviewId]/page';
import { capitalizeFirstLetter } from '../../../helpers/capitalize';
import { Rating } from 'react-simple-star-rating';

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Game({ params: { gameId } }) {
  const [reviews, setReviews] = React.useState([]);
  const [isModalOpen, toggleIsModalOpen] = useToggle(false);


  const { data, error, isLoading } = useSWR(`/api/games/${gameId}`, fetcher)
  React.useEffect(() => {
    if (data && data.game && data.game.reviews) {
      setReviews(data.game.reviews);
    }
  }, [data]);

  if (error) return <div>Something went wrong</div>
  if (isLoading) return <Spinner />
  let game = data.game;

  return (
    <>
      <Suspense>
          <header className={styles.block}>
            <div style={{'backgroundImage': `url(${game.background_image})`}} className={styles.backgroundWrapper} />
            <h2 className={styles.title}>{`${game.name}`}</h2>
          </header>
        <div className={styles.wrapper}>
          <div className={styles.headerWrapper}>
            <p className={styles.headerItem}>{`Release Date: ${game.released}`}</p>
            <p className={styles.headerItem}>{`Metacritic Score: ${game.metacritic}`}</p>
            <p className={styles.headerItem}>{`ESRB Rating: ${capitalizeFirstLetter(game.esrb_rating)}`}</p>
            <p className={styles.headerItem}>{`${game.reviews_text_count} Reviews`}</p>
          </div>
            <button className={styles.action} onClick={toggleIsModalOpen}>
            Add review
          </button>
          {isModalOpen && (
            <Modal
              title="Leave Review"
              handleDismiss={toggleIsModalOpen}
            >
              <ReviewForm game={game} handleDismiss={toggleIsModalOpen} reviews={reviews} setReviews={setReviews}/>
            </Modal>
          )}
          {reviews.length === 0 ? <p className={styles.noReviews}>No reviews yet</p> :
            <div className={styles.reviewsWrapper}>
              <h2 className={styles.reviewsHeader}>Reviews</h2>
              <ul className={styles.reviewContainer} >
                {reviews.map((review, id) => (
                  <Review key={id} review={review} />
                ))}
              </ul>
            </div>
          }
        </div>
      </Suspense>
    </>
  )
}