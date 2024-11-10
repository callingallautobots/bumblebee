import { IsEmail, IsString, IsOptional } from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  email!: string

  @IsString()
  password!: string

  @IsOptional()
  @IsString()
  name?: string
  role?: 'ADMIN' | 'PROJECT_MANAGER' | 'TRANSLATOR' | 'REVIEWER'
}