import { supabase } from "@/app/database";
import { NextResponse } from 'next/server'

export async function GET(req, {params: {gameId}}) {
  if (req.method === 'GET') {
    const { data, error } = await supabase
    .from('games')
    .select('*')
    .eq('id', gameId)
    .single()
    
    return NextResponse.json({game: data}, { status: 200 })
  }
  return NextResponse.json({error: error}, {status: 404 })
}
