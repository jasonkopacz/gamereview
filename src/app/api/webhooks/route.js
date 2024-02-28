import { Webhook } from "svix";
import { headers } from "next/headers";
import { supabase } from "@/app/database";
import { auth } from "@clerk/nextjs";
import { buffer } from "micro";

export async function POST(req) {
  console.log("WEBHOOK");
  const { getToken } = auth();
  const WEBHOOK_SECRET = process.env.WEBHOOK_SIGNING_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const headerPayload = headers();
  const headers = req.headers;
  console.log(headerPayload);
  console.log(headers);
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400
    });
  }
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;
  try {
    evt = wh.verify(headerPayload, headers);
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400
    });
  }
  console.log(evt);

  const payload = await req.json();
  const body = JSON.stringify(payload);
  const token = await getToken({ template: "supabase" });
  supabase.auth.setAuth(token);
  Console.log("SUPABASE TIME");
  console.log(payload);
  const { id, first_name, last_name, username, image_url } = payload.data;
  const full_name = first_name + "" + last_name;
  const email = payload.data.email_addresses[0].email_address;
  const { data, error } = await supabase.from("profiles").insert({
    clerk_id: id,
    full_name,
    username,
    email,
    avatar_url: image_url
  });
  if (error) console.log(error);
  if (data) console.log(data);

  return new Response("Profile Created", { status: 200 });
}
