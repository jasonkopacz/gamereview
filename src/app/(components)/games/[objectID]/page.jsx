"use client";
import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { Suspense } from "react";
import ReviewForm from "../../reviews/ReviewForm/ReviewForm";
import useSWR from "swr";
import Spinner from "../../Spinner/Spinner";
import Modal from "../../Modal/Modal";
import useToggle from "../../../hooks/useToggle";
import Review from "../../reviews/[reviewId]/page";
import { capitalizeFirstLetter } from "../../../helpers/capitalize";
import { Rating } from "react-simple-star-rating";
import { searchIndex } from "../../Search/Search";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Game({ params: { objectID } }) {
  const [reviews, setReviews] = React.useState([]);
  const [game, setGame] = React.useState({});
  const [isModalOpen, toggleIsModalOpen] = useToggle(false);
  const [Loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    searchIndex.getObject(objectID).then((game) => {
      if (game) setGame(game);
    });
    fetch(`/api/games/${objectID}/reviews`)
      .then((response) => response.json())
      .then((data) => setReviews(data.reviews));
    setLoading(false);
  }, []);

  return (
    <>
      <Suspense>
        <header className={styles.block}>
          <div
            style={{ backgroundImage: `url(${game.background_image})` }}
            className={styles.backgroundWrapper}
          />
          <h2 className={styles.title}>{`${game.name}`}</h2>
        </header>
        <div className={styles.wrapper}>
          <div className={styles.headerWrapper}>
            <p
              className={styles.headerItem}
            >{`Release Date: ${game.released}`}</p>
            <p
              className={styles.headerItem}
            >{`Metacritic Score: ${game.metacritic}`}</p>
            <p
              className={styles.headerItem}
            >{`ESRB Rating: ${game.esrb_rating}`}</p>
            <p className={styles.headerItem}>{`${reviews.length} Reviews`}</p>
          </div>
          <button className={styles.action} onClick={toggleIsModalOpen}>
            Add review
          </button>
          {isModalOpen && (
            <Modal title="Leave Review" handleDismiss={toggleIsModalOpen}>
              <ReviewForm
                game={game}
                handleDismiss={toggleIsModalOpen}
                reviews={reviews}
                setReviews={setReviews}
              />
            </Modal>
          )}
          {reviews.length === 0 ? (
            <p className={styles.noReviews}>No reviews yet</p>
          ) : (
            <div className={styles.reviewsWrapper}>
              <h2 className={styles.reviewsHeader}>Reviews</h2>
              <ul className={styles.reviewContainer}>
                {reviews.map((review, id) => (
                  <Review key={id} review={review} />
                ))}
              </ul>
            </div>
          )}
        </div>
      </Suspense>
    </>
  );
}
