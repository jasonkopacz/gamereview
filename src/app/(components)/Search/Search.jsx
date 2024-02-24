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

// await index.saveObjects(data).then(({ objectIDs }) => {
//   console.log(objectIDs);
// });
// const { taskID } = await client.saveObject({
//   indexName: "GAMES",
//   data
// });

// console.log("Ready to search!");

export function Hit({ hit }) {
  return (
    <article>
      <Image src={hit.poster_path} alt={hit.title} height={300} width={300} />
      <p>{hit.genres[0]}</p>
      <Highlight attribute="title" hit={hit} />
      <p>${hit.release_date}</p>
    </article>
  );
}

export default async function Search() {
  const data = await fetchData();
  // index
  //   .saveObjects(data, { autoGenerateObjectIDIfNotExist: true })
  //   .then(({ objectIds }) => {
  //     console.log(objectIds);
  //   });
  // const requests = data.map((record) => {
  //   return {
  //     action: "addObject",
  //     body: record
  //   };
  // });

  // const { taskID } = await index.batch({
  //   indexName: "one",
  //   batchWriteParams: {
  //     requests
  //   }
  // });

  return (
    <InstantSearch searchClient={searchClient} indexName="games">
      <RefinementList attribute="genres" />
      <SearchBox />
      <Hits hitComponent={Hit} />
    </InstantSearch>
  );
}

const apiKey = "25c2bcabe0f84c32b4c1a41d66f18c9b";
const baseUrl = "https://api.rawg.io/api";
const endpoint = "/games";
let page = 3001;
let results = [];
let formattedResults = [];

export const fetchData = async () => {
  try {
    console.log(page);
    const response = await fetch(
      `${baseUrl}${endpoint}?key=${apiKey}&page=${page}&page_size=40`
    );
    let data = await response.json();
    let formattedGames = data.results.map((game) => {
      // console.log(game);
      const genres = game.genres.flatMap((genre) => genre.name);
      const platforms = game.platforms.flatMap(
        (platform) => platform.platform.name
      );
      const screenshots = game.short_screenshots.flatMap(
        (screenshot) => screenshot.image
      );
      const tags = game?.tags.flatMap((tag) => tag.name);
      const slug = game?.slug;
      const name = game?.name;
      const released = game?.released;
      const background_image = game?.background_image;
      const rating = game?.rating;
      const metacritic = game?.metacritic;
      const esrb_rating = game?.esrb_rating?.name;
      results.push({
        name,
        slug,
        genres,
        tags,
        platforms,
        released,
        background_image,
        screenshots,
        esrb_rating,
        rating,
        metacritic
      });
      formattedResults.push({
        name,
        slug,
        genres,
        tags,
        platforms,
        released,
        background_image,
        screenshots,
        esrb_rating,
        rating,
        metacritic
      });
    });
    if (page % 100 === 0) {
      console.log(results);
      console.log(formattedResults);
      index
        .saveObjects(formattedResults, { autoGenerateObjectIDIfNotExist: true })
        .then(({ objectIds }) => {
          console.log(objectIds);
        });
      page++;
      formattedResults = [];
      fetchData();
      // 21590
    } else if (page < 6000) {
      page++;
      fetchData();
    } else {
      console.log(results);
      return results;
    }
  } catch (error) {
    page++;
    fetchData();
    console.error("Error fetching data:", error);
  }
};
