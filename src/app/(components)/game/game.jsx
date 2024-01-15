import React from 'react';
import styles from './game.module.css';
import Image from 'next/image';
import Spinner from '../Spinner/Spinner';
import { Suspense } from 'react';
import Link from 'next/link';

export function Game( { game }) {

    return (
        <Suspense fallback={<Spinner />}>
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
        </Suspense>
    )
}