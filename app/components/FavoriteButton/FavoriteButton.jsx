"use client";

import React, { startTransition } from "react";
import { useState, useTransition, useEffect } from "react";
import CommonButton from "../RouteButton/RouteButton";
import styles from "./FavoriteButton.module.css";

const FavoriteButton = ({ id }) => {
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [style, setStyle] = useState("favorite");
  const [text, setText] = useState("Dodaj u favorite");
  const [checking, setChecking] = useState(false);

  const handleClick = () => {
    startTransition(async () => {
      const postFavorite = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/favorites`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        }
      );

      if (postFavorite.ok) {
        setSaved(true);
        setStyle("disabled");
        setText("Dodano u favorite");
      }
    });

    console.log(`favorite button clicked`);
  };

  useEffect(() => {
    async function checkContains(id) {
      setChecking(true);
      const fetchFavorites = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/favorites`
      );
      const favorites = await fetchFavorites.json();

      console.log(favorites);

      if (favorites?.favorites.includes(id)) {
        setStyle("disabled");
        setSaved(true);
        setText("Dodano u favorite");
      }

      setChecking(false);
    }

    checkContains(id);
  }, [id]);

  return (
    <button
      className={`${styles.button} ${styles[style]}`}
      onClick={handleClick}
      disabled={saved || isPending}
    >
      {isPending || checking ? "Procesiram..." : text}
    </button>
  );
};

export default FavoriteButton;
