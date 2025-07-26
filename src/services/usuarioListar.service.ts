import { UsuarioListagemDTO } from '../dto/UsuarioDTO';
import db from '../database/db'

type usuarioRow = {
    nome: string;
    email: string;
}

export class UsuarioListar {
    public async listarUsuarios () {

        //Query de consulta ao banco de dados, busca (email, senha)
        const query = 'SELECT nome, email FROM usuarios';
        //Rows/linhas que retornam da consulta
        const rows = db.prepare(query).all() as usuarioRow[];

        //Pra cada linha da minha consulta eu crio um novo UsuarioListagemDTO

        const usuarios = rows.map(row => new UsuarioListagemDTO(row.nome, row.email));
        if(rows){
          return usuarios;
        }else{
          throw new Error ('Falha ao buscar os usuários')
        }
    }

}


  


