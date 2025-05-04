import React from "react";
import Image from "next/image";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <Image src={"/movieIcon.png"} height={80} width={80} alt="logo" />

      <h1>Showmania</h1>
    </header>
  );
}
