import { prisma } from "../database/prisma";
import { User } from "../entities/user";
import { UserRow } from "../database/types";

export class UserRepository {
  async create(user: User): Promise<User> {
    const newUser = await prisma.user.create({
      data: {
        name: user.getName(),
        email: user.getEmail(),
        password: user.getHashPassword(),
      },
    });
    user.setId(newUser.id);
    return user;
  }

  async findById(id: number): Promise<User | null> {
    const row = await prisma.user.findUnique({ where: { id } });
    if (!row) return null;
    return new User(row.id, row.name, row.email, row.password); 
  }

  async findByName(name: string): Promise<User[]> {
    const rows = await prisma.user.findMany({
      where: { name: { contains: name, mode: "insensitive" } },}) as UserRow[];

    return rows.map(row => new User(row.id, row.name, row.email, row.password));
  }

  async findByEmail(email: string): Promise<User | null> {
    const row = await prisma.user.findUnique({ where: { email } });
    if (!row) return null;
    return new User(row.id, row.name, row.email, row.password);
  }

  async findAll(): Promise<User[]> {
    const rows = await prisma.user.findMany() as UserRow[];
    return rows.map(row => new User(row.id, row.name, row.email, row.password));
  }

  async update(user: User): Promise<void> {
    await prisma.user.update({
      where: { id: user.getId()! },
      data: {
        name: user.getName(),
        email: user.getEmail(),
        password: user.getHashPassword(),
      },
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }

}
