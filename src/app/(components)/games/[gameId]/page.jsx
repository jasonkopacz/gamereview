import { supabase } from "@/app/database"
import styles from './page.module.css'
import Image from "next/image"
import { Suspense } from "react";

export default async function Game({ params: { gameId } }) {
  let { data, error } = await supabase
  .from('games')
  .select('*')
  .eq('id', gameId)

  let game = data[0];
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
      </div>
    </Suspense>
  )
}