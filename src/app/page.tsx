import { list } from "./adapters/repository";
import RepositoryList from "./components/RepositoryList";
import styles from "./page.module.css";

export default async function Home() {
  const repositories = await list(1);
  return (
    <div className={styles.page}>
      <h1>Github Frontend Tops Repositories</h1>
      <RepositoryList repositories={repositories} />
    </div>
  );
}
