import { supabase } from "@/app/database";
import { NextResponse } from 'next/server'

export async function GET(req) {
  if (req.method === 'GET') {
    const { data, error } = await supabase
    .from('reviews')
    .select('*')
    
    return NextResponse.json({reviews: data}, { status: 200 })
  }
  return NextResponse.json({error: error}, {status: 404 })
}