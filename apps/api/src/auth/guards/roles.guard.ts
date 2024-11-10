import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ProjectRole } from '../../projects/dto/project-member.dto'
import { PrismaService } from '@bumblebee/database'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<ProjectRole[]>(
      'roles',
      context.getHandler()
    )

    if (!requiredRoles) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const user = request.user
    const projectId = parseInt(
      request.params.projectId || request.query.projectId
    )

    if (!projectId || !user) {
      return false
    }

    const member = await this.prisma.projectUser.findUnique({
      where: {
        projectId_userId: {
          projectId,
          userId: user.id,
        },
      },
    })

    if (!member) {
      return false
    }

    const roleHierarchy = {
      [ProjectRole.OWNER]: 5,
      [ProjectRole.MANAGER]: 4,
      [ProjectRole.TRANSLATOR]: 3,
      [ProjectRole.REVIEWER]: 2,
      [ProjectRole.MEMBER]: 1,
    }

    const userRoleLevel = roleHierarchy[member.role]
    const requiredRoleLevel = Math.max(
      ...requiredRoles.map((role) => roleHierarchy[role])
    )

    return userRoleLevel >= requiredRoleLevel
  }
}
