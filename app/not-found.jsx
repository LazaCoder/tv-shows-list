import React from "react";
import styles from "./not-found.module.css";
import Image from "next/image";

export default function notFound() {
  return (
    <div className={styles.center}>
      <div className={styles.imageWrapper}>
        <Image
          src={"/error404image.png"}
          width={500}
          height={500}
          alt="error image"
        />
      </div>
    </div>
  );
}
