import { PrismaClient, Prisma, $Enums, Task } from "@prisma/client";
import { BadRequestError } from "../../errors";
const prisma = new PrismaClient();

class TaskService {
  public async getAllTasks() {
    return prisma.task.findMany();
  }
  public async getTask(id: string) {
    return prisma.task.findUnique({ where: { id } });
  }
  public async createTask(task: Task) {
    const { name, description, dueDate, projectId } = task;
    if (!projectId) {
      throw new BadRequestError("Project Id Is Missing");
    }
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });
    if (!project) {
      throw new BadRequestError("Project Is missing");
    }
    return prisma.task.create({
      data: {
        name,
        description,
        dueDate,
        state: $Enums.TaskState.CREATED,
        projectId,
      },
    });
  }
  public async updateTask(id: string, task: Task) {
    const { name, description, dueDate, state } = task;
    return prisma.task.update({
      where: { id },
      data: { name, description, dueDate, state },
    });
  }
  public async deleteTask(id: string) {
    return prisma.task.delete({ where: { id } });
  }
}

export const taskService = new TaskService();
