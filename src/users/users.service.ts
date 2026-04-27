/**
 * Users service.
 *
 * Handles everything about users that lives in the database — creation,
 * lookup, and updates. All persistence goes through `PrismaService`,
 * which extends Prisma's `PrismaClient` and gives us typed access to the
 * tables defined in `prisma/schema.prisma`.
 *
 * `PrismaModule` is `@Global()` so Nest can inject `PrismaService` here
 * without UsersModule having to import PrismaModule explicitly.
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new user row in the database.
   *
   * The `id`, `createdAt` and `updatedAt` columns are filled in
   * automatically by Prisma (see the defaults in `schema.prisma`).
   *
   * @param data - email, name and (already hashed) password.
   * @returns the newly created user.
   */
  async create (data: CreateUserDto) {
    return this.prisma.user.create({ data });
  }

  /**
   * Look up a user by email. Used by AuthService during login.
   *
   * @returns the matching user, or `null` if no one has that email.
   */
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  /**
   * Look up a user by id.
   *
   * @throws NotFoundException if no user has that id.
   */
  async findById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  /**
   * Update the given fields on an existing user.
   *
   * Prisma automatically bumps `updatedAt` because the column is marked
   * `@updatedAt` in the schema — we don't need to set it by hand.
   *
   * @throws NotFoundException if no user has that id.
   */
  async update(id: string, data: UpdateUserDto) {
    try {
      return await this.prisma.user.update({ where: { id }, data });
    } catch (err) {
      // Prisma throws P2025 ("record to update not found") when `id` doesn't exist.
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        throw new NotFoundException('User not found');
      }
      throw err;
    }
  }
}
