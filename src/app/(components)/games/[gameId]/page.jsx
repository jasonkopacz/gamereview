'use client'
import React from 'react';
import styles from './page.module.css'
import Image from "next/image"
import { Suspense } from "react";
import ReviewForm from "../../reviews/ReviewForm/ReviewForm";
import useSWR from 'swr';
import Spinner from '../../Spinner/Spinner';
import Modal from '../../Modal/Modal';
import useToggle from '@/app/hooks/useToggle';

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Game({ params: { gameId } }) {
  const [isModalOpen, toggleIsModalOpen] = useToggle(false);


  const { data, error } = useSWR(`/api/games/${gameId}`, fetcher)
  if (error) return <div>Something went wrong</div>
  if (!data) return <Spinner />
  
  let game = data.game;

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <>
      <Suspense>
        <div className={styles.wrapper}>
          <Image 
            src={game.background_image} 
            alt={game.name} 
            priority={true}
            height={300} 
            width={400}
            sizes="100vw"
            className={styles.gameImage}
            style={{
              width: '75%',
              height: 'auto'
            }}
            />
          <div className={styles.headerWrapper}>
            <h2 className={styles.headerItem}>{`${game.name} - ${game.rating} / 5`}</h2>
            <p className={styles.headerItem}>{`Release Date: ${game.released}`}</p>
            <p className={styles.headerItem}>{`Metacritic Score: ${game.metacritic}`}</p>
            <p className={styles.headerItem}>{`ESRB Rating: ${capitalizeFirstLetter(game.esrb_rating)}`}</p>
          </div>
          <p className={styles.headerItem}>{`${game.reviews_text_count} Reviews`}</p>
          {isModalOpen && (
            <Modal
              title="Leave Review"
              handleDismiss={toggleIsModalOpen}
            >
              <ReviewForm game={game}/>
            </Modal>
          )}
          <button onClick={toggleIsModalOpen}>
            Leave review
          </button>
        </div>
      </Suspense>
    </>
  )
}