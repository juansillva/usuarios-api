import { Request, Response } from "express";
import { Usuario } from "../entities/usuario";
import { UsuarioCadastroDTO } from "../dto/usuarioDTO";
import { UsuarioCadastro } from "../services/usuarioCadastro.service";
import { UsuarioListar } from "../services/usuarioListar.service";
import { UsuarioExcluir } from "../services/usuarioExcluir.service";
import { Validator } from "../middleware/validateCadastro";
import { UsuarioAtualizar } from "../services/usuarioAtualizar.service";

export async function cadastrarUsuario(req: Request, res: Response) {
  //Body da requisição POST com (nome, email, senha)
  const { nome, email, senha } = req.body;

  //Crio uma variável dto do tipo UsuarioCadastoDTO que vai puxar todas as propriedades (nome, email, senha e referenciar com o do)
  const dto: UsuarioCadastroDTO = {
    nome: nome,
    email: email,
    senha: senha,
  };

  const usuarioCadastrado = new UsuarioCadastro();

  const validate = new ValidateCadastro()

  try {

    await validate.validator(dto.nome, dto.email, dto.senha)

    const novoUsuario = await usuarioCadastrado.cadastrarUsuario(dto);

    res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
      usuario: novoUsuario
    });
  } catch (error: any ) {
    res.status(400).json({
      message: error.message
    });
  }
}


export async function listarUsuarios(req: Request, res: Response) {

  const usuarios = new UsuarioListar();

  try {
    const listaUsuarios = await usuarios.listarUsuarios();
    res.status(200).json({
      message: "Lista de usuários cadastrados no sistema.",
      usuarios: listaUsuarios
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
}

export async function excluirUsuario(req: Request, res: Response) {

  const id = Number(req.params);
  
  const validate = new ValidateCadastro()

  if (id) {
    try {
       const usuarioExcluido = await new UsuarioExcluir().excluirUsuario(id);
        if(usuarioExcluido > 0) {
            res.status(200).json({
                message: "Usuário excluído com sucesso"
            })
        }
    } catch (error: any) {
        return res.status(400).json({
        message: error.message
       }) 
    }
  }
}


export async function alterar (req: Request, res: Response){

    const id = Number(req.params);
     
    const {email, senha} = req.body
    
     if(email && id){
      try {

        const novoEmail = await new UsuarioAtualizar().alterarEmail(id,email)
        res.status(200).json({
         message: `Seu email foi atualizado ${novoEmail}`
      })
      } catch (error: any) {
        res.status(400).json({
          message: error
        })
      }

      }

      if(senha && id){
        try {
          const novaSenha = await new UsuarioAtualizar().alterarSenha(id, senha)
        } catch (error) {
          
        }
      }
}
