"use client";

import React from "react";
import styles from "./RouteButton.module.css";
import { useRouter } from "next/navigation";

const CommonButton = ({
  label,
  className,
  type = "default",
  id,
  route,
  disabled = false,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(route);
  };

  return (
    <button
      className={`${styles.button} ${styles[type]} ${className}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default CommonButton;
