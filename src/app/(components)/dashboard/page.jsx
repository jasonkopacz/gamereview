import { Game } from '../game/game';
import styles from './page.module.css';
import { supabase } from "@/app/database";

export default async function Index() {
    const { error, data: games} = await supabase
    .from('games_old')
    .select('*')

    return (
			<>
				<h1 className={styles.title}>Popular Titles</h1>
				<ul className={styles.wrapper}>
					{games.map((game) => ( 
						<li className={styles.item} key={game.id}>
								<Game game={game} />
						</li>
					))}
				</ul>
			</>
    )
}