import {
  InstantSearch,
  SearchBox,
  Hits,
  RefinementList
} from "react-instantsearch";
import algoliasearch from "algoliasearch";
import Image from "next/image";
import { Highlight } from "react-instantsearch";

const searchClient = algoliasearch(
  "XCSKC80H99",
  "0c30af18ea1cc20f3fb81e8f98ede5db"
);

export const searchIndex = searchClient.initIndex("games");
const replicaIndex = searchClient.initIndex("games_release_date_desc");
searchIndex.setSettings({
  distinct: 1,
  attributeForDistinct: "name",
  customRanking: ["desc(rating)"]
});

export function Hit({ hit }) {
  console.log(hit.objectID);
  return (
    <Link href={`/games/${hit.objectID}`}>
      <Image
        src={hit.background_image}
        alt={hit.name}
        height={300}
        width={300}
      />
      <h1>{hit.name}</h1>
      <Highlight attribute="name" hit={hit} />
      <p>{hit.released}</p>
      <p>{hit.rating}</p>
    </Link>
  );
}

export default function Search() {
  return (
    <InstantSearch searchClient={searchClient} indexName="games">
      <RelevantSort isRelevantSorted={true} />
      <RefinementList attribute="genres" />
      <SearchBox />
      <Hits hitComponent={Hit} />
    </InstantSearch>
  );
}

import { useConnector } from "react-instantsearch";
import connectRelevantSort from "instantsearch.js/es/connectors/relevant-sort/connectRelevantSort";
import Link from "next/link";

export function useRelevantSort(props) {
  return useConnector(connectRelevantSort, props);
}

export function RelevantSort(props) {
  const { isRelevantSorted, refine } = useRelevantSort(props);
  const relevancyStrictness = isRelevantSorted ? 0 : undefined;

  return (
    <button type="button" onClick={() => refine(relevancyStrictness)}>
      {isRelevantSorted ? "See all results" : "See relevant results"}
    </button>
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
