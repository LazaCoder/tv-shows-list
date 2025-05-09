"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import styles from "./HeaderMobile.module.css";

export default function HeaderMobile() {
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const handleBack = () => router.back();
  const handleClick = () => router.push("/favorites");

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?query=${search}`);
      setShowSearch(false);
    }
  };

  const toggleSearch = () => setShowSearch((prev) => !prev);

  return (
    <header className={styles.mobileHeader}>
      <div className={styles.topRow}>
        <div className={styles.leftSection}>
          {pathname !== "/" && (
            <button onClick={handleBack} className={styles.backButton}>
              &#8592;
            </button>
          )}
          <button className={styles.favoriteButton} onClick={handleClick}>
            ❤
          </button>
        </div>

        <div className={styles.logo}>
          <Image src={"/movieIcon.png"} height={50} width={50} alt="logo" />
          <span className={styles.title}>Showmania</span>
        </div>

        <div className={styles.rightSection}>
          <button onClick={toggleSearch} className={styles.searchToggle}>
            <Image
              src={"/magnifierIcon.svg"}
              width={22}
              height={22}
              alt="search"
            />
          </button>
        </div>
      </div>

      {showSearch && (
        <form onSubmit={handleSearch} className={styles.searchWrapper}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pretraži serije..."
            className={styles.searchInput}
            autoFocus
          />
        </form>
      )}
    </header>
  );
}
