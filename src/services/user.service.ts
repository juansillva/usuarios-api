import { User } from "../entities/user";
import { UserRepository } from "../repositories/user.repository";
import { CreateUserDTO } from "../dto/user.dto";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

export class UserService {

  private userRepository = new UserRepository();

  async createUser(dto: CreateUserDTO): Promise<User> {
    const existingEmail = await this.userRepository.findByEmail(dto.email);
    if (existingEmail) throw new Error("Email já registrado");

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    
    const user = new User(null, dto.name, dto.email, hashedPassword);

    return await this.userRepository.create(user);
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    if (!users) throw new Error("Erro ao buscar os usuários");
    return users;
  }

  async findUsersByName(name: string): Promise<User[]> {
    const users = await this.userRepository.findByName(name);
    if (!users) throw new Error("Usuário não encontrado");
    return users;
  }

  async updateUser(id: number, dto: CreateUserDTO): Promise<User> {
    
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error("Usuário não encontrado");

    user.setName(dto.name);
    user.setEmail(dto.email);

    if (dto.password) {
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      user.setHashPassword(hashedPassword);
    }

    await this.userRepository.update(user);
    return user;
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error("Usuário não encontrado");

    await this.userRepository.delete(id);
  }

  async login(email: string, password:string): Promise<User>{
     const user = await this.userRepository.findByEmail(email)
     
     if(!user){
        throw new Error("Usuário não cadastrado")
     }

    const passwordCorrect = await bcrypt.compare(password, user.getHashPassword());
    if (!passwordCorrect) {
      throw new Error('Senha inválida');
    }

    const token = jwt.sign(
      { id: user.getId(), 
        email: user.getEmail() 
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );

    return user;
  }
}
