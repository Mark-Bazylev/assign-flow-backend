import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ProjectService {
  public async getAllProjects() {
    return prisma.project.findMany({ include: { tasks: true } });
  }
  public async getProject(id: string) {
    return prisma.project.findUnique({ where: { id } });
  }
  public async createProject(project: Prisma.ProjectCreateInput) {
    const { name, description } = project;
    return prisma.project.create({ data: { name, description } });
  }
  public async updateProject(id: string, update: Prisma.ProjectUpdateInput) {
    const { name, description } = update;
    return prisma.project.update({
      where: { id },
      data: { name, description },
    });
  }
  public async deleteProject(id: string) {
    return prisma.project.delete({ where: { id } });
  }
}

export const projectService = new ProjectService();
