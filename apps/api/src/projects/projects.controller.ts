import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common'
import { ProjectsService } from './projects.service'
import { CreateProjectDto } from './dto/create-project.dto'
import { UpdateProjectDto } from './dto/update-project.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import {
  AddProjectMemberDto,
  UpdateProjectMemberDto,
} from './dto/project-member.dto'
import { RolesGuard } from '../auth/guards/roles.guard'
import { Roles } from '../decorators/roles.decorator'
import { ProjectRole } from './dto/project-member.dto'

@Controller('projects')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findAll() {
    return this.projectsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id)
  }

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id)
  }

  @Get(':id/members')
  getMembers(@Param('id') id: string) {
    return this.projectsService.getMembers(+id)
  }

  @Post(':id/members')
  @Roles(ProjectRole.OWNER, ProjectRole.MANAGER)
  addMember(
    @Param('id') id: string,
    @Body() addMemberDto: AddProjectMemberDto
  ) {
    return this.projectsService.addMember(
      +id,
      addMemberDto.userId,
      addMemberDto.role
    )
  }

  @Put(':id/members/:userId')
  @Roles(ProjectRole.OWNER, ProjectRole.MANAGER)
  updateMemberRole(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @Body() updateMemberDto: UpdateProjectMemberDto
  ) {
    return this.projectsService.updateMemberRole(
      +id,
      +userId,
      updateMemberDto.role
    )
  }

  @Delete(':id/members/:userId')
  removeMember(@Param('id') id: string, @Param('userId') userId: string) {
    return this.projectsService.removeMember(+id, +userId)
  }
}
