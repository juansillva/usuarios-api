import { Request, Response } from "express";
import { UsuarioService } from "../services/usuario.service";
import { UsuarioCadastroDTO } from "../dto/usuarioDTO";
import { Validator } from "../middleware/validator";

const usuarioService = new UsuarioService();
const validator = new Validator();

export async function cadastrarUsuario(req: Request, res: Response) {
  const { nome, email, senha } = req.body;

  const dto: UsuarioCadastroDTO = {
    nome,
    email,
    senha,
  };

  try {
    validator.validateAll(nome, email, senha);

    const novoUsuario = await usuarioService.cadastrarUsuario(dto);

    res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
      usuario: novoUsuario.toJSON(),
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export async function listarUsuarios(req: Request, res: Response) {
  try {
    const usuarios = await usuarioService.listarUsuarios();
    res.status(200).json({
      message: "Lista de usuários cadastrados no sistema.",
      usuarios,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export async function buscarUsuario(req: Request, res: Response) {

  const nome = req.params.nome;

  if (!nome) {
    return res.status(400).json({ message: "Usuário inexistente" });
  }

  try {
    const usuario = await usuarioService.buscarUsuario(nome);
    res.json({
      message: "Usuário encontrado",
      usuario: usuario,
    });
  } catch (error: any) {
    res.json({
      message: error,
    });
  }
}

export async function excluirUsuario(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  try {
    await usuarioService.excluirUsuario(id);
    res.status(200).json({ message: "Usuário excluído com sucesso" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export async function atualizarUsuario(req: Request, res: Response) {
  
  const id = Number(req.params.id);
  const { nome, email, senha } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  if (!nome || !email) {
    return res.status(400).json({ message: "Nome e email são obrigatórios" });
  }

  try {
    validator.validateAll(nome, email, senha ?? "123456");

    const dto: UsuarioCadastroDTO = {
      nome,
      email,
      senha,
    };
    const usuarioAtualizado = await usuarioService.atualizarUsuario(id, dto);

    res.status(200).json({
      message: "Usuário atualizado com sucesso",
      usuario: usuarioAtualizado,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}
