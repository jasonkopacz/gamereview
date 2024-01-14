import styles from './game.module.css';
import Image from 'next/image';
import Spinner from '../Spinner/Spinner';
import { Suspense } from 'react';

export function Game( { game }) {
    return (
        <div className={styles.wrapper}>
            <Suspense fallback={<Spinner />}>
                <div key={game.id}>
                    {game.name}
                    <Image
                        src={game.background_image}
                        alt={game.name}
                        width={200}
                        height={200} 
                        loading='lazy'
                        />
                </div>
            </Suspense>
        </div>
    )
}