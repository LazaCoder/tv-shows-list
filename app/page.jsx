"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ShowCard from "./components/ShowCard/ShowCard";
import LoadMoreButton from "./components/LoadMoreButton/LoadMoreButton";
import styles from "./home.module.css";

export default function Home() {
  const [shows, setShows] = useState([]);
  const [index, setIndex] = useState(20);

  useEffect(() => {
    const fetchShows = async () => {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
      try {
        const res = await fetch(`${baseUrl}/api/bestRated`);
        const data = await res.json();
        setShows(data);
      } catch (error) {
        console.error("Failed to fetch shows:", error);
      }
    };

    fetchShows();
  }, []);

  const handleLoadMore = (e) => {
    setIndex((prevIndex) => prevIndex + 20);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.gridContainer}>
        {shows.slice(0, index).map((show) => (
          <ShowCard
            name={show.name}
            premiered={show.premiered}
            image={show.image.medium}
            id={show.id}
            key={show.id}
          />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <LoadMoreButton onClick={handleLoadMore} />
      </div>
    </div>
  );
}
