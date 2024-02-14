import { NextResponse } from 'next/server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(req) {
  const supabase = createServerComponentClient({ cookies });
  if (req.method === 'GET') {
    const { data, error } = await supabase
    .from('reviews')
    .select('*')
    
    return NextResponse.json({reviews: data}, { status: 200 })
  }
  return NextResponse.json({error: error}, {status: 404 })
}