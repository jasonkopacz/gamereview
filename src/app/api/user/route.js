import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { auth, currentUser } from "@clerk/nextjs";

export async function GET(req) {
  if (req.method === "GET") {
    const user = await currentUser();
    const supabase = createServerComponentClient({ cookies });

    const { data, error } = await supabase
      .from("profiles")
      .select(`*`)
      .eq("id", user.id)
      .single();

    if (error) return NextResponse.json({ error: error }, { status: 404 });
    return NextResponse.json({ user: data }, { status: 200 });
  }
  return NextResponse.json({ error: error }, { status: 404 });
}
