"use client";

import React from "react";
import Image from "next/image";
import styles from "./ShowCard.module.css";
import Link from "next/link";

export default function ShowCard({
  name,
  premiered,
  image,
  id,
  disposable = false,
  onRemove,
}) {
  const year = premiered ? premiered.split("-")[0] : "N/A";

  const handleRemove = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/favorites`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        }
      );

      if (res.ok) {
        console.log("Successfully deleted");
        onRemove?.(id);
      } else {
        console.log("Failed to delete");
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        {disposable && (
          <button className={styles.removeButton} onClick={handleRemove}>
            &minus;
          </button>
        )}
        <Link href={`/show/${id}`}>
          <Image
            src={image || "/noPhoto.jpg"}
            width={150}
            height={225}
            alt="show image"
            priority
          />
        </Link>
      </div>
      <div className={styles.infoContainer}>
        <h4>
          {name} ({year})
        </h4>
      </div>
    </div>
  );
}
