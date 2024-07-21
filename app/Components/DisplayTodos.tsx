"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Todo {
  id: string;
  title: string;
  description: string;
  status: boolean;
  createdAt: string; // or Date if you prefer
}

function DisplayTodos() {
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);

  const getAllTodos = async () => {
    try {
      const resp = await axios.get("/api/tasks");
      setTodos(resp.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      const resp = await axios.delete(`/api/tasks/id=${id}`);

      console.log("RESP: ", resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTodos();
    console.log("BG TODOD: ", todos);
  }, []);

  const handleNavigate = () => {
    router.push("/add-todo");
  };
  return (
    <div className="relative flex w-screen h-[70vh] justify-between p-10">
      <div>
        <h1 className="text-3xl font-mono font-semibold">Your Todos</h1>
        <div className="grid grid-cols-4 gap-5 items-center my-5">
          {todos.length ? (
            todos.map((el) => (
              <div
                key={el.id}
                className="p-3 bg-gray-900 grid min-h-[300px] h-fit border-b-2 gap-3"
              >
                <h1>{el.title}</h1>
                <h2>description: {el.description}</h2>
                <h3>status: {el.status ? "Completed" : "In-Process"}</h3>
                <h4>Created Date: {el.createdAt}</h4>
                <div className="flex gap-2">
                  <button
                    className="bg-slate-600 py-2 w-1/2 hover:bg-slate-700"
                    onClick={() => handleDeleteTodo(el.id)}
                  >
                    Delete
                  </button>
                  <button className="bg-slate-600 py-2 w-1/2 hover:bg-slate-700">
                    Edit
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-[20%] h-[20%] text-gray-200 animate-spin fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>
        <button
          onClick={handleNavigate}
          className="font-semibold absolute right-5 top-3 bg-slate-900 self-start p-5"
        >
          Add Todo
        </button>
      </div>
    </div>
  );
}

export default DisplayTodos;
