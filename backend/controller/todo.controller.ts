import { Request, Response } from "express";
import {todoschema} from "../utils/zodSchema"
import {createTodo,getTodo,deleteTodo,updateTodo} from "../service/todo.service"
import {getUserId} from "../lib/auth.middleware"
import type { Progress } from "../generated/prisma/enums";

const toTodoData = (data: {
  title: string;
  description: string;
  status: string;
}) => ({
  title: data.title,
  Description: data.description,
  status: data.status as Progress,
});

export async function createTodoController(req:Request,res:Response){
  try{
    const parsed = todoschema.safeParse(req.body)
    const userId = getUserId(req)
    if(!parsed.success){
      return res.status(400).json({
        message:"Invalid crediential",
          errors: parsed.error.flatten(),
      })
    }
    const response  = await createTodo({...toTodoData(parsed.data),userid:userId})
       return res.status(201).json(response);
  }catch(error:unknown){
    const message =
      error instanceof Error ? error.message : "something went wrong";
    return res.status(500).json({ message });
}
}

export async function updateTodoController(req:Request,res:Response){
  try{
    const parsed = todoschema.safeParse(req.body)
    const userId = getUserId(req)
    const id = parseInt(req.params.id, 10)

    if(!parsed.success){
      return res.status(400).json({
        message:"Invalid crediential",
          errors:parsed.error.flatten()
      })
    }
    if(Number.isNaN(id)){
      return res.status(400).json({message:"Invalid todo id"})
    }
    const response = await updateTodo(id,userId,toTodoData(parsed.data))
    return res.status(201).json(response)
    }
    catch(error:unknown){
      const message = error instanceof Error ? error.message : "something went wrong";
      return res.status(500).json({message});
    }}

export async function getTodoController(req:Request,res:Response){
  try{
    const userId = getUserId(req)
    if(!userId){
      throw new Error ("userid not found ")
    }
    const response = await getTodo(userId)
    return res.status(200).json(response)
    }
    catch(error:unknown){
      const message = error instanceof Error ? error.message : "something went wrong";
      return res.status(500).json({message});
    }}

export async function deleteTodoController(req:Request,res:Response){
  try{
    const userId = getUserId(req)
    const id = parseInt(req.params.id, 10)

    if(Number.isNaN(id)){
      return res.status(400).json({message:"Invalid todo id"})
    }

    const response = await deleteTodo(userId,id)
    return res.status(200).json(response)
    }
    catch(error:unknown){
      const message = error instanceof Error ? error.message : "something went wrong";
      return res.status(500).json({message});
    }}
