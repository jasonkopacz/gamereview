'use client'
import React from "react";
import styles from './Index.module.css'
import { GET_GAMES } from "@/app/api/route"
import useSWR from "swr";
import Spinner from "../Spinner/Spinner";
// const fetcher = (...args) => fetch(...args, {key: process.env.RAWG_API_KEY, headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000'}})
//     .then((res) => res.json())

export default function Index() {
    const [search, setSearch] = React.useState('');
    const [games, setGames] = React.useState([])
    const id = React.useId();
    // const { data, error, isLoading } = useSWR(`https://api.rawg.io/api/games?search=halo`, fetcher)
    // if (error) return <div>failed to load</div>
    // else if (isLoading) return <Spinner />

    // React.useEffect(() => {
    //     GET_GAMES()
    //   }, [])
    
    return (
        <div className={styles.wrapper}>
            <form>
                <label htmlFor={`${id}-search`}>
                    Search
                </label>
                <input type="text" placeholder="Search for games" value={search} onChange={(e) => (setSearch(e.target.value))}></input>
                <div className={styles.actions}>
                    {/* <button className={styles.action} onClick={handleSubmit}>Submit</button> */}
                </div>
            </form>
        </div>
    )
}