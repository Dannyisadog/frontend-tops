"use client";

import { Repository } from "@prisma/client";
import RepositoryCard from "../RepositoryCard";
import styles from "./index.module.css";
import { useCallback, useRef, useState } from "react";

import { getRepositories } from "@/app/requests/getRepositories";

interface RepositoryListProps {
  repositories: Repository[];
}

export default function RepositoryList(props: RepositoryListProps) {
  const { repositories } = props;
  const [items, setItems] = useState<Repository[]>(repositories);
  const listRef = useRef(null);
  const [page, setPage] = useState(2);
  const [noMore, setNoMore] = useState(false);

  const observer = useRef<IntersectionObserver>();

  const lastElementRef = useCallback(
    (node: HTMLAnchorElement) => {
      if (observer.current) observer.current.disconnect();
      if (noMore) return;
      observer.current = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting) {
          const newItems = await getRepositories(page);
          setItems((prevItems) => [...prevItems, ...newItems]);
          setPage((prevPage) => prevPage + 1);
          if (newItems.length < 10) {
            setNoMore(true);
          }
        }
      });
      if (node) observer.current.observe(node);
    },
    [page, noMore]
  );

  return (
    <div ref={listRef} className={styles.repositories_container}>
      {items.map((item) => (
        <RepositoryCard
          key={item.id}
          repository={item}
          ref={(node) => {
            if (items.length === items.indexOf(item) + 1 && node !== null) {
              lastElementRef(node);
            }
          }}
        />
      ))}
    </div>
  );
}
