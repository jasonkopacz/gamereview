import Spinner from "../../Spinner/Spinner";
import styles from "./Reviews.module.css";
import useSWR from "swr";
import { fetcher } from "../../../helpers/fetcher";
import { formatDate } from "../../../helpers/dateHelper";

export default function Reviews({ profile }) {
  const { data, error } = useSWR(`/api/reviews/${profile.id}`, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <Spinner />;
  const reviews = data.reviews;
  console.log(reviews);

  return !reviews ? (
    <p>No reviews saved</p>
  ) : (
    <>
      <section className={styles.container}>
        <table className={styles.table}>
          <tr className={styles.tableHeader}>
            <th>Review</th>
            <th>Rating</th>
            <th>Posted</th>
          </tr>
          {reviews.map((review) => (
            <tr className={styles.review} key={review.id}>
              <td className={styles.column}>{review.review_text}</td>
              <td className={styles.column}>{review.rating}</td>
              <td className={styles.column}>{formatDate(review.posted)}</td>
            </tr>
          ))}
        </table>
      </section>
    </>
  );
}
