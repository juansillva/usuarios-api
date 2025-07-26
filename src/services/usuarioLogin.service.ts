import { UsuarioLoginDTO } from "../dto/UsuarioDTO";
import db from '../database/db'


export class UsuarioLogin {
    public async loginUsuario(dto: UsuarioLoginDTO){

        const queryPost = 'SELECT * FROM usuarios'

        const row = db.prepare(queryPost).get(dto)

        if (!row) {
            throw new Error('Usuário não encontrado');
        }
          
    }
}