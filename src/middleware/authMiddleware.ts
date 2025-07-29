import { UsuarioLoginDTO } from '../dto/usuarioDTO';
import { UsuarioService } from '../services/usuario.service';

import jwToken from 'jsonwebtoken';

async function gerarToken(dto: UsuarioLoginDTO) {

    const usuario = await new UsuarioService().
    
    //aqui eu colocaria uma lógica de acesso ao banco de dados, se email e senha for igual ao banco de dados ele gere o token,
  
}