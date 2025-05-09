import React from "react";
import styles from "./CastDetails.module.css";
import Image from "next/image";

export default async function CastDetails({ params }) {
  const { castId } = await params;

  const fetchActor = await fetch(
    `https://api.tvmaze.com/people/${castId}?embed=castcredits`
  );
  const actor = await fetchActor.json();
  const roles = actor._embedded.castcredits;

  const rolesToFit = roles.length <= 12 ? roles : roles.slice(0, 12);

  function formatDate(date) {
    return new Date(date).toLocaleDateString("de-DE", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftContainer}>
        <Image
          src={actor.image?.original || "/noPhoto.jpg"}
          width={400}
          height={600}
          alt="actor image"
          priority
        />
      </div>

      <div className={styles.rightContainer}>
        <h1>{actor.name}</h1>

        <div className={styles.infoContainer}>
          <div>
            <h3>Gender:</h3>
            <p>{actor.gender}</p>
          </div>

          <div>
            <h3>Birthday:</h3>
            <p>{actor?.birthday ? formatDate(actor.birthday) : "N/A"}</p>
          </div>

          <div>
            <h3>Death date:</h3>
            <p>{actor?.deathdate || "Alive"}</p>
          </div>
        </div>

        <h2>Roles</h2>
        <div className={styles.rolesContainer}>
          {rolesToFit.map((item, index) => (
            <div
              key={index}
              style={{ display: "flex", flexDirection: "column" }}
              className={styles.gridElement}
            >
              <h4>{item._links.show.name}</h4>

              <p>as {item._links.character.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
