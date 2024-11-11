import { TranslationStatus } from '@bumblebee/database'

export interface CreateProjectDto {
  name: string
  description?: string
  sourceLocale: string
  targetLocales: string[]
}

export interface ImportTranslationsDto {
  projectId: number
  translations: {
    key: string
    namespace: string
    locale: string
    content: string
  }[]
}

export interface ValidatedTranslation {
  key: string
  namespace: string
  locale: string
  content: string
  status: TranslationStatus
  isValid: boolean
  errors: string[]
}
