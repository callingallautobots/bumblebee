import { IsString, IsOptional, IsArray } from 'class-validator'

export class CreateTagDto {
  @IsString()
  name!: string

  @IsOptional()
  @IsString()
  description?: string
}

export class UpdateTagDto {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  description?: string
}

export class BulkCreateTagsDto {
  @IsArray()
  @IsString({ each: true })
  names!: string[]
}
