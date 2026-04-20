/**
 * Users service.
 *
 * Holds all the logic for creating, finding and updating users.
 * Right now users are stored in memory (a plain array). When you add
 * a database (e.g. Postgres via Prisma/TypeORM), swap the array for
 * real DB calls — the method signatures can stay the same.
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuid } from 'uuid';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  // In-memory "database". Every entry is a full User object.
  private users: User[] = [];

  /**
   * Create a new user and store it.
   *
   * @param data - email, name and (already hashed) password from the caller.
   * @returns the newly created user including its generated id & timestamps.
   */
  async create(data: CreateUserDto) {
    const user: User = {
      id: uuid(), // Random, globally unique id.
      ...data, // email, name, password (hashed by AuthService before this).
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(user);
    return user;
  }

  /**
   * Look up a user by email. Used by AuthService during login.
   *
   * @returns the matching user, or `undefined` if no one has that email.
   */
  async findByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  /**
   * Look up a user by id.
   *
   * @throws NotFoundException if no user has that id.
   */
  async findById(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  /**
   * Merge the provided fields into an existing user.
   *
   * @param id   - user to update.
   * @param data - partial set of fields to overwrite (see UpdateUserDto).
   * @returns the updated user.
   */
  async update(id: string, data: any) {
    const user = await this.findById(id);

    // `Object.assign` copies each key from `data` onto `user`. We also
    // bump `updatedAt` so the timestamp always reflects the latest change.
    Object.assign(user, data, { updatedAt: new Date() });

    return user;
  }
}
