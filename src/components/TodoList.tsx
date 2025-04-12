import TodoCard from "./TodoCard";

import styles from "./TodoList.module.css";

type Props = {
  filteredTodos: { id: string, message: string; completed: boolean }[];
  onTodoUpdate: (id: string) => void;
  onRemoveTodo: (id: string) => void;
};

export default function TodoList({
  filteredTodos,
  onTodoUpdate,
  onRemoveTodo,
}: Props) {
  return (
    <div className={styles["todo-list"]}>
      {filteredTodos.map((todo) => (
        <TodoCard
          id={todo.id}
          message={todo.message}
          completed={todo.completed}
          todoStatus={onTodoUpdate}
          removeTodo={onRemoveTodo}
          key={todo.id}
        />
      ))}
    </div>
  );
}
