"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import styles from "./header.module.css";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState("");

  const handleBack = () => {
    router.back();
  };

  const handleSearch = (e) => {
    e.preventDefault();

    router.push(`/search?query=${search}`);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClick = () => {
    router.push("/favorites");
  };

  return (
    <header className={styles.headerContainer}>
      <div style={{ flex: "1", display: "flex", gap: "1.2rem" }}>
        {pathname !== "/" && (
          <button onClick={handleBack} className={styles.backButton}>
            &#8592; Back
          </button>
        )}

        <button className={styles.favoriteButton} onClick={handleClick}>
          Favoriti
        </button>
      </div>

      <div style={{ flex: "1", display: "flex", justifyContent: "center" }}>
        <Image src={"/movieIcon.png"} height={80} width={80} alt="logo" />
        <h1>Showmania</h1>
      </div>

      <div
        style={{
          flex: "1",
          display: "flex",
          gap: "1rem",
          justifyContent: "flex-end",
        }}
      >
        <div style={{ position: "relative" }}>
          <input
            type="text"
            value={search}
            onChange={handleChange}
            className={styles.searchBar}
            placeholder="Pretraži serije..."
          />
          <button onClick={handleSearch} className={styles.searchIcon}>
            <Image
              src={"/magnifierIcon.svg"}
              width={20}
              height={20}
              alt="magnifier icon"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
