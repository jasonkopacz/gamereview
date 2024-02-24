import Image from "next/image";
import { Highlight } from "react-instantsearch";
export default function Hit({ hit }) {
  return (
    <article>
      <Image src={hit.poster_path} alt={hit.title} height={300} width={300} />
      <p>{hit.genres[0]}</p>
      <Highlight attribute="title" hit={hit} />
      <p>${hit.release_date}</p>
    </article>
  );
}
