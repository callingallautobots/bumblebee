import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from './users.service'
import { PrismaService } from '@bumblebee/database'

describe('UsersService', () => {
  let service: UsersService
  let prisma: PrismaService

  const mockPrismaService = {
    user: {
      findMany: jest.fn(),
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile()

    service = module.get<UsersService>(UsersService)
    prisma = module.get<PrismaService>(PrismaService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('findAll', () => {
    it('should return an array of users', async () => {
      mockPrismaService.user.findMany.mockResolvedValue([
        { id: 1, email: 'test@test.com' },
      ])

      const result = await service.findAll()

      expect(result).toEqual([{ id: 1, email: 'test@test.com' }])
    })
  })

  describe('create', () => {
    it('should create a new user and return it', async () => {
      const mockUser = {
        id: 1,
        email: 'test@test.com',
        name: 'Test User',
        password: 'password123',
      }
      mockPrismaService.user.create.mockResolvedValue(mockUser)

      const result = await service.create(mockUser)

      expect(result).toEqual(mockUser)
    })
  })

  describe('findOne', () => {
    it('should return a user when found', async () => {
      const mockUser = {
        id: 1,
        email: 'test@test.com',
        name: 'Test User',
      }
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser)

      const result = await service.findOne(1)

      expect(result).toEqual(mockUser)
    })

    it('should return null when user not found', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null)

      const result = await service.findOne(1)

      expect(result).toBeNull()
    })
  })

  describe('update', () => {
    it('should update a user and return it', async () => {
      const mockUser = {
        id: 1,
        email: 'test@test.com',
        name: 'Test User',
      }
      mockPrismaService.user.update.mockResolvedValue(mockUser)

      const result = await service.update(1, mockUser)

      expect(result).toEqual(mockUser)
    })
  })

  describe('remove', () => {
    it('should delete a user and return it', async () => {
      const mockUser = {
        id: 1,
        email: 'test@test.com',
        name: 'Test User',
      }
      mockPrismaService.user.delete.mockResolvedValue(mockUser)

      const result = await service.remove(1)

      expect(result).toEqual(mockUser)
    })
  })
})
