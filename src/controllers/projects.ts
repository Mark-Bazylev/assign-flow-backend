import { Prisma, Project } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { projectService } from "../services/project-service/project.service";
import { StatusCodes } from "http-status-codes";
import { RequestWithUser } from "../middleware/authentication";
import {NotFoundError} from "../errors/";

interface ProjectRequest extends RequestWithUser {
  body: Project
}

export async function getAllProjects(
  req: ProjectRequest,
  res: Response,
  next: NextFunction,
) {
  const projects = await projectService.getAllProjects();
  res.status(StatusCodes.OK).json(projects);
}

export async function getProject(
  req: ProjectRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const project = await projectService.getProject(req.params.id);
    if(!project){
      throw new NotFoundError("Project Not Found.");
    }
    res.status(StatusCodes.OK).json(project);
  } catch (e) {
    next(e);
  }
}

export async function createProject(
  req: ProjectRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const project = await projectService.createProject(req.body);
    res.status(StatusCodes.OK).json(project);
  } catch (e) {
    next(e);
  }
}

export async function updateProject(
  req: ProjectRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const project = await projectService.updateProject(req.params.id, req.body);
    res.status(StatusCodes.OK).json(project);
  } catch (e) {
    next(e);
  }
}
export async function deleteProject(
  req: ProjectRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const project = await projectService.deleteProject(req.params.id);
    //add deleting tasks
    res.status(StatusCodes.OK).json(project);
  } catch (e) {
    next(e);
  }
}
