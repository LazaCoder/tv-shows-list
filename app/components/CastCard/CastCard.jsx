import React from "react";
import styles from "./CastCard.module.css";
import Image from "next/image";
import Link from "next/link";

export default function CastCard({ member, id }) {
  return (
    <div className={styles.castCard}>
      <Image
        className={styles.img}
        src={member.person.image?.medium || "/noPhoto.jpg"}
        alt={member.person.name}
        width={140}
        height={197}
      />
      <div className={styles.infoContainer}>
        <Link href={`/show/${id}/cast/${member.person.id}`}>
          <h3>{member.person.name}</h3>
        </Link>
        <p>as {member.character.name}</p>
      </div>
    </div>
  );
}
