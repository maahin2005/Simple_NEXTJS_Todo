import React from "react";

function Page() {
  return (
    <div className="p-6 shadow-md m-auto my-10 w-[70%]">
      <h1 className="text-3xl font-bold mb-4 border-b-2 w-max">About Todos</h1>
      <div className="grid gap-6 font-mono">
        <p className="">
          Welcome to the "About Todos" section, where we dive into the core of
          your task management journey! Here, you will discover how our
          cutting-edge Todo application helps you stay organized, manage your
          tasks efficiently, and boost your productivity.
        </p>
        <p className="mt-4 ">
          Our Todo app is designed with simplicity and functionality in mind,
          ensuring that you can add, update, and track your tasks seamlessly.
          Whether you're working on personal goals or managing a team project,
          our app offers the tools you need to stay on top of your to-do list.
        </p>
        <p className="mt-2 ">
          We’re continuously working on improving the app and adding new
          features. Stay tuned for upcoming updates and enhancements that will
          make your task management experience even better.
        </p>
        <p>Created by: Mahin Malek</p>
      </div>
    </div>
  );
}

export default Page;
