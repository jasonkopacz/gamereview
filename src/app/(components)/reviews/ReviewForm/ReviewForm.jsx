'use client'
import React from "react";
import { useForm, Controller } from "react-hook-form"
import styles from './ReviewForm.module.css'
import { Rating } from "react-simple-star-rating";
import VisuallyHidden from "../../VisuallyHidden/VisuallyHidden"
import { motion } from 'framer-motion';

export default function ReviewForm({ game, toggleIsModalOpen}) {
  const [rating, setRating] = React.useState('0');

  const {
    handleSubmit,
    watch,
    register,
    control,
    formState: { errors }
  } = useForm()

  const onSubmit = (data) => console.log(data)

  console.log(watch('reviewText'))
  console.log(watch('rating'))

  return (
    <motion.form onSubmit={handleSubmit(onSubmit)} className={styles.reviewForm}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <label htmlFor="reviewText" className={styles.label}>
        Review
      </label>
      <VisuallyHidden>Review</VisuallyHidden>
      <textarea rows='5' {...register("reviewText", { required: true })} className={styles.review}/>
      {errors.reviewText && <span className={styles.error}>This field is required</span>}
      <label htmlFor="rating" className={styles.label}>
        Rating
      </label>
      <Controller
        name="rating"
        control={control}
        rules={{ required: true }}
        render={({ field }) => 
          <Rating {...field}
            onChange={field.onChange}
            onBlur={field.onBlur}
            value={field.value} 
            ref={null}
            onClick={(rating) => setRating(rating)} 
            allowFraction={true}
            transition={true}
            emptyColor='black'
            fillClassName={styles.fill}
            className={styles.rating}
            showTooltip={true}
          />
        }
      />
      {errors.rating && <span className={styles.error}>This field is required</span>}
      <input type="submit" className={styles.submit}/>
    </motion.form>
  )
}