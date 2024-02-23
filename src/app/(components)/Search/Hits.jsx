import Image from "next/image";

export default function Hit({ hit }) {
  return (
    <article>
      <Image src={hit.poster_path} alt={hit.title} height={300} width={300} />
      <p>{hit.genres[0]}</p>
      <h1>{hit.title}</h1>
      <p>${hit.release_date}</p>
    </article>
  );
}
