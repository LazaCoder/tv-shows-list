import React from "react";
import { Star, StarIcon } from "lucide-react";

const StarRating = ({ rating }) => {
  const starRating = Math.round((rating / 10) * 5 * 2) / 2;

  const stars = Array.from({ length: 5 }, (_, i) => {
    if (starRating >= i + 1) {
      return (
        <StarIcon
          key={i}
          style={{
            color: "#facc15",
            fill: "#facc15",
            width: "20px",
            height: "20px",
            marginRight: "4px",
          }}
        />
      );
    } else if (starRating >= i + 0.5) {
      return (
        <div
          key={i}
          style={{
            position: "relative",
            width: "20px",
            height: "20px",
            marginRight: "4px",
          }}
        >
          <StarIcon
            style={{
              color: "#facc15",
              fill: "#facc15",
              width: "20px",
              height: "20px",
              position: "absolute",
              left: 0,
              top: 0,
              clipPath: "inset(0 50% 0 0)",
              overflow: "hidden",
            }}
          />
          <Star
            style={{
              color: "#d1d5db",
              width: "20px",
              height: "20px",
              position: "absolute",
              left: 0,
              top: 0,
            }}
          />
        </div>
      );
    } else {
      return (
        <Star
          key={i}
          style={{
            color: "#d1d5db", // gray-300
            width: "20px",
            height: "20px",
            marginRight: "4px",
          }}
        />
      );
    }
  });

  return <div style={{ display: "flex" }}>{stars}</div>;
};

export default StarRating;
