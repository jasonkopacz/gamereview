'use client'
import React from "react";
import { useForm, Controller } from "react-hook-form"
import styles from './ReviewForm.module.css'
import { Rating } from "react-simple-star-rating";
import VisuallyHidden from "../../VisuallyHidden/VisuallyHidden"
import { motion } from 'framer-motion';
import Spinner from "../../Spinner/Spinner";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function ReviewForm({ game }) {
  const [rating, setRating] = React.useState(game.rating);  
  const {
    handleSubmit,
    watch,
    register,
    control,
    formState: { errors }
  } = useForm()
  const supabase = createClientComponentClient();

  async function postReview(data) {
    const { data: { user }} = await supabase.auth.getUser();
    const posted = new Date();
    const review = { 
      userId: user.id, 
      gameId: game.id, 
      reviewText: data.reviewText, 
      rating: data.rating, 
      posted: posted
    };

    try {
      const response = await fetch(`/api/games/${game.id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      });
      
      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    };
  };
  
  
  return (
    <motion.form 
      action={postReview}
      onSubmit={handleSubmit(postReview)} className={styles.reviewForm}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <label htmlFor="reviewText" className={styles.label}>
        Review
      </label>
      <VisuallyHidden>Review</VisuallyHidden>
      <textarea rows='3' {...register("reviewText", { required: true })} className={styles.review}/>
      {errors.reviewText && <span className={styles.error}>This field is required</span>}
      <label htmlFor="rating" className={styles.label}>
        Rating
      </label>
      <Controller
        name="rating"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Rating {...field}
            value={field.value}
            ref={null}
            onClick={(value) => {
              field.onChange(value)
              setRating(value)
            }} 
            allowFraction={true}
            transition={true}
            emptyColor='black'
            fillClassName={styles.fill}
            className={styles.rating}
            showTooltip={true}
          />
      )}
      />
      {errors.rating && <span className={styles.error}>This field is required</span>}
      <input type="submit" className={styles.submit}/>
    </motion.form>
  )
}