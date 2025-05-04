"use client";

import React, { useEffect, useState, use } from "react";
import styles from "./EpisodesPage.module.css";
import EpisodeCard from "@/app/components/EpisodeCard/EpisodeCard";

export default function EpisodesPage({ params }) {
  const { id } = use(params);

  const [episodesBySeason, setEpisodesBySeason] = useState({});
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [showName, setShowName] = useState("");

  useEffect(() => {
    async function fetchEpisodes() {
      const res = await fetch(`https://api.tvmaze.com/shows/${id}/episodes`);
      const rawEpisodes = await res.json();

      const grouped = rawEpisodes.reduce((acc, episode) => {
        const { season } = episode;
        if (!acc[season]) acc[season] = [];
        acc[season].push(episode);
        return acc;
      }, {});

      setEpisodesBySeason(grouped);
      setSelectedSeason(Object.keys(grouped)[0]);
      setShowName(rawEpisodes[0]?._links?.show?.name || "Show");
    }

    fetchEpisodes();
  }, [id]);

  if (!selectedSeason || !episodesBySeason[selectedSeason]) {
    return <div className={styles.mainContainer}>Loading...</div>;
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.selectContainer}>
        <select
          name="seasons"
          id="season-select"
          value={selectedSeason}
          onChange={(e) => setSelectedSeason(e.target.value)}
        >
          {Object.keys(episodesBySeason).map((seasonNumber) => (
            <option value={seasonNumber} key={seasonNumber}>
              Season {seasonNumber}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.episodeContainer}>
        <h1>{showName} epizode</h1>
        {episodesBySeason[selectedSeason].map((episode) => (
          <EpisodeCard key={episode.id} episode={episode} />
        ))}
      </div>
    </div>
  );
}
