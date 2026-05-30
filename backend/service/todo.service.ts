import { prisma } from "../lib/prisma";
import { Progress } from "../generated/prisma/enums";

export const createTodo = async (data: {
  title: string;
  Description: string;
  status: Progress;
  userid: number;
}) => {
  const { title, Description, status, userid } = data;
  const todo = await prisma.todo.create({
    data: {
      title,
      Description,
      status,
      userid,
    },
  });
  return {
    message: "Todo created successfully",
  };
};

export const getTodo = async (userid: number) => {
  const todo = await prisma.todo.findMany({
    where: {
      userid,
    },
  });
  if (todo.length === 0) {
    return "no todo exits";
  }
  return {
    todo,
  };
};

export const deleteTodo = async (userid: number, id: number) => {
  const todo = await prisma.todo.deleteMany({
    where: { id, userid },
  });
  return {
    message: "todo deleted sucessfully",
  };
};

type UpdateTodoInput = {
  title?: string;
  Description?: string;
  status?: Progress;
};

export const updateTodo = async (
  id: number,
  userid: number,
  updates: UpdateTodoInput,
) => {
  const result = await prisma.todo.updateMany({
    where: { id, userid }, // ownership baked into the filter
    data: updates,
  });

  if (result.count === 0) {
    // either the todo doesn't exist, or it doesn't belong to this user
    // (we deliberately don't distinguish — avoids leaking which todo IDs exist)
    throw new Error("Todo not found");
  }

  return { message: "Todo updated successfully" };
};
