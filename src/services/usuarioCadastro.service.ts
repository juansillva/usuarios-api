import { Usuario } from "../entities/usuario";
import { UsuarioCadastroDTO } from "../dto/UsuarioDTO";
import bcrypt from "bcrypt";
import db from "../database/db";


export class UsuarioCadastro {

  public async cadastrarUsuario(dto: UsuarioCadastroDTO) {

    const saltRounds = 10;
    const senhaHash = await bcrypt.hash(dto.senha, saltRounds);

    const novoUsuario = new Usuario(null, dto.nome, dto.email, dto.senha);

    const insert = db.prepare(
      "INSERT INTO usuarios (nome,email,senha) VALUES (?,?,?)"
    );

    const info = insert.run(dto.nome, dto.email, senhaHash);

    novoUsuario.setId(info.lastInsertRowid as number);
    
    return novoUsuario;
  }

}
