import { currentUser } from "@clerk/nextjs";
import { supabase } from "../../../database";

export async function POST(req) {
  const user = await currentUser();
  const payload = await req.json();
  const gameId = payload.gameId;

  if (req.method === "POST") {
    const { data, error } = await supabase
      .from("profiles")
      .select("games")
      .eq("username", user.username)
      .single();

    if (error) {
      console.error("Error fetching data:", error);
      return;
    }

    if (!data?.games?.includes(gameId)) {
      const updatedArray = [...data.games, gameId];

      const { error } = await supabase
        .from("profiles")
        .update({ games: updatedArray })
        .eq("username", username);

      if (error) {
        console.error("Error updating data:", error);
      } else {
        console.log("Array updated successfully");
      }
    } else {
      console.log("Value already exists in the array");
    }

    return NextResponse.json({ review: data }, { status: 200 });
  }
  return NextResponse.json({ error: error }, { status: 404 });
}
