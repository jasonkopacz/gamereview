"use client";
import React from "react";
import { Game } from "../game/game";
import styles from "./page.module.css";
import Spinner from "../Spinner/Spinner";
import { fetcher } from "../../helpers/fetcher";
import useSWR from "swr";
import Search from "../Search/Search";

export default function Index() {
  // const { data, error, isLoading } = useSWR(`/api/games`, fetcher);
  // if (error) return <div>Something went wrong</div>;
  // if (isLoading) return <Spinner />;

  // const games = data.games;
  return (
    <>
      <Search />
      {/* <ul className={styles.wrapper}> */}
      {/* {games.map((game) => (
          <li className={styles.item} key={game.id}>
            <Game game={game} />
          </li>
        ))} */}
      {/* </ul> */}
    </>
  );
}
