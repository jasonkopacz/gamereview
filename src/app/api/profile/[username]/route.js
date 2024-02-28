import { NextResponse } from "next/server";
import { supabase } from "@/app/database";

export async function GET(req, { params: { username } }) {
  if (req.method === "GET") {
    if (!username) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log(username);
    const { data, error } = await supabase
      .from("profiles")
      .select(`*`)
      .eq("username", username)
      .single();
    if (error) console.log(error);
    if (data) console.log(data);
    return NextResponse.json({ profile: data }, { status: 200 });
  }
  return NextResponse.json({ error: error }, { status: 404 });
}

// reviews:reviews(*),
// games:games(*)
