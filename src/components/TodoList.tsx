import TodoCard from "./TodoCard";

import styles from "./TodoList.module.css";

type Props = {
    filteredTodos: {message: string, completed: boolean}[],
    onTodoUpdate: any,
    onRemoveTodo: any
}

export default function TodoList({ filteredTodos, onTodoUpdate, onRemoveTodo }: Props) {
    return (
        <div className={styles["todo-list"]}>
            {filteredTodos.map((todo, index) => (
                <TodoCard
                    message={todo.message}
                    completed={todo.completed}
                    index={index}
                    todoStatus={onTodoUpdate}
                    removeTodo={onRemoveTodo}
                    key={index}
                />
            ))}
        </div>
    )
}