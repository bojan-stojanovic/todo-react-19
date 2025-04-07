import { useState } from "react";
import styles from "./TodoInput.module.css";

export default function TodoInput({
  addTodo,
}: {
  addTodo: (todo: string) => void;
}) {
  const [inputValue, setInputValue] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);

  function updateInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function submitTodoHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (inputValue.trim() === "") {
      setIsEmpty(true);

      const timeOut = setTimeout(() => {
        setIsEmpty(false);

        clearTimeout(timeOut);
      }, 2000);

      return;
    }

    addTodo(inputValue);

    setInputValue("");
  }

  return (
    <>
      <form className={styles.form} onSubmit={submitTodoHandler}>
        <div>
          <label htmlFor="todoInput">Add your todo</label>
          <input
            type="text"
            id="todoInput"
            name="todoInput"
            placeholder="Add your todo"
            className={styles.input}
            value={inputValue}
            onInput={updateInput}
          />
          {isEmpty && <p className={styles.error}>Please add todo</p>}
        </div>

        <button className={styles.button}>Add</button>
      </form>
    </>
  );
}
