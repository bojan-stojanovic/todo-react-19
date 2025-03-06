import TodoInput from "./components/TodoInput";
import styles from "./App.module.css";
import { useEffect, useState } from "react";
import TodoFilter from "./components/TodoFilter";
import TodoList from "./components/TodoList";

type Todo = {
  message: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");

  async function fetchTodos() {
    try {
      const response = await fetch("/json-todos.json");
      const data = await response.json();

      setTodos([...data]);
      setFilteredTodos([...data]);
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
      completed: false
    };

    setTodos([todo, ...todos]);
    setFilteredTodos([todo, ...filteredTodos]);
  }

  function onRemoveTodo(index: number) {
    setFilteredTodos(filteredTodos.filter((_, i) => i !== index));
    setTodos(todos.filter((_, i) => i !== index));
  }

  function onTodoUpdate(index: number) {
    // update completed status of correct todo
    const completed = filteredTodos[index].completed = !filteredTodos[index].completed;

    setFilteredTodos(filteredTodos.map((todo, i) => i === index ? { ...todo, completed } : todo));
    setTodos(todos.map((todo, i) => i === index ? { ...todo, completed } : todo));
  }

  function onFilterTodos(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const _activeFilter = e.currentTarget.dataset.filter!;

    if (_activeFilter === activeFilter) return;

    setActiveFilter(_activeFilter);

    if (_activeFilter === "all") setFilteredTodos(todos.filter(() => [...todos]));

    if (_activeFilter === "done") setFilteredTodos(todos.filter(todo => todo.completed === true));

    if (_activeFilter === "open") setFilteredTodos(todos.filter(todo => todo.completed === false));
  }

  return (
    <div className={styles.container}>
      <h1>Todo app</h1>
      <TodoInput addTodo={onAddTodo} />

      {todos.length > 0 &&
        <>
          <TodoFilter todoNumber={filteredTodos.length} activeFilter={activeFilter} updateActiveFilter={onFilterTodos} />
          <TodoList filteredTodos={filteredTodos} onRemoveTodo={onRemoveTodo} onTodoUpdate={onTodoUpdate} />
        </>
      }
    </div>
  )
}

export default App
