import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(req) {
  if (req.method === "GET") {
    const supabase = createServerComponentClient({ cookies });
    console.log(req.nextUrl.searchParams);
    const ids = Array.from(req.nextUrl.searchParams.get("ids").split(","));
    // const profileId = req.nextUrl.searchParams.get('userId')

    const { data, error } = await supabase
      .from("games_old")
      .select(`*, reviews:reviews(*)`)
      .in("id", ids);

    return NextResponse.json({ games: data }, { status: 200 });
  }
  return NextResponse.json({ error: error }, { status: 404 });
}
