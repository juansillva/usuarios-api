export class UsuarioListagemDTO {
  constructor(
    public nome?: string,
    public email?: string,
  ) {}
}

export class UsuarioCadastroDTO{
  constructor(
    public nome: string,
    public email: string,
    public senha: string
  ){}

}

export class UsuarioLoginDTO{
  constructor(
    public email: string,
    public senha: string
  ){}

}

