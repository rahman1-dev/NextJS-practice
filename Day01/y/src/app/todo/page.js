"use client";

import TodoComponent from "@/components/TodoComponent";
import { useEffect, useState } from "react";

export default function Todo() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodo();
  }, []);

  const fetchTodo = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    setTodos(data);
  };

  if (todos.length == 0) {
    return <div>Loading......</div>;
  }

  console.log(todos);

  return (
    <div className="flex flex-col items-center gap-3">
      {todos.map((todoObj) => {
        return (
          <div key={todoObj.id}>
            <TodoComponent details={todoObj} />
          </div>
        );
      })}
    </div>
  );
}
