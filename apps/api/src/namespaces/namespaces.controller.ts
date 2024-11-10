import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Put,
  Delete,
} from '@nestjs/common'
import { NamespacesService } from './namespaces.service'

@Controller('namespaces')
export class NamespacesController {
  constructor(private readonly namespacesService: NamespacesService) {}

  @Get()
  findByProject(@Query('projectId') projectId: string) {
    return this.namespacesService.findByProject(+projectId)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.namespacesService.findOne(+id)
  }

  @Post()
  create(
    @Body()
    createNamespaceDto: {
      name: string
      projectId: number
    }
  ) {
    return this.namespacesService.create(createNamespaceDto)
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateNamespaceDto: {
      name?: string
    }
  ) {
    return this.namespacesService.update(+id, updateNamespaceDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.namespacesService.remove(+id)
  }
}
