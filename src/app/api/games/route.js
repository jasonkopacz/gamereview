import { NextResponse } from "next/server";
import { supabase } from "../../database";

export async function GET(req) {
  if (req.method === "GET") {
    const { data, error } = await supabase.from("games_old").select(`*`);

    return NextResponse.json({ games: data }, { status: 200 });
  }
  return NextResponse.json({ error: error }, { status: 404 });
}
