import React from "react";
import styles from "./EpisodeCard.module.css";
import Image from "next/image";
import Link from "next/link";

export default function EpisodeCard({ episode }) {
  // console.log(episode);

  const showId = episode._links.show.href.split("/")[4];

  console.log(showId);

  function sanitizeText(inputText) {
    const cleanText = inputText.replace(/<[^>]*>/g, "");
    const words = cleanText.split(" ");
    return words.length > 25 ? words.slice(0, 30).join(" ") + "..." : cleanText;
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
        <div className={styles.imageWrapper}>
          <Image
            className={styles.img}
            src={episode.image?.medium ? episode.image.medium : "/noPhoto.jpg"}
            width={160}
            height={90}
            alt="episode image"
          />
        </div>
      </div>

      <div className={styles.infoContainer}>
        <div className={styles.titleContainer}>
          <Link href={`/show/${showId}/episodes/${episode.id}`}>
            <h4>
              S{episode.season}E{episode.number} - {episode.name}
            </h4>
          </Link>

          <div className={styles.rightContainer}>
            <div className={styles.ratingContainer}>
              <h5>
                {episode.rating.average
                  ? episode.rating.average + "/10"
                  : "N/A"}
              </h5>
              <Image
                src={"/starIcon.png"}
                height={17}
                width={17}
                alt="star image"
              />
            </div>
            <h5 className={styles.date}>{formatDate(episode.airdate)}</h5>
          </div>
        </div>

        <p>{episode?.summary ? sanitizeText(episode.summary) : "N/A"}</p>
      </div>
    </div>
  );
}
