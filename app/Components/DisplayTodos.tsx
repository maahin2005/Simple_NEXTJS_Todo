"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";

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
      await axios.delete(`/api/tasks?id=${id}`);

      getAllTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleStatus = async (id: string, status: boolean) => {
    try {
      const resp = await axios.patch(`/api/tasks?id=${id}`, {
        status: !status,
      });

      getAllTodos();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTodos();
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
                    className="bg-slate-600 w-1/2 hover:bg-slate-700"
                    onClick={() => handleDeleteTodo(el.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-slate-600 w-1/2 hover:bg-slate-700"
                    onClick={() => handleToggleStatus(el.id, el.status)}
                  >
                    <p>Mark as</p> {el.status ? "In-complete" : "Completed"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <Loader width={"20%"} height={"20%"} />
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
