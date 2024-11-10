import { IsString, IsNumber, IsArray } from 'class-validator'

export class ImportTranslationsDto {
  @IsNumber()
  projectId!: number

  @IsArray()
  translations!: Array<{
    key: string
    namespace: string
    locale: string
    content: string
  }>
}

export interface ExportTranslationsDto {
  projectId: number
  locales?: string[]
  namespaceId?: number
  format?: 'json' | 'csv' | 'xlsx'
}
