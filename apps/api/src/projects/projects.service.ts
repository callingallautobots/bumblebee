import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@bumblebee/database'
import { CreateProjectDto } from './dto/create-project.dto'
import { UpdateProjectDto } from './dto/update-project.dto'
import { ProjectRole } from './dto/project-member.dto'

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.project.findMany({
      include: {
        members: {
          include: {
            user: true,
          },
        },
        namespaces: true,
      },
    })
  }

  async findOne(id: number) {
    return this.prisma.project.findUnique({
      where: { id },
      include: {
        members: {
          include: {
            user: true,
          },
        },
        namespaces: true,
      },
    })
  }

  async create(data: CreateProjectDto) {
    return this.prisma.project.create({
      data,
      include: {
        members: true,
        namespaces: true,
      },
    })
  }

  async update(id: number, data: UpdateProjectDto) {
    return this.prisma.project.update({
      where: { id },
      data,
      include: {
        members: true,
        namespaces: true,
      },
    })
  }

  async remove(id: number) {
    return this.prisma.project.delete({
      where: { id },
    })
  }

  async addMember(projectId: number, userId: number, role: ProjectRole) {
    const project = await this.findOne(projectId)
    if (!project) {
      throw new NotFoundException('Project not found')
    }

    return this.prisma.projectUser.create({
      data: {
        projectId,
        userId,
        role,
      },
      include: {
        user: true,
      },
    })
  }

  async updateMemberRole(projectId: number, userId: number, role: ProjectRole) {
    return this.prisma.projectUser.update({
      where: {
        projectId_userId: {
          projectId,
          userId,
        },
      },
      data: { role },
      include: {
        user: true,
      },
    })
  }

  async removeMember(projectId: number, userId: number) {
    return this.prisma.projectUser.delete({
      where: {
        projectId_userId: {
          projectId,
          userId,
        },
      },
    })
  }

  async getMembers(projectId: number) {
    return this.prisma.projectUser.findMany({
      where: { projectId },
      include: {
        user: true,
      },
    })
  }
}
