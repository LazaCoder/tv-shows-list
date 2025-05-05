import React from "react";
import Image from "next/image";
import styles from "./ShowCard.module.css";
import Link from "next/link";

export default function ShowCard({ name, premiered, image, id }) {
  const year = premiered ? premiered.split("-")[0] : "N/A";

  return (
    <Link href={`/show/${id}`}>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <Image
            src={image ? image : "/noPhoto.jpg"}
            width={150}
            height={225}
            alt="show image"
            priority
          />
        </div>
        <div className={styles.infoContainer}>
          <h4>
            {name} ({year})
          </h4>
        </div>
      </div>
    </Link>
  );
}
