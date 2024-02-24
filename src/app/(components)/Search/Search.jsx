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

const index = searchClient.initIndex("games");
const replicaIndex = searchClient.initIndex("games_release_date_desc");

replicaIndex.setSettings({
  customRanking: ["desc(rating)"]
});

export function Hit({ hit }) {
  return (
    <article>
      <Image
        src={hit.background_image}
        alt={hit.name}
        height={300}
        width={300}
      />
      <h1>{hit.name}</h1>
      <Highlight attribute="name" hit={hit} />
      <p>${hit.release_date}</p>
    </article>
  );
}

export default function Search() {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="games_release_date_desc"
    >
      <RelevantSort isRelevantSorted={true} />
      <RefinementList attribute="genres" />
      <SearchBox />
      <Hits hitComponent={Hit} />
    </InstantSearch>
  );
}

import { useConnector } from "react-instantsearch";
import connectRelevantSort from "instantsearch.js/es/connectors/relevant-sort/connectRelevantSort";

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
