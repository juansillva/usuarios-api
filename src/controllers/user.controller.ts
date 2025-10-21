import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { CreateUserDTO } from "../dto/user.dto";
import { Validator } from "../middleware/validator";
import { error } from "console";


const userService = new UserService();

const validator = new Validator();

// Criar usuário
export async function createUser(req: Request, res: Response) {

  const { name, email, password } = req.body;
  
  const dto: CreateUserDTO = { name, email, password };

  try {
    validator.validateAll(name, email, password);

    const newUser = await userService.createUser(dto);

    res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
      user: newUser.toJSON(),
    });
  } catch (error: any) {

    res.status(400).json({ message: error.message });
  }
}

// Listar todos os usuários
export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({
      message: "Lista de usuários cadastrados no sistema.",
      users,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

// Buscar usuário por nome
export async function findUsersByName(req: Request, res: Response) {
  const name = req.params.name;

  if (!name) {
    return res.status(400).json({ message: "Usuário inexistente" });
  }

  try {
    const users = await userService.findUsersByName(name);
    res.status(200).json({
      message: "Usuário encontrado",
      users,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

// Excluir usuário por ID
export async function deleteUser(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  try {
    await userService.deleteUser(id);
    res.status(200).json({ message: "Usuário excluído com sucesso" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

// Atualizar usuário por ID
export async function updateUser(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { name, email, password } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  if (!name || !email) {
    return res
      .status(400)
      .json({ message: "Nome e email são obrigatórios" });
  }

  try {
    validator.validateAll(name, email, password ?? "123456");

    const dto: CreateUserDTO = { name, email, password };
    const updatedUser = await userService.updateUser(id, dto);

    res.status(200).json({
      message: "Usuário atualizado com sucesso",
      user: updatedUser,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }

}
 export async function loginUser(req: Request, res: Response){

   const {email, senha} = req.body

   try {

    validator.validateEmail(email)
    validator.validateSenha(senha)
    const user = userService.login(email, senha)
    res.status(200).json({
      message: 'Usuário autenticado com sucesso',
      usuario: user
    })
   } catch (error: any) {
    res.status(400).json({message: error})
   }
}
