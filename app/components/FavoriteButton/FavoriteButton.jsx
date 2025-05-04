"use client";

import React from "react";
import CommonButton from "../RouteButton/RouteButton";

const FavoriteButton = ({}) => {
  const handleClick = () => {
    // Add custom action for button here
    console.log(`favorite button clicked`);
  };

  return (
    <CommonButton
      label="Dodaj u favorite"
      onClick={handleClick}
      className="favoriteButton"
      type="favorite"
    />
  );
};

export default FavoriteButton;
