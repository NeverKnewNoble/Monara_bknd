/**
 * User entity.
 *
 * Describes the shape of a user as stored by the app. When we move from
 * an in-memory array to a real database, this class will also become the
 * database model (e.g. a Prisma model or TypeORM entity).
 */
export class User {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
