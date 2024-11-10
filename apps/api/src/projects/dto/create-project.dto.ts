import { IsString, IsArray, IsOptional } from 'class-validator'

export class CreateProjectDto {
  @IsString()
  name!: string

  @IsOptional()
  @IsString()
  description?: string

  @IsString()
  sourceLocale!: string

  @IsArray()
  @IsString({ each: true })
  targetLocales!: string[]
}
