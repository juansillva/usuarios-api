export class User {
  constructor(
    private id: number | null,
    private name: string,
    private email: string,
    private HashPassword: string
  ) {}

  public getId(): number | null {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public getHashPassword(): string {
    return this.HashPassword;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public setHashPassword(password: string): void {
    this.HashPassword= password;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
    };
  }
}
