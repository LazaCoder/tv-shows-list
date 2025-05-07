import React from "react";
import styles from "./FavoritesPage.module.css";
import ShowCard from "../components/ShowCard/ShowCard";

export default async function FavoritesPage() {
  const favoritesRes = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/favorites`,
    { cache: "no-store" }
  );
  const favorites = await favoritesRes.json();

  const shows = await Promise.all(
    favorites.favorites.map(async (id) => {
      const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
      return res.json();
    })
  );

  return (
    <div className={styles.mainContainer}>
      <div className={styles.gridContainer}>
        {shows.map((show) => (
          <ShowCard
            key={show.id}
            name={show.name}
            premiered={show.premiered}
            image={show.image?.medium || "/noPhoto.jpg"}
            id={show.id}
          />
        ))}
      </div>
    </div>
  );
}
