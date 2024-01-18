'use client'
import React from 'react';
import styles from './game.module.css';
import Image from 'next/image';
import Spinner from '../Spinner/Spinner';
import { Suspense } from 'react';
import Link from 'next/link';
import { Rating } from 'react-simple-star-rating';

export function Game( { game }) {
	const [rating, setRating] = React.useState(game.rating)

  const handleRating = (rate) => {
    setRating(rate)
  }
    return (
        <Suspense fallback={<Spinner />}>
					<div className={styles.wrapper}>
						<Link href={`/games/${game.id}`}>
							{game.name}
							<Image
									src={game.background_image}
									alt={game.name}
									width={250}
									height={200} 
									loading='lazy'
									/>
						</Link>
					{/* <Rating onClick={handleRating} initialValue={rating} /> */}
					</div>
        </Suspense>
    )
}