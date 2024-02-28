import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(req) {
  if (req.method === "GET") {
    const supabase = createServerComponentClient({ cookies });
    const ids = Array.from(req.nextUrl.searchParams.get("ids").split(","));

    const { data, error } = await supabase
      .from("games_old")
      .select(`*, reviews:reviews(*)`)
      .in("id", ids);

    if (error) return NextResponse.json({ error: error }, { status: 404 });
    return NextResponse.json({ games: data }, { status: 200 });
  }
  return NextResponse.json({ error: error }, { status: 404 });
}
