import { IsString, IsOptional, IsNumber } from 'class-validator'

export class QueryTranslationMemoryDto {
  @IsString()
  content!: string

  @IsString()
  sourceLocale!: string

  @IsString()
  targetLocale!: string

  @IsOptional()
  @IsNumber()
  projectId?: number
}
