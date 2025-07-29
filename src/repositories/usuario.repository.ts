import db from '../database/db';
import { Usuario } from '../entities/usuario';

export class UsuarioRepository {
  
  
  async create(usuario: Usuario): Promise<Usuario> {
    const query = db.prepare('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)');
    const info = query.run(usuario.getNome(), usuario.getEmail(), usuario.getSenhaHash());
    usuario.setId(info.lastInsertRowid as number);
    return usuario;
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    const row = db.prepare('SELECT id, nome, email, senha FROM usuarios WHERE email = ?').get(email) as UsuarioRow;
    if (!row) return null;

    return new Usuario(row.id, row.nome, row.email, row.senha);
  }

  async findAll(): Promise<Usuario[]> {
    const rows = db.prepare('SELECT id, nome, email, senha FROM usuarios').all() as UsuarioRow[];

    return rows.map((row: any) => new Usuario(row.id, row.nome, row.email, row.senha));
  }

  async update(usuario: Usuario): Promise<void> {
    const query = db.prepare('UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?');
    query.run(usuario.getNome(), usuario.getEmail(), usuario.getSenhaHash(), usuario.getId());
  }

  async delete(id: number): Promise<void> {
    const result = db.prepare('DELETE FROM usuarios WHERE id = ?').run(id);
    if (result.changes === 0) {
      return undefined;
    }
  }

  async findById(id: number): Promise<Usuario | null> {
    const row = db.prepare('SELECT id, nome, email, senha FROM usuarios WHERE id = ?').get(id) as UsuarioRow;
    if (!row) return null;
    return new Usuario(row.id, row.nome, row.email, row.senha);
  }

}
