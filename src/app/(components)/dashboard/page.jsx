"use client";
import { useUser } from "@clerk/nextjs";
import Search from "../Search/Search";
import Spinner from "../Spinner/Spinner";

export default function Index() {
  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded) return <Spinner />;
  return (
    <>
      <Search profile={user} />
    </>
  );
}
