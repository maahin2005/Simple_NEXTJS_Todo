"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Loader from "../Components/Loader";

interface Todo {
  title: string;
  description: string;
  status: boolean;
}

function CreateTodo() {
  const [todo, setTodo] = useState<Todo>({
    title: "",
    description: "",
    status: false,
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setTodo((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const resp = await axios.post("/api/tasks", todo);
      console.log("Todo created successfully:", resp.data);
      setTodo({
        title: "",
        description: "",
        status: false,
      });
      router.push("/");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen flex min-h-[70vh] justify-center items-center">
      <div className="bg-[#181818] p-10 pt-7 w-1/3">
        <h1 className="mb-5 text-center text-3xl font-mono font-semibold">
          Add New Todo
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-3 text-black">
            <input
              placeholder="Enter Title"
              className="p-3"
              type="text"
              onChange={handleChange}
              name="title"
              value={todo.title}
            />
            <input
              placeholder="Enter Description"
              type="text"
              className="p-3 "
              name="description"
              onChange={handleChange}
              value={todo.description}
            />
            <label className="p-3 bg-slate-50 flex text-black justify-between cursor-pointer">
              <p className="inline font-semibold">Status</p>
              <input
                type="checkbox"
                name="status"
                className="cursor-pointer"
                onChange={handleChange}
                checked={todo.status}
              />
            </label>
            <button
              className="bg-blue-500 p-3 font-semibold text-xl hover:bg-blue-600 flex justify-center"
              type="submit"
            >
              {isLoading ? <Loader width={8} height={8} /> : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTodo;
