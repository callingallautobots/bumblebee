import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { AppModule } from '../src/app.module'
import { PrismaService } from '@bumblebee/database'

describe('UsersController (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwtToken: string

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    prisma = moduleFixture.get<PrismaService>(PrismaService)
    await app.init()

    // 创建测试用户并获取 JWT token
    await request(app.getHttpServer()).post('/auth/register').send({
      email: 'admin@example.com',
      password: 'admin123',
      name: 'Admin User',
    })

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'admin@example.com',
        password: 'admin123',
      })

    jwtToken = loginResponse.body.access_token
  })

  beforeEach(async () => {
    // 清理测试数据，但保留管理员用户
    await prisma.user.deleteMany({
      where: {
        email: { not: 'admin@example.com' },
      },
    })
  })

  afterAll(async () => {
    await prisma.user.deleteMany()
    await app.close()
  })

  describe('/users (GET)', () => {
    it('should return all users', () => {
      return request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true)
          expect(res.body.length).toBeGreaterThan(0)
        })
    })
  })

  describe('/users (POST)', () => {
    it('should create a new user', () => {
      return request(app.getHttpServer())
        .post('/users')
        .set('Authorization', `Bearer ${jwtToken}`)
        .send({
          email: 'newuser@example.com',
          password: 'password123',
          name: 'New User',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id')
          expect(res.body.email).toBe('newuser@example.com')
        })
    })
  })

  describe('/users/:id (GET)', () => {
    it('should return a user by id', async () => {
      const user = await prisma.user.findFirst({
        where: { email: 'admin@example.com' },
      })

      if (!user) {
        throw new Error('测试用户未找到')
      }

      return request(app.getHttpServer())
        .get(`/users/${user.id}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(user.id)
          expect(res.body.email).toBe(user.email)
        })
    })
  })
})
