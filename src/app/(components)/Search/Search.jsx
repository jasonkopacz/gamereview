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

const index = searchClient.initIndex("one");

export function Hit({ hit }) {
  return (
    <article>
      <Image
        src={hit.background_image}
        alt={hit.name}
        height={300}
        width={300}
      />
      {hit.genres.map((genre, i) => (
        <p key={i}>{genre}</p>
      ))}
      {hit.tags.map((tag, i) => (
        <p key={i}>{tag}</p>
      ))}
      {hit.platforms.map((platform, i) => (
        <p key={i}>{platform}</p>
      ))}
      <p>{hit.released}</p>
      <p>{hit.esrb_rating}</p>
      <p>{hit.rating}</p>
      <p>{hit.metacritic}</p>
      <Highlight attribute="title" hit={hit} />
      <p>${hit.release_date}</p>
    </article>
  );
}

export default function Search() {
  return (
    <InstantSearch searchClient={searchClient} indexName="one">
      <RefinementList attribute="genres" />
      <RefinementList attribute="tags" />
      <SearchBox />
      <Hits hitComponent={Hit} />
    </InstantSearch>
  );
}
