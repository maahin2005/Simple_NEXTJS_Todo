"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";

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
      <div className="bg-[#181818] p-10 pt-7">
        <h1 className="mb-3 text-center text-xl">Add New Todo</h1>
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
              className="bg-blue-500 p-3 font-semibold text-xl hover:bg-blue-600 text-center"
              type="submit"
            >
              {isLoading ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="m-auto w-8 h-8 text-gray-200 animate-spin fill-blue-600"
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
              ) : (
                "Add"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTodo;
