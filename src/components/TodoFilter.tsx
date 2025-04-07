import styles from "./TodoFilter.module.css";

type Props = {
  todoNumber: number;
  activeFilter: string;
  updateActiveFilter: (filter: string) => void;
};

export default function TodoFilter({
  todoNumber,
  activeFilter,
  updateActiveFilter,
}: Props) {
  return (
    <div className={styles["filter-wrapper"]}>
      <span>Number of todos: {todoNumber}</span>
      <div className={styles.filters}>
        <button
          onClick={() => updateActiveFilter("all")}
          className={`${activeFilter === "all" ? styles.active : ""}`}
        >
          All
        </button>
        <button
          onClick={() => updateActiveFilter("done")}
          className={`${activeFilter === "done" ? styles.active : ""}`}
        >
          Done
        </button>
        <button
          onClick={() => updateActiveFilter("open")}
          className={`${activeFilter === "open" ? styles.active : ""}`}
        >
          Open
        </button>
        <span>Active filter {activeFilter}</span>
      </div>
    </div>
  );
}
