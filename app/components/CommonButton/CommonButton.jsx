"use client";

import React from "react";
import styles from "./CommonButton.module.css";
import { useRouter } from "next/navigation";

const CommonButton = ({ label, className, type = "default", id, route }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(route);
  };

  return (
    <button
      className={`${styles.button} ${styles[type]} ${className}`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default CommonButton;
