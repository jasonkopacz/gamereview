import { NextResponse } from 'next/server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(req) {
  if (req.method === 'GET') {
    const supabase = createServerComponentClient({ cookies });
    const profileId = req.url.split('/').slice(-1)

    const { data, error } = await supabase
    .from('reviews')
    .select(`*`)
    .eq('profile_id', profileId)

    // console.log(data)
    
    return NextResponse.json({reviews: data}, { status: 200 })
  }
  return NextResponse.json({error: error}, {status: 404 })
}