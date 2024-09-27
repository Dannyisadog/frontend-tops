import { forwardRef, LegacyRef } from "react";
import { Repository } from "@prisma/client";
import styles from "./index.module.css";
import Link from "next/link";
import Image from "next/image";
import { getStarCount } from "@/app/util";

interface RepositoryCardProps {
  repository: Repository;
}

const RepositoryCard = (
  props: RepositoryCardProps,
  ref: LegacyRef<HTMLAnchorElement> | undefined
) => {
  const { repository } = props;

  return (
    <Link
      ref={ref}
      target="_blank"
      href={repository.url}
      className={styles.card}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className={styles.title_container}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "100px",
              width: 52,
              height: 52,
              backgroundColor: "white",
            }}
          >
            <Image
              src={repository.avatar}
              width={32}
              height={32}
              priority
              alt={repository.name}
            />
          </div>
          <h2
            style={{
              marginLeft: 8,
            }}
          >
            {repository.name}
          </h2>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <p
            style={{
              marginTop: 2,
              marginRight: 4,
            }}
          >
            {getStarCount(repository.stars)}
          </p>
          <Image src="/star.png" width={16} height={16} priority alt="Stars" />
        </div>
      </div>
      <p style={{ marginTop: 12, maxWidth: 375 }}>{repository.description}</p>
    </Link>
  );
};

export default forwardRef(RepositoryCard);
