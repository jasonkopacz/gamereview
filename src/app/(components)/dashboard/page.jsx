import { Game } from '../game/game';
import styles from './page.module.css';
import { supabase } from "@/app/database";

export default async function Index() {
    let { data: games, error } = await supabase
    .from('games')
    .select('*');
    return (
        <div className={styles.wrapper}>
					{games.map((game) => ( 
						<ul key={game.id} className='row'>
							<li className='column'>
									<Game game={game} />
							</li>
						</ul>
					))}
        </div>
    )
}