import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function postReview(data) {
  'use server'
  const supabase = createServerComponentClient({ cookies });
  const { data: { user }} = await supabase.auth.getUser();
  console.log(user);
  return;
  let review = { gameId: game.id, reviewText: data.reviewText, rating: data.rating}
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
  }
}