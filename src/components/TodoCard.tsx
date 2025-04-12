import styles from "./TodoCard.module.css";

type Props = {
  id: string;
  message: string;
  completed: boolean;
  removeTodo: (id: string) => void;
  todoStatus: (id: string) => void;
};

export default function TodoCard({
  id,
  message,
  completed,
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
          <button className={styles.toggle} onClick={() => todoStatus(id)}>
            Mark as done
          </button>
          <button className={styles.remove} onClick={() => removeTodo(id)}>
            Remove
          </button>
        </div>
      </div>
    </>
  );
}
