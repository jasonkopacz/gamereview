import { InstantSearch, SearchBox, Hits } from "react-instantsearch";
import Hit from "./Hits";
import algoliasearch from "algoliasearch/lite";
const searchClient = algoliasearch(
  "XCSKC80H99",
  "3bf46814592af749e9fad6556f246693"
);
const index = searchClient.initIndex("games");

export default function Search() {
  return (
    <InstantSearch searchClient={searchClient} indexName="games">
      <SearchBox />
      <Hits hitComponent={Hit} />
    </InstantSearch>
  );
}
