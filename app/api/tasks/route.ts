import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
  try {
    const { title, description, status } = await req.json();

    // Validate the input
    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      typeof status !== "boolean"
    ) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const newTodo = await prisma.todos.create({
      data: {
        title,
        description,
        status,
        createdAt: new Date(),
      },
    });

    return NextResponse.json({ data: newTodo }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const todos = await prisma.todos.findMany();

    return NextResponse.json({ data: todos, status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await prisma.todos.delete({
      where: { id },
    });

    return NextResponse.json(
      { msg: "Todo Deleted Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
};
