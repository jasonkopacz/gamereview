'use client'
import React from 'react';
import styles from './game.module.css';
import Image from 'next/image';
import Spinner from '../Spinner/Spinner';
import { Suspense } from 'react';
import Link from 'next/link';
import { Rating } from 'react-simple-star-rating';
const apiKey = 'd769c6d72b58557bdef8f2c3893df62f330b04d6';
const baseUrl = 'https://www.giantbomb.com/api';

async function getDetails(id) {
	const url = `${baseUrl}/game/${id}/?api_key=${apiKey}&format=json`;
	const response = await fetch(url);
	const data = await response.json();
	console.log(data);
	return data;
}

export function Game( { game }) {
	const [rating, setRating] = React.useState(game.rating);

	const handleRating = (rate) => {
		setRating(rate);
}
    return (
        <Suspense fallback={<Spinner />}>
					<div className={styles.wrapper}>
						<Link href={`/games/${game.id}`} >
							<p className={styles.gameName}>{game.name}</p>
							<Image
									src={game.background_image}
									alt={game.name}
									width={300}
									height={300}
									sizes="100vw"
									// Make the image display full width
									style={{
										width: '100%',
									}}
									loading='lazy'
									className={styles.gameImage}
									/>
						</Link>
						<Suspense fallback={<Spinner />}>
							<Rating 
								onClick={handleRating} 
								initialValue={rating} 
								allowFraction={true}
								transition={true} 
								emptyColor='white'
								readonly={true}
								fillClassName={styles.fill}
								showTooltip={true}
								>
							</Rating>
						</Suspense>
					</div>
        </Suspense>
    )
}