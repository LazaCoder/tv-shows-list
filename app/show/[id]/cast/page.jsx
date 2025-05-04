"use client";

import React, { useEffect, useState } from "react";
import styles from "./CastPage.module.css";
import { useParams } from "next/navigation";
import CastCard from "@/app/components/CastCard/CastCard";
import LoadMoreButton from "@/app/components/LoadMoreButton/LoadMoreButton";

export default function CastPage() {
  const { id } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(15);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const res = await fetch(`https://api.tvmaze.com/shows/${id}/cast`);
        const data = await res.json();
        setCast(data.slice(0, index));
      } catch (error) {
        console.error("Failed to fetch cast:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCast();
  }, [id, index]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleLoadMore = (e) => {
    setIndex((index) => index + 15);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.castGrid}>
        {cast.map((member, i) => (
          <CastCard member={member} key={i} id={id} />
        ))}
      </div>
      <div className={styles.buttonContainer}>
        {index <= cast.length && <LoadMoreButton onClick={handleLoadMore} />}
      </div>
    </div>
  );
}
