import { NextResponse } from 'next/server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(req) {
  if (req.method === 'GET') {
    const supabase = createServerComponentClient({ cookies });
    const { data: { user }} = await supabase.auth.getUser();

    const { data, error } = await supabase
    .from('profiles')
    .select(`
      *
    `)
    .eq('id', user.id)
    .single();
    
    return NextResponse.json({user: data}, { status: 200 })
  }
  return NextResponse.json({error: error}, {status: 404 })
}