import { Rating } from "react-simple-star-rating";
import styles from "./page.module.css";
import { formatDate } from "../../../helpers/dateHelper";
import ShowMoreText from "react-show-more-text";

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
      <ShowMoreText
        lines={3}
        more="Show more"
        less="Show less"
        expanded={false}
        width={280}
        truncatedEndingComponent={"... "}
      >
        <p className={styles.review}>{review.review_text}</p>
      </ShowMoreText>
    </li>
  );
}
