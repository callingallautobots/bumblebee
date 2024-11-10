import { IsString, IsNumber } from 'class-validator'

export class CreateTranslationDto {
  @IsString()
  content!: string

  @IsString()
  locale!: string

  @IsNumber()
  translationKeyId!: number
}
