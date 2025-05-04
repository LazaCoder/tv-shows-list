import React from "react";
import Image from "next/image";
import styles from "./EpisodeDetails.module.css";

export default async function page({ params }) {
  const { episodeId } = await params;

  const episodeFetch = await fetch(
    `https://api.tvmaze.com/episodes/${episodeId}?embed=guestcast`
  );

  const episode = await episodeFetch.json();

  function sanitizeText(inputText) {
    return inputText.replace(/<[^>]*>/g, "");
  }

  function formatDate(date) {
    return new Date(date).toLocaleDateString("de-DE", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.imageContainer}>
        <Image
          className={styles.img}
          src={
            episode.image?.original ? episode.image.original : "/noPhoto.jpg"
          }
          width={560}
          height={315}
          alt="episode photo"
          priority
        />
      </div>

      <div className={styles.infoContainer}>
        <h2>
          S{episode.season}E{episode.number} - {episode.name}
        </h2>

        <p className={styles.summary}> {sanitizeText(episode.summary)} </p>

        <div className={styles.infoplusContainer}>
          <div>
            <h4>Rating</h4>
            <p>
              {episode.rating?.average ? episode.rating.average + "/10" : "N/A"}
            </p>
          </div>

          <div>
            <h4>Datum emitiranja</h4>
            <p>{formatDate(episode.airdate)}</p>
          </div>

          <div>
            <h4>Vrijeme emitiranja</h4>
            <p>{episode.airtime}</p>
          </div>

          <div>
            <h4>Duljina</h4>
            <p>{episode.runtime}min</p>
          </div>
        </div>
      </div>
    </div>
  );
}
