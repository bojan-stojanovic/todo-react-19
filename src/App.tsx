import TodoInput from "./components/TodoInput";
import styles from "./App.module.css";
import { useEffect, useMemo, useState } from "react";
import TodoFilter from "./components/TodoFilter";
import TodoList from "./components/TodoList";

type Todo = {
  id: string;
  message: string;
  completed: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredTodos = useMemo(() => {
    if (activeFilter === "done")
      return todos.filter((todo) => todo.completed === true);
    if (activeFilter === "open")
      return todos.filter((todo) => todo.completed === false);
    return todos;
  }, [todos, activeFilter]);

  async function fetchTodos() {
    try {
      const response = await fetch("/json-todos.json");
      const data = await response.json();

      setTodos([...data]);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  function onAddTodo(todoMessage: string) {
    const todo = {
      id: crypto.randomUUID(),
      message: todoMessage,
      completed: false,
    };

    setTodos([todo, ...todos]);
  }

  function onRemoveTodo(id: string) {
    setTodos(todos.filter((todo, i) => todo.id !== id));
  }

  function onTodoUpdate(id: string) {
    const updatedTodos = todos.map((todo, i) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    setTodos(updatedTodos);
  }

  function onFilterTodos(filter: string) {
    if (filter === activeFilter) return;
    setActiveFilter(filter);
  }

  return (
    <div className={styles.container}>
      <h1>Todo app</h1>
      <TodoInput addTodo={onAddTodo} />

      {todos.length > 0 && (
        <>
          <TodoFilter
            todoNumber={filteredTodos.length}
            activeFilter={activeFilter}
            updateActiveFilter={onFilterTodos}
          />
          <TodoList
            filteredTodos={filteredTodos}
            onRemoveTodo={onRemoveTodo}
            onTodoUpdate={onTodoUpdate}
          />
        </>
      )}

      {todos.length === 0 && <p>You don't have any todos yet....</p>}
    </div>
  );
}

export default App;
