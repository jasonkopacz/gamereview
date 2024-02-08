'use client'
import React from 'react';
import styles from './reviews.module.css'
import useSWR from 'swr';
import Spinner from '../../Spinner/Spinner';
import Review from '../../reviews/[reviewId]/page';

const fetcher = (...args) => fetch(...args).then((res) => res.json())
export default function Reviews({ gameId  }) {
  const { data, error } = useSWR(`/api/games/${gameId}/reviews`, fetcher)
    if (error) return <div>Something went wrong</div>
    if (!data) return <Spinner />
    
    let reviews = data.reviews;

    return (
      <div className={styles.wrapper}>
        <h2 className={styles.reviewsHeader}>Reviews</h2>
        <ul className={styles.reviewContainer}>
          {reviews.map((review) => (
            <Review key={review.id} review={review} />
          ))}
        </ul>
      </div>
    )
}