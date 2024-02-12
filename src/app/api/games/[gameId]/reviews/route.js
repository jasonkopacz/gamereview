import { NextResponse } from 'next/server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(req, {params: {gameId}}) {
  const supabase = createServerComponentClient({ cookies });
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
      .from('reviews')
      .select('*, profile:profile_id(username)')
      .eq('game_id', gameId)
      return NextResponse.json({reviews: data}, { status: 200 })
    } catch (error) {
       return NextResponse.json({error: error}, {status: 404 })
    }
  }
}

export async function POST(req) {
  if (req.method === 'POST') {
    try {
      const review = await req.json();
      const supabase = createServerComponentClient({ cookies });
      const { data: { user }} = await supabase.auth.getUser();
      if (user.id !== review.userId) { return NextResponse.json({error: "Unauthorized"}, {status: 401 }) }
      
      const response = await supabase.from('reviews').insert([
        { 
          profile_id: review.userId,
          username: review.username,
          game_id: review.gameId, 
          review_text: review.reviewText, 
          rating: review.rating, 
          posted: review.posted 
        }
      ])
      console.log(response)
      return NextResponse.json({review: review}, { status: 200 })
    } catch (error) {
      return NextResponse.json({error: error}, {status: 404 })
    }
  }
}