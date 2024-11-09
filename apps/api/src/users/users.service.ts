import { Injectable } from '@nestjs/common';
import { PrismaService } from '@bumblebee/database';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async create(data: { email: string; password: string; name?: string }) {
    return this.prisma.user.create({ data });
  }
} 