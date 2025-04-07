import styles from "./TodoCard.module.css";

type Props = {
  message: string;
  completed: boolean;
  index: number;
  removeTodo: (index: number) => void;
  todoStatus: (index: number) => void;
};

export default function TodoCard({
  message,
  completed,
  index,
  todoStatus,
  removeTodo,
}: Props) {
  return (
    <>
      <div
        className={`${styles["todo-card"]} ${completed ? styles.completed : ""}`}
      >
        <p>{message}</p>
        <div className={styles["todo-card__controls"]}>
          <button className={styles.toggle} onClick={() => todoStatus(index)}>
            Mark as done
          </button>
          <button className={styles.remove} onClick={() => removeTodo(index)}>
            Remove
          </button>
        </div>
      </div>
    </>
  );
}
