"use client";
import React from "react";
import styles from "./page.module.css";
import * as Tabs from "@radix-ui/react-tabs";
import Spinner from "../Spinner/Spinner";
import useSWR from "swr";
import { fetcher } from "../../helpers/fetcher";
import Library from "./Library/Library";
import Reviews from "./Reviews/Reviews";
import { useUser } from "@clerk/nextjs";

export default function Account() {
  const { isSignedIn, user, isLoaded } = useUser();

  const { data, error } = useSWR(`/api/profile/${user.username}`, fetcher);
  if (!isLoaded) {
    return <Spinner />;
  }
  if (error) return console.log(error);
  if (!data) return <Spinner />;

  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          <Tabs.Root className={styles.tabsRoot} defaultValue="tab2">
            <Tabs.List
              aria-label="Profile Overview"
              className={styles.tabsList}
            >
              <Tabs.Trigger className={styles.tabsTrigger} value="tab1">
                Library
              </Tabs.Trigger>
              <Tabs.Trigger className={styles.tabsTrigger} value="tab2">
                Reviews
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content className={styles.tabsContent} value="tab1">
              <Library profile={data.profile} />
            </Tabs.Content>
            <Tabs.Content className={styles.tabsContent} value="tab2">
              <Reviews profile={data.profile} />
            </Tabs.Content>
          </Tabs.Root>
        </header>
      </div>
    </>
  );
}
