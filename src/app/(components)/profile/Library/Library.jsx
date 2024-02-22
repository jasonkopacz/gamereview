import Spinner from "../../Spinner/Spinner";
import styles from "./Library.module.css";
import useSWR from "swr";
import { fetcher } from "../../../helpers/fetcher";
import Image from "next/image";
import { capitalizeFirstLetter } from "../../../helpers/capitalize";
import Link from "next/link";

export default function Library({ games }) {
  // const queryString = `userId=${user.id}&ids=${user.games.join(",")}`
  // const { data, error } = useSWR(`/api/user/${user.id}/games?${queryString}`, fetcher)

  // if (error) return <div>Failed to load</div>;
  // if (!data) return <Spinner />;
  // console.log(data);
  // const games = data.games
  // const reviews = games.forEach(game => {
  //   return
  //   // game.reviews.filter(review => (
  //   //   review.profile_id === user.id
  //   // ))
  //   })

  // console.log(reviews)
  // function showReview(e) {

  // }
  return !games ? (
    <p>No games saved</p>
  ) : (
    <>
      <section className={styles.header}>
        <h2>My games</h2>
        <table className={styles.table}>
          <thead>
            {games.map((game, id) => (
              <tr
                style={{ backgroundImage: `url(${game.background_image})` }}
                className={styles.gameImage}
                key={game.id}
                onClick={() => showReview(id)}
              >
                <td className={styles.column}>{game.name}</td>
                <td className={styles.column}>{game.released}</td>
                <td className={styles.column}>{game.metacritic}</td>
                <td className={styles.column}>
                  {capitalizeFirstLetter(game.esrb_rating)}
                </td>
              </tr>
            ))}
          </thead>
        </table>
      </section>
    </>
  );
}
