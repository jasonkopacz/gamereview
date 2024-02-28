import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(req, { params: { gameId } }) {
  const supabase = createServerComponentClient({ cookies });

  if (req.method === "GET") {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("game_id", gameId);

      return NextResponse.json({ reviews: data }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 404 });
    }
  }
}

export async function POST(req) {
  if (req.method === "POST") {
    try {
      const supabase = createServerComponentClient({ cookies });
      const review = await req.json();
      const formattedReview = {
        profile_id: review.userId,
        username: review.username,
        game_id: review.gameId,
        review_text: review.reviewText,
        rating: review.rating,
        posted: review.posted
      };
      const response = await supabase.from("reviews").insert(formattedReview);

      if (response.status === 201) {
        return NextResponse.json({ review: formattedReview }, { status: 200 });
      }
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 404 });
    }
  }
}
