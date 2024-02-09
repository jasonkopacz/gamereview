import { supabase } from "@/app/database";
import { NextResponse } from 'next/server'

export async function GET(req, {params: {gameId}}) {
  if (req.method === 'GET') {
    const { data, error } = await supabase
    .from('games_old')
    .select(`
      *,
      reviews:reviews(*)
    `)
    .eq('id', gameId)
    .single();
    
    return NextResponse.json({game: data}, { status: 200 })
  }
  return NextResponse.json({error: error}, {status: 404 })
}

export async function POST(req, {params: {profileId, username, gameId, review: {reviewText, rating, posted, updated}}}) {
  if (req.method === 'POST') {
    const { data, error } = await supabase
    .from('reviews')
    .insert([
      { profile_id: profileId, username: username, game_id: gameId, review_text: reviewText, rating: rating, posted: posted, updated: updated }
    ])
    return NextResponse.json({review: data}, { status: 200 })
  }
  return NextResponse.json({error: error}, {status: 404 })
}