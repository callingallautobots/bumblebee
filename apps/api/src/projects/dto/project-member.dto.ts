import { IsNumber, IsEnum } from 'class-validator'

export enum ProjectRole {
  OWNER = 'OWNER',
  MANAGER = 'MANAGER',
  TRANSLATOR = 'TRANSLATOR',
  REVIEWER = 'REVIEWER',
  MEMBER = 'MEMBER',
}

export class AddProjectMemberDto {
  @IsNumber()
  userId!: number

  @IsEnum(ProjectRole)
  role!: ProjectRole
}

export class UpdateProjectMemberDto {
  @IsEnum(ProjectRole)
  role!: ProjectRole
}
