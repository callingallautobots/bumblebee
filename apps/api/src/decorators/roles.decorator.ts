import { SetMetadata } from '@nestjs/common'
import { ProjectRole } from '../projects/dto/project-member.dto'

export const Roles = (...roles: ProjectRole[]) => SetMetadata('roles', roles)
