import Image from "next/image";
import ShowCard from "./components/ShowCard/ShowCard";
import styles from "./home.module.css";

export default async function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/bestRated`);
  const shows = await res.json();

  //console.log(shows[0]);

  return (
    <div className={styles.gridContainer}>
      {shows.map((show) => (
        <ShowCard
          name={show.name}
          premiered={show.premiered}
          image={show.image.medium}
          id={show.id}
          key={show.id}
        />
      ))}
    </div>
  );
}
