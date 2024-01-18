'use client'
import VisuallyHidden from "../../VisuallyHidden/VisuallyHidden"
export default function ReviewForm() {
  const [review, setReview] = useState('')

  return (
    <form>
      <label htmlFor="review">
        Review
      </label>
      <VisuallyHidden>Review</VisuallyHidden>
      <textarea
        id="review"
        name="review"
        value={review}
        onChange={(e) => setReview(e.target.value)} />
        <button type="submit" onSubmit={() => handleSubmit}>Submit</button>
    </form>
  )
}