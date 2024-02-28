import { Rating } from "react-simple-star-rating";
import styles from "./page.module.css";
import { formatDate } from "../../../helpers/dateHelper";

export default function Review({ review }) {
  return (
    <li className={styles.wrapper}>
      <h3 className={styles.head}>
        {review.username} on {formatDate(review.posted)}
      </h3>
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
