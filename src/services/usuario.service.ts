import { Usuario } from "../entities/usuario";
import { UsuarioRepository } from "../repositories/usuario.repository";
import { UsuarioCadastroDTO } from "../dto/usuarioDTO";
import bcrypt from "bcrypt";

export class UsuarioService {
  private usuarioRepository = new UsuarioRepository();

  async cadastrarUsuario(dto: UsuarioCadastroDTO): Promise<Usuario> {
    const emailExistente = await this.usuarioRepository.findByEmail(dto.email);
    if (emailExistente) throw new Error("Email já cadastrado");

    const senhaHash = await bcrypt.hash(dto.senha, 10);

    const usuario = new Usuario(null, dto.nome, dto.email, senhaHash);

    return await this.usuarioRepository.create(usuario);
  }

  async listarUsuarios(): Promise<Usuario[]> {
    if (!this.usuarioRepository.findAll()) {
      throw new Error("Erro ao buscar os usuários");
    }
    return await this.usuarioRepository.findAll();
  }

  async buscarUsuario(nome: string): Promise<Usuario[]> {

    const usuario = await this.usuarioRepository.findByName(nome);
    if (!usuario) throw new Error("Usuário não encontrado");

    return usuario;
  }

  
  async atualizarUsuario(id: number, dto: UsuarioCadastroDTO): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findById(id);
    if (!usuario) throw new Error("Usuário não encontrado");

    usuario.setNome(dto.nome);
    usuario.setEmail(dto.email);

    if (dto.senha) {
      const senhaHash = await bcrypt.hash(dto.senha, 10);
      usuario.setSenha(senhaHash);
    }

    await this.usuarioRepository.update(usuario);
    return usuario;
  }

  async excluirUsuario(id: number): Promise<void> {
    const usuario = await this.usuarioRepository.findById(id);
    if (!usuario) throw new Error("Usuário não encontrado");

    await this.usuarioRepository.delete(id);
  }
}
