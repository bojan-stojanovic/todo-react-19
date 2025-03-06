import styles from "./TodoFilter.module.css";

type Props = {
    todoNumber: number,
    activeFilter: string,
    updateActiveFilter: any
}

export default function TodoFilter({ todoNumber, activeFilter, updateActiveFilter }: Props) {
    return (
        <div className={styles["filter-wrapper"]}>
            <span>Number of todos: {todoNumber}</span>
            <div className={styles.filters}>
                <button data-filter="all" onClick={(e) => updateActiveFilter(e)} className={`${activeFilter === "all" ? styles.active : ""}`}>All</button>
                <button data-filter="done" onClick={(e) => updateActiveFilter(e)} className={`${activeFilter === "done" ? styles.active : ""}`}>Done</button>
                <button data-filter="open" onClick={(e) => updateActiveFilter(e)} className={`${activeFilter === "open" ? styles.active : ""}`}>Open</button>
                <span>Active filter {activeFilter}</span>
            </div>
        </div>
    )
}