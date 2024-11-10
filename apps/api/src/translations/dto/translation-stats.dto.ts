import { IsNumber, IsOptional } from 'class-validator'

export class TranslationStatsQueryDto {
  @IsNumber()
  projectId!: number

  @IsOptional()
  @IsNumber()
  namespaceId?: number
}

export interface TranslationStats {
  total: number
  draft: number
  review: number
  approved: number
  rejected: number
  completion: number
  byLocale: {
    [key: string]: {
      total: number
      draft: number
      review: number
      approved: number
      rejected: number
      completion: number
    }
  }
}
