export const dynamic = "force-dynamic";

import React from "react";
import styles from "./ShowDetails.module.css";
import Image from "next/image";
import StarRating from "@/app/components/StarRating/StarRating";
import CommonButton from "@/app/components/RouteButton/RouteButton";
import FavoriteButton from "@/app/components/FavoriteButton/FavoriteButton";

export default async function ShowDetails({ params }) {
  const { id } = await params;

  const [responseShow, responseCast] = await Promise.all([
    fetch(`https://api.tvmaze.com/shows/${id}`),
    fetch(`https://api.tvmaze.com/shows/${id}/cast`),
  ]);

  const [show, cast] = await Promise.all([
    responseShow.json(),
    responseCast.json(),
  ]);

  const calculateLength = (startDate, endDate) => {
    if (endDate) {
      return startDate.split("-")[0] + "-" + endDate.split("-")[0];
    } else {
      return startDate.split("-")[0] + "-";
    }
  };

  function sanitizeText(inputText) {
    return inputText.replace(/<[^>]*>/g, "");
  }

  //console.log(show.rating);
  //console.log(cast.slice(0, 3).map((cast) => cast));

  return (
    <div className={styles.mainContainer}>
      <div className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
          <Image
            src={show.image.original}
            width={366}
            height={549}
            alt="Show image"
            priority
          />
        </div>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.upper}>
          <div className={styles.basicInfo}>
            <h1 className={styles.title}>
              {show.name} ({calculateLength(show.premiered, show.ended)})
            </h1>
            <div className={styles.genresContainer}>
              {show.genres.map((genre, index) => (
                <div className={styles.genreContainer} key={index}>
                  <p>{genre} </p>
                </div>
              ))}
            </div>
          </div>

          <p className={styles.summary}>{sanitizeText(show.summary)}</p>
        </div>
        <div className={styles.lower}>
          <div className={styles.ratingContainer}>
            <h4 className={styles.ratingTitle}>Rating</h4>
            <StarRating rating={show.rating.average} />
          </div>
          <div className={styles.timeContainer}>
            <h4>Prosječno vrijeme trajanja</h4>
            <p>{show.runtime || "N/A"} minuta</p>
          </div>

          <div className={styles.countryContainer}>
            <h4>Zemlja</h4>
            <p>
              {show?.network?.country?.name
                ? show?.network?.country?.name
                : "N/A"}
            </p>
          </div>
        </div>
        <div className={styles.lower}>
          <div className={styles.castContainer}>
            <h4>Glumci</h4>
            <div className={styles.castList}>
              {cast.slice(0, 3).map((actor) => (
                <a href={actor.person.url} key={actor.person.id}>
                  {actor.person.name}
                </a>
              ))}
            </div>
          </div>

          <div className={styles.countryContainer}>
            <h4>Mreža</h4>
            <p>{show.network?.name ? show.network?.name : "N/A"}</p>
          </div>
          <div className={styles.buttonsContainer}>
            <FavoriteButton id={show.id} />
            <CommonButton
              label="Vidi epizode"
              className="episodesButton"
              id={show.id}
              route={`/show/${id}/episodes`}
            />

            <CommonButton
              label="Vidi sve glumce"
              className="episodesButton"
              id={show.id}
              route={`/show/${id}/cast`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
