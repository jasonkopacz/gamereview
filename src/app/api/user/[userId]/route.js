import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { auth } from "@clerk/nextjs";

export async function GET(req) {
  console.log(req.url.split("/").slice(-1)[0]);
  const userId = req.url.split("/").slice(-1)[0];
  if (req.method === "GET") {
    const { userId, getToken } = auth();
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }
    const token = await getToken({ template: "supabase" });
    // const supabase = createServerComponentClient({ cookies });

    const { data, error } = await supabase
      .from("profiles")
      .select(
        `
      *,
      reviews:reviews(*),
      games:games(*)
    `
      )
      .eq("id", userId)
      .single();
    // console.log(data);
    return NextResponse.json({ user: data }, { status: 200 });
  }
  return NextResponse.json({ error: error }, { status: 404 });
}
