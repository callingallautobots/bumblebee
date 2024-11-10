import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common'
import { TranslationKeysService } from './translation-keys.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@Controller('translation-keys')
@UseGuards(JwtAuthGuard)
export class TranslationKeysController {
  constructor(
    private readonly translationKeysService: TranslationKeysService
  ) {}

  @Get()
  findByNamespace(@Query('namespaceId') namespaceId: string) {
    return this.translationKeysService.findByNamespace(+namespaceId)
  }

  @Post()
  create(
    @Body()
    createDto: {
      key: string
      description?: string
      namespaceId: number
      tags?: string[]
    }
  ) {
    return this.translationKeysService.create(createDto)
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateDto: {
      key?: string
      description?: string
      tags?: string[]
    }
  ) {
    return this.translationKeysService.update(+id, updateDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.translationKeysService.remove(+id)
  }
}
