import db from "../database/db";

export class UsuarioExcluir {
  public async excluirUsuario(id: number): Promise<number> {
    
    const queryGet = 'SELECT id FROM usuarios WHERE id = ?';
    const queryDelete = 'DELETE FROM usuarios WHERE id = ?';

    const row = db.prepare(queryGet).get(id);

    if (!row) {
      throw new Error ('Erro ao deletar usuário') 
    }
    
    const result = db.prepare(queryDelete).run(id);
    return result.changes; 
  }
}
