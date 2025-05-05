"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import ShowCard from "../components/ShowCard/ShowCard";
import LoadMoreButton from "../components/LoadMoreButton/LoadMoreButton";
import styles from "./SearchPage.module.css";
import Image from "next/image";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [shows, setShows] = useState([]);
  const [index, setIndex] = useState(20);
  const [loaded, setLoaded] = useState(false);
  const query = searchParams.get("query");

  useEffect(() => {
    const fetchShows = async () => {
      try {
        if (!query) return;

        const res = await fetch(
          `https://api.tvmaze.com/search/shows?q=${query}`
        );
        const data = await res.json();
        setShows(data);
        setLoaded(true);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch shows:", error);
      }
    };

    fetchShows();
  }, [query]);

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
        {shows.slice(0, index).map((show) => (
          <ShowCard
            key={show.show.id}
            name={show.show.name}
            premiered={show.show.premiered}
            image={show.show.image?.medium}
            id={show.show.id}
          />
        ))}
      </div>
    </div>
  );
}
