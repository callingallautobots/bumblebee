import type { User, Project, Translation } from './prisma'

// Auth
export interface LoginResponse {
  access_token: string
  user: User
}

// Stats
export interface TranslationStats {
  total: number
  draft: number
  review: number
  approved: number
  rejected: number
  completion: number
  byLocale: Record<string, LocaleStats>
}

export interface LocaleStats {
  total: number
  draft: number
  review: number
  approved: number
  rejected: number
  completion: number
}

// Import/Export
export interface ImportValidationError {
  row?: number
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
