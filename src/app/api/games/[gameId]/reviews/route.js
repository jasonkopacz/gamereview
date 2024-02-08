import { NextResponse } from 'next/server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(req, {params: {gameId}}) {
  if (req.method === 'GET') {
    const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('game_id', gameId)
    
    return NextResponse.json({game: data}, { status: 200 })
  }
  return NextResponse.json({error: error}, {status: 404 })
}

export async function POST(req) {
  if (req.method === 'POST') {
    try {
      const review = await req.json();
      const supabase = createServerComponentClient({ cookies });
      const { data: { user }} = await supabase.auth.getUser();
      if (user.id !== review.userId) { return NextResponse.json({error: "Unauthorized"}, {status: 401 }) }
      
      await supabase.from('reviews').insert([
        { 
          profile_id: review.userId, 
          game_id: review.gameId, 
          review_text: review.reviewText, 
          rating: review.rating, 
          posted: review.posted 
        }
      ])
      return NextResponse.json({review: review}, { status: 200 })
    } catch (error) {
      return NextResponse.json({error: error}, {status: 404 })
    }
  }
}