"use client";

import React, { useEffect, useState } from "react";
import styles from "./FavoritesPage.module.css";
import ShowCard from "../components/ShowCard/ShowCard";
import Image from "next/image";

export default function FavoritesPage() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      const favoritesRes = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/favorites`,
        { cache: "no-store" }
      );
      const favorites = await favoritesRes.json();

      const showsData = await Promise.all(
        favorites.favorites.map(async (id) => {
          const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
          return res.json();
        })
      );

      setShows(showsData);
      setLoading(false);
    };

    fetchFavorites();
  }, []);

  const handleRemove = (idToRemove) => {
    setShows((prevShows) => prevShows.filter((show) => show.id !== idToRemove));
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Image
          src={"/loadingSpinner.gif"}
          width={150}
          height={150}
          style={{ backgroundColor: "transparent" }}
          alt="loading spinner"
        />
      </div>
    );
  }

  if (shows.length === 0 && !loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "300px",
        }}
      >
        <h1>No favorites... for now...</h1>
      </div>
    );
  }

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
            disposable={true}
            onRemove={handleRemove}
          />
        ))}
      </div>
    </div>
  );
}
