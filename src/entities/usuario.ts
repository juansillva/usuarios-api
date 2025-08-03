export class Usuario {
  constructor(
    private id: number | null,
    private nome: string,
    private email: string,
    private senhaHash: string
  ) {}

  public getId(): number | null {
    return this.id;
  }

  public getNome(): string {
    return this.nome;
  }

  public getEmail(): string {
    return this.email;
  }

  public getSenhaHash(): string {
    return this.senhaHash;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public setNome(nome: string): void {
    this.nome = nome;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public setSenha(senha: string): void {
    this.senhaHash = senha;
  }

  toJSON() {
    return {
      id: this.id,
      nome: this.nome,
      email: this.email,
    };
  }
}
