import Spinner from "../../Spinner/Spinner";
import styles from "./Reviews.module.css";
import useSWR from "swr";
import { fetcher } from "../../../helpers/fetcher";
import { formatDate } from "../../../helpers/dateHelper";
import ReactShowMoreText from "react-show-more-text";
export default function Reviews({ profile }) {
  const swrKey = profile && profile.id ? `/api/reviews/${profile.id}` : null;

  const { data, error } = useSWR(swrKey, fetcher);

  if (!data) return <Spinner />;
  if (error) return <div>{error}</div>;
  const reviews = data.reviews;

  return !reviews ? (
    <p>No reviews saved</p>
  ) : (
    <>
      <section className={styles.container}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.tableHeader}>
              <th>Review</th>
              <th>Rating</th>
              <th>Posted</th>
            </tr>
            {reviews.map((review) => (
              <tr className={styles.review} key={review.id}>
                <ReactShowMoreText
                  lines={3}
                  more="Show more"
                  less="Show less"
                  expanded={false}
                  width={280}
                  truncatedEndingComponent={"... "}
                >
                  <td className={styles.column}>{review.review_text}</td>
                </ReactShowMoreText>
                <td className={styles.column}>{review.rating}</td>
                <td className={styles.column}>{formatDate(review.posted)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
