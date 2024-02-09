import { Rating } from "react-simple-star-rating";
import styles from './page.module.css'

export default function Review({ review }) {
  function formatDate(date) {
    return new Date(date).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
  }

  console.log(review)

  return (
    <li className={styles.wrapper}>
      <h3 className={styles.head}>{review.username} on {formatDate(review.posted)}</h3>
      <Rating
        initialValue={review.rating}
        readonly
        showTooltip
        className={styles.rating}
      />
      <p className={styles.review}>{review.review_text}</p>
    </li>
  );
}