// let url = ('https://api.rawg.io/api/games')
// export async function GET_GAMES() {
//   const res = await fetch(url, {
//     headers: {
//       'Content-Type': 'application/json',
//       "Access-Control-Allow-Origin": "*",
//       'key': process.env.RAWG_API_KEY,
//     },
//   })
//   const data = await res.json()
//  console.log(data)
//   return Response.json({ data })
// }
// const merge = require('lodash/merge');
// const token = '25c2bcabe0f84c32b4c1a41d66f18c9b'

// const defaultHeaders = {
//   headers: {
//     'content-type': 'application/json',
//     'accept': 'application/json'
//   }
// };

// export async function get (path, options = {}) {
//   const resp = await fetch(path, merge(options, { headers: { token } }, defaultHeaders));
//   const json = await resp.json();

//   return json;
// }

// import { get } from "@/app/api/route"
// import styles from './Index.module.css'
// import useSWR from "swr";
// import Spinner from "../Spinner/Spinner";
// const fetcher = (...args) => fetch(...args, {key: process.env.RAWG_API_KEY, headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000'}})
//     .then((res) => res.json())

// export default function Index() {
//     const { data, error, isLoading } = useSWR(`https://api.rawg.io/api/games?search=halo`, fetcher)
//     if (error) return <div>failed to load</div>
//     else if (isLoading) return <Spinner />

//     React.useEffect(() => {
//         setGames(data)
//       }, [])
    
//     return (
//         <div className={styles.wrapper}>
//             <form>
//                 <label htmlFor={`${id}-search`}>
//                     Search
//                 </label>
//                 <input type="text" placeholder="Search for games" value={search} onChange={(e) => (setSearch(e.target.value))}></input>
//                 <div className={styles.actions}>
//                     {/* <button className={styles.action} onClick={handleSubmit}>Submit</button> */}
//                 </div>
//             </form>
//         </div>
//     )
// }