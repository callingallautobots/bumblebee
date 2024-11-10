import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() credentials: LoginDto) {
    return this.authService.login(credentials.email, credentials.password)
  }

  @Post('register')
  async register(@Body() registerData: RegisterDto) {
    return this.authService.register(
      registerData.email,
      registerData.password,
      registerData.name
    )
  }
}
