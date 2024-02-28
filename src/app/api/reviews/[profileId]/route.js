import { NextResponse } from "next/server";
import { supabase } from "@/app/database";

export async function GET(req, { params }) {
  if (req.method === "GET") {
    const profileId = params.profileId;

    const { data, error } = await supabase
      .from("reviews")
      .select(`*`)
      .eq("profile_id", profileId);

    if (error) return NextResponse.json({ error: error }, { status: 404 });

    return NextResponse.json({ reviews: data }, { status: 200 });
  }
  return NextResponse.json({ error: error }, { status: 404 });
}
