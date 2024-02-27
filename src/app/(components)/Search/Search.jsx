import {
  InstantSearch,
  SearchBox,
  Hits,
  RefinementList
} from "react-instantsearch";
import Image from "next/image";
import { Highlight } from "react-instantsearch";
import styles from "./Search.module.css";
import Link from "next/link";
import { searchClient } from "./searchClient";
import { RatingMenu } from "./RatingMenu";

export function Hit({ hit }) {
  return (
    <Link href={`/games/${hit.objectID}`}>
      <Image
        src={hit.background_image}
        alt={hit.name}
        width={300}
        height={300}
        sizes="100vw"
        style={{
          width: "70%",
          height: "auto"
        }}
        loading="lazy"
        className={styles.image}
      />
      <h1>{hit.name}</h1>
      <p>{hit.released}</p>
      <p>{hit.rating} / 5</p>
    </Link>
  );
}

export default function Search() {
  return (
    <div className={styles.wrapper}>
      <InstantSearch
        searchClient={searchClient}
        indexName="games"
        future={{
          preserveSharedStateOnUnmount: true,
          persistHierarchicalRootCount: true
        }}
        className={styles.search}
      >
        <div className={styles.sidebar}>
          <label className="label" htmlFor="genres">
            Genres
          </label>
          <RefinementList
            id="genres"
            attribute="genres"
            className={styles.sidebarItem}
          />
          <label className="label" htmlFor="tags">
            Tags
          </label>
          <RefinementList
            id="tags"
            attribute="tags"
            className={styles.sidebarItem}
          />
        </div>
        <div className={styles.hits}>
          <SearchBox
            placeholder="Search for games"
            className={styles.searchBox}
          />
          <Hits hitComponent={Hit} className={styles.hit}></Hits>
        </div>
      </InstantSearch>
      <div className={styles.rightBar}></div>
    </div>
  );
}

// {
//     "name": "The Last Of Us",
//     "slug": "the-last-of-us",
//     "genres": [
//         "Action",
//         "Adventure"
//     ],
//     "tags": [
//         "exclusive"
//     ],
//     "platforms": [
//         "PlayStation 3",
//         "PlayStation 4"
//     ],
//     "released": "2013-06-14",
//     "background_image": "https://media.rawg.io/media/games/a5a/a5a7fb8d9cb8063a8b42ee002b410db6.jpg",
//     "screenshots": [
//         "https://media.rawg.io/media/games/a5a/a5a7fb8d9cb8063a8b42ee002b410db6.jpg",
//         "https://media.rawg.io/media/screenshots/e58/e5851e0c9b08172369dc1a1814b1c275.jpg",
//         "https://media.rawg.io/media/screenshots/4a8/4a8bc73ffc37e6794fd962736d0a5436.jpg",
//         "https://media.rawg.io/media/screenshots/fd5/fd5e75708c5d123519f5329344d0a376.jpg",
//         "https://media.rawg.io/media/screenshots/bf4/bf4453d613de19b737fbd5e6f5e1a069.jpg",
//         "https://media.rawg.io/media/screenshots/e2e/e2e3d4facc46efbded4898106db91cc6.jpg",
//         "https://media.rawg.io/media/screenshots/d07/d077fc6929186334ef47716abd5fd119.jpg"
//     ],
//     "esrb_rating": "Mature",
//     "rating": 4.57,
//     "metacritic": 95,
//     "objectID": "4397920001",
//     "_highlightResult": {
//         "name": {
//             "value": "The Last Of Us",
//             "matchLevel": "none",
//             "matchedWords": []
//         },
//         "genres": [
//             {
//                 "value": "Action",
//                 "matchLevel": "none",
//                 "matchedWords": []
//             },
//             {
//                 "value": "Adventure",
//                 "matchLevel": "none",
//                 "matchedWords": []
//             }
//         ],
//         "tags": [
//             {
//                 "value": "exclusive",
//                 "matchLevel": "none",
//                 "matchedWords": []
//             }
//         ]
//     },
//     "__position": 19
// }
