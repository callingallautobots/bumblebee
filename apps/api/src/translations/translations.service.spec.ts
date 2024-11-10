import { Test, TestingModule } from '@nestjs/testing'
import { TranslationsService } from './translations.service'
import { PrismaService } from '@bumblebee/database'
import { ImportValidatorService } from './services/import-validator.service'

describe('TranslationsService', () => {
  let service: TranslationsService
  let prisma: PrismaService
  let importValidator: ImportValidatorService

  const mockPrismaService = {
    translation: {
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    project: {
      findUnique: jest.fn(),
    },
  }

  const mockImportValidator = {
    validateImport: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TranslationsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: ImportValidatorService,
          useValue: mockImportValidator,
        },
      ],
    }).compile()

    service = module.get<TranslationsService>(TranslationsService)
    prisma = module.get<PrismaService>(PrismaService)
    importValidator = module.get<ImportValidatorService>(ImportValidatorService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('findByKey', () => {
    it('should return translations for a key', async () => {
      const mockTranslations = [
        { id: 1, content: 'Hello', locale: 'en' },
        { id: 2, content: '你好', locale: 'zh' },
      ]
      mockPrismaService.translation.findMany.mockResolvedValue(mockTranslations)

      const translations = await service.findByKey(1)
      expect(translations).toEqual(mockTranslations)
    })
  })

  describe('create', () => {
    it('should create a new translation', async () => {
      const mockTranslation = {
        id: 1,
        content: 'Hello',
        locale: 'en',
        translationKeyId: 1,
        creatorId: 1,
      }
      mockPrismaService.translation.create.mockResolvedValue(mockTranslation)

      const result = await service.create({
        content: 'Hello',
        locale: 'en',
        translationKeyId: 1,
        creatorId: 1,
      })

      expect(result).toEqual(mockTranslation)
    })
  })

  describe('updateStatus', () => {
    it('should update translation status', async () => {
      const mockTranslation = {
        id: 1,
        status: 'APPROVED',
        version: 2,
      }
      mockPrismaService.translation.update.mockResolvedValue(mockTranslation)

      const result = await service.updateStatus(1, 'APPROVED')
      expect(result.status).toBe('APPROVED')
      expect(result.version).toBe(2)
    })
  })
})
