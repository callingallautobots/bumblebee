export class UpdateUserDto {
  email?: string
  password?: string
  name?: string
  role?: 'ADMIN' | 'PROJECT_MANAGER' | 'TRANSLATOR' | 'REVIEWER'
}
