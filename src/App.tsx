import TodoInput from "./components/TodoInput";
import styles from "./App.module.css";
import { useEffect, useMemo, useState } from "react";
import TodoFilter from "./components/TodoFilter";
import TodoList from "./components/TodoList";

type Todo = {
  message: string;
  completed: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredTodos = useMemo(() => {
    if (activeFilter === "done") {
      return todos.filter((todo) => todo.completed === true);
    }

    if (activeFilter === "open") {
      return todos.filter((todo) => todo.completed === false);
    }

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
      message: todoMessage,
      completed: false,
    };

    setTodos([todo, ...todos]);
  }

  function onRemoveTodo(index: number) {
    setTodos(todos.filter((_, i) => i !== index));
  }

  function onTodoUpdate(index: number) {
    // update completed status of correct todo
    const completed = (todos[index].completed = !todos[index].completed);
    setTodos(
      todos.map((todo, i) => (i === index ? { ...todo, completed } : todo)),
    );
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
