import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email)
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password)
    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const payload = { sub: user.id, email: user.email }
    return {
      access_token: this.jwtService.sign(payload),
      user,
    }
  }

  async register(email: string, password: string, name?: string) {
    const existingUser = await this.usersService.findByEmail(email)
    if (existingUser) {
      throw new UnauthorizedException('Email already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await this.usersService.create({
      email,
      password: hashedPassword,
      name,
    })

    const { password: _, ...result } = user
    return result
  }
}
