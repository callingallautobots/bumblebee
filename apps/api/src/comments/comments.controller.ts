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
import { CommentsService } from './comments.service'
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { User } from '../decorators/user.decorator'

@Controller('comments')
@UseGuards(JwtAuthGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('translation/:translationId')
  findByTranslation(@Param('translationId') translationId: string) {
    return this.commentsService.findByTranslation(+translationId)
  }

  @Post()
  create(
    @Body() createCommentDto: CreateCommentDto,
    @User() user: { id: number }
  ) {
    return this.commentsService.create({
      ...createCommentDto,
      userId: user.id,
    })
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @User() user: { id: number }
  ) {
    return this.commentsService.update(+id, user.id, updateCommentDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: { id: number }) {
    return this.commentsService.remove(+id, user.id)
  }
}
