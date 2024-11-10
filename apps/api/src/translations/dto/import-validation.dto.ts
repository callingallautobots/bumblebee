import { TranslationStatus } from '../enums/translation-status.enum'

export interface ImportValidationError {
  row: number
  field: string
  message: string
}

export interface ImportResult {
  success: boolean
  total: number
  created: number
  updated: number
  failed: number
  errors: ImportValidationError[]
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
