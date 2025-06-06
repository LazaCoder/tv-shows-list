"use client";

import { useEffect, useState } from "react";
import ShowCard from "./components/ShowCard/ShowCard";
import LoadMoreButton from "./components/LoadMoreButton/LoadMoreButton";
import styles from "./home.module.css";
import Image from "next/image";

export default function Home() {
  const [shows, setShows] = useState([]);
  const [index, setIndex] = useState(20);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchShows = async () => {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
      try {
        const res = await fetch(`${baseUrl}/api/bestRated?limit=${index}`);
        const data = await res.json();
        setShows(data);
        setLoaded(true);
      } catch (error) {
        console.error("Failed to fetch shows:", error);
      }
    };

    fetchShows();
  }, [index]);

  const handleLoadMore = () => {
    setIndex((prevIndex) => prevIndex + 20);
  };

  if (!loaded) {
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

  return (
    <div className={`${styles.mainContainer} ${loaded ? styles.fadeIn : ""}`}>
      <div className={styles.gridContainer}>
        {shows.map((show) => (
          <ShowCard
            key={show.id}
            name={show.name}
            premiered={show.premiered}
            image={show.image?.medium || "/placeholder.png"}
            id={show.id}
          />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <LoadMoreButton onClick={handleLoadMore} />
      </div>
    </div>
  );
}
