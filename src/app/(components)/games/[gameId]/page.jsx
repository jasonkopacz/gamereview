'use client'
// import { supabase } from "@/app/database"
import React from 'react';
import styles from './page.module.css'
import Image from "next/image"
import { Suspense } from "react";
import ReviewForm from "./ReviewForm";
import useSWR from 'swr';
import Spinner from '../../Spinner/Spinner';

const fetcher = (...args) => fetch(...args).then((res) => res.json())
export default function Game({ params: { gameId } }, reviewForm, setReviewForm) {
  const { data, error } = useSWR(`/api/games/${gameId}`, fetcher)
  if (error) return <div>Something went wrong</div>
  if (!data) return <Spinner />
  
  let game = data.game;

  function handleTextbox(e) {
    e.preventDefault();
    return (
      <ReviewForm />
    )
  }
  return (
    <Suspense>
      <div className={styles.wrapper}>
        <div className={styles.headerWrapper}>
          <h2 className={styles.headerItem}>{`${game.name} - ${game.rating} / 5`}</h2>
          <p className={styles.headerItem}>{game.released}</p>
          <p className={styles.headerItem}>{`Metacritic Score: ${game.metacritic}`}</p>
          <p className={styles.headerItem}>{`ESRB Rating: ${game.esrb_rating}`}</p>
        </div>
        <Image src={game.background_image} alt={game.name} height={300} width={400} />
        <p className={styles.headerItem}>{`${game.reviews_text_count} Reviews`}</p>
        <button onClick={() => handleTextbox}>Leave review</button>
      </div>
    </Suspense>
  )
}