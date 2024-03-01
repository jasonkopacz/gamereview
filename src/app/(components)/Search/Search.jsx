import {
  InstantSearch,
  SearchBox,
  Hits,
  RefinementList
} from "react-instantsearch";
import Image from "next/image";
import styles from "./Search.module.css";
import Link from "next/link";
import { searchClient } from "./searchClient";
import Modal from "../Modal/Modal";
import { Menu, Plus, PlusCircle } from "react-feather";
import useToggle from "@/app/hooks/useToggle";
import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";

export function Hit({ hit }) {
  async function addToGames(id) {
    const response = await fetch(`/api/profile/games`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ gameId: id })
    });
  }
  console.log("check");
  const priority = hit.orderNumber === 0 ? true : false;
  const loading = priority ? "eager" : "lazy";

  return (
    <>
      <Link href={`/games/${hit.objectID}`}>
        <Image
          src={hit.background_image}
          alt={hit.name}
          width={300}
          height={300}
          href={`/games/${hit.objectID}`}
          sizes="100vw"
          style={{
            width: "70%",
            height: "auto"
          }}
          priority={priority}
          loading={loading}
          className={styles.image}
        />
      </Link>
      <div className={styles.nameAndAdd}>
        <Link href={`/games/${hit.objectID}`} className={styles.link}>
          <h1>{hit.name}</h1>{" "}
        </Link>
        {/* <button className={styles.addButton} title="Add To Collection">
          <Plus />
        </button> */}
        <button
          className={styles.addButton}
          title="Add to games"
          onClick={() => addToGames(hit.objectID)}
        >
          <PlusCircle />
          <VisuallyHidden>Add to games</VisuallyHidden>
        </button>
      </div>
      <p>Released: {hit.released}</p>
      <p>Average Rating: {hit.rating} / 5</p>
      <p>Metacritic Score: {hit.metacritic} / 100</p>
    </>
  );
}
const transformItems = (items) => {
  return items.map((item, i) => ({
    ...item,
    orderNumber: i
  }));
};
export default function Search({ profile }) {
  const [isModalOpen, toggleIsModalOpen] = useToggle(false);
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
        <button className={styles.action} onClick={toggleIsModalOpen}>
          <Menu />
        </button>
        {isModalOpen && (
          <Modal
            title="sidebar"
            handleDismiss={toggleIsModalOpen}
            className={`mobileSidebar ${isModalOpen ? "open" : "closed"}`}
          >
            <label htmlFor="genres">Genres</label>
            <RefinementList
              id="genres"
              attribute="genres"
              className={styles.sidebarItem}
            />
            <label htmlFor="tags">Tags</label>
            <RefinementList
              id="tags"
              attribute="tags"
              className={styles.sidebarItem}
            />
          </Modal>
        )}
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
          <Hits
            hitComponent={Hit}
            transformItems={transformItems}
            className={styles.hit}
          ></Hits>
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
