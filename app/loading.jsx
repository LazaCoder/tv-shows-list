import React from "react";
import Image from "next/image";
import styles from "./loading.module.css";

export default function loading() {
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
