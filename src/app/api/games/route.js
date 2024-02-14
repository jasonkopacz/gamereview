import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from 'next/server'

export async function GET(req) {
  const supabase = createServerComponentClient({ cookies });
  if (req.method === 'GET') {
    const { data, error } = await supabase
    .from('games_old')
    .select(`*`)
    
    return NextResponse.json({games: data}, { status: 200 })
  }
  return NextResponse.json({error: error}, {status: 404 })
}
