import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export async function GET(req) {
  if (req.method === "GET") {
    const { userId, getToken } = auth();
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }
    const token = await getToken({ template: "supabase" });
    const { data, error } = await supabase
      .from("profiles")
      .select(
        `*,
      reviews:reviews(*),
      games:games(*)
    `
      )
      .eq("id", userId)
      .single();

    if (error) return NextResponse.json({ error: error }, { status: 404 });
    return NextResponse.json({ user: data }, { status: 200 });
  }
  return NextResponse.json({ error: error }, { status: 404 });
}
