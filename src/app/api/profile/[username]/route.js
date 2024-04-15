import { NextResponse } from "next/server";
import { supabase } from "../.././../database";

export async function GET(req, { params: { username } }) {
  if (req.method === "GET") {
    if (!username) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("profiles")
      .select(`*`)
      .eq("username", username)
      .single();
    if (error) return NextResponse.json({ error: error }, { status: 404 });

    return NextResponse.json({ profile: data }, { status: 200 });
  }
  return NextResponse.json({ error: error }, { status: 404 });
}
