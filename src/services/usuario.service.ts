import { Usuario } from '../entities/usuario';
import { UsuarioRepository } from '../repositories/usuario.repository';

import { UsuarioCadastroDTO } from '../dto/usuarioDTO';

import bcrypt from 'bcrypt';

export class UsuarioService {
    
  private usuarioRepository = new UsuarioRepository();

  async cadastrarUsuario(dto: UsuarioCadastroDTO): Promise<Usuario> {

    const existente = await this.usuarioRepository.findByEmail(dto.email)
    if (existente) throw new Error('Email já cadastrado');

    const senhaHash = await bcrypt.hash(dto.senha, 10);
    const usuario = new Usuario(null, dto.nome, dto.email, senhaHash);

    return await this.usuarioRepository.create(usuario);

  }

  async listarUsuarios(): Promise<Usuario[]> {
    
    if(!this.usuarioRepository.findAll){
      throw new Error('Erro ao buscar os usuários')
    }

    return await this.usuarioRepository.findAll();

  }

  async atualizarUsuario(id: number, nome: string, email: string, senha?: string): Promise<Usuario> {

    const usuario = await this.usuarioRepository.findById(id);

    if (!usuario) throw new Error('Usuário não encontrado');

    usuario.setNome(nome);
    usuario.setEmail(email);

    if (senha) {
      const senhaHash = await bcrypt.hash(senha, 10);
      usuario.setSenha(senhaHash);
    }

    await this.usuarioRepository.update(usuario);
    return usuario;
  }

  async excluirUsuario(id: number): Promise<void> {

    await this.usuarioRepository.delete(id);

  }


}
