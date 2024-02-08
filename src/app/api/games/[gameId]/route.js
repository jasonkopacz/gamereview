import { supabase } from "@/app/database";
import { NextResponse } from 'next/server'

export async function GET(req, {params: {gameId}}) {
  if (req.method === 'GET') {
    const { data, error } = await supabase
    .from('games_old')
    .select('*, reviews (review_text, rating)')
    .eq('id', gameId)
    .single()
    
    console.log(data)
    return NextResponse.json({game: data}, { status: 200 })
  }
  return NextResponse.json({error: error}, {status: 404 })
}

export async function POST(req, {params: {profileId, gameId, review: {reviewText, rating, posted, updated}}}) {
  if (req.method === 'POST') {
    const { data, error } = await supabase
    .from('reviews')
    .insert([
      { profile_id: profileId, game_id: gameId, review_text: reviewText, rating: rating, posted: posted, updated: updated }
    ])
    return NextResponse.json({review: data}, { status: 200 })
  }
  return NextResponse.json({error: error}, {status: 404 })
}