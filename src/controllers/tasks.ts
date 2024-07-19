import { Response, NextFunction } from "express";
import { RequestWithUser } from "../middleware/authentication";
import { Prisma, Task } from "@prisma/client";
import { taskService } from "../services/taks-service/task.service";
import { StatusCodes } from "http-status-codes";

interface TasksRequest extends RequestWithUser {
  body: Task;
}

export async function getAllTasks(
  req: TasksRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const tasks = await taskService.getAllTasks();
    res.status(StatusCodes.OK).json(tasks);
  } catch (e) {
    next(e);
  }
}

export async function getTask(
  req: TasksRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const task = await taskService.getTask(req.params.id);
    res.status(StatusCodes.OK).json(task);
  } catch (e) {
    next(e);
  }
}

export async function createTask(
  req: TasksRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const task = await taskService.createTask(req.body);
    res.status(StatusCodes.OK).json(task);
  } catch (e) {
    next(e);
  }
}

export async function updateTask(
  req: TasksRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const task = await taskService.updateTask(req.params.id, req.body);
    res.status(StatusCodes.OK).json(task);
  } catch (e) {
    next(e);
  }
}

export async function deleteTask(
  req: TasksRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const task = await taskService.deleteTask(req.params.id);
    res.status(StatusCodes.OK).json(task);
  } catch (e) {
    next(e);
  }
}
