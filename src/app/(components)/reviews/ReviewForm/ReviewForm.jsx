"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import styles from "./ReviewForm.module.css";
import { Rating } from "react-simple-star-rating";
import VisuallyHidden from "../../VisuallyHidden/VisuallyHidden";
import { motion } from "framer-motion";
import Spinner from "../../Spinner/Spinner";
import { useUser } from "@clerk/nextjs";
import useSWR from "swr";
import { fetcher } from "@/app/helpers/fetcher";

export default function ReviewForm({
  game,
  handleDismiss,
  reviews,
  setReviews
}) {
  const [rating, setRating] = React.useState(game.rating);
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    handleSubmit,
    register,
    control,
    formState: { errors }
  } = useForm();

  const { isSignedIn, user, isLoaded } = useUser();
  const { data, error, loading } = useSWR(
    `/api/profile/${user.username}`,
    fetcher
  );
  console.log(data);
  async function postReview(reviewData) {
    setIsLoading(true);
    if (!reviewData) return <Spinner />;
    console.log(user);
    const review = {
      userId: data.profile.id,
      username: data.profile.username,
      gameId: game.id,
      reviewText: reviewData.reviewText,
      rating: reviewData.rating,
      posted: new Date()
    };

    try {
      const response = await fetch(`/api/games/${game.id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(review)
      });

      const result = await response.json();

      setReviews([...reviews, result.review]);
      setIsLoading(false);
      handleDismiss();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <motion.form
      action={postReview}
      onSubmit={handleSubmit(postReview)}
      className={styles.reviewForm}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <label htmlFor="reviewText" className={styles.label}>
        Review
      </label>
      <VisuallyHidden>Review</VisuallyHidden>
      <textarea
        rows="3"
        {...register("reviewText", { required: true })}
        className={styles.review}
      />
      {errors.reviewText && (
        <span className={styles.error}>This field is required</span>
      )}
      <label htmlFor="rating" className={styles.label}>
        Rating
      </label>
      <Controller
        name="rating"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Rating
            {...field}
            value={field.value}
            ref={null}
            onClick={(value) => {
              field.onChange(value);
              setRating(value);
            }}
            allowFraction={true}
            transition={true}
            emptyColor="black"
            fillClassName={styles.fill}
            className={styles.rating}
            showTooltip={true}
          />
        )}
      />
      {errors.rating && (
        <span className={styles.error}>This field is required</span>
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        <input type="submit" className={styles.submit} />
      )}
    </motion.form>
  );
}
