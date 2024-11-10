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
import { TagsService } from './tags.service'
import { CreateTagDto, UpdateTagDto, BulkCreateTagsDto } from './dto/tag.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@Controller('tags')
@UseGuards(JwtAuthGuard)
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  findAll() {
    return this.tagsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagsService.findOne(+id)
  }

  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto)
  }

  @Post('bulk')
  bulkCreate(@Body() bulkCreateDto: BulkCreateTagsDto) {
    return this.tagsService.bulkCreate(bulkCreateDto.names)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.update(+id, updateTagDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagsService.remove(+id)
  }
}
