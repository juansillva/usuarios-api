export class Usuario {
    constructor (
        private id: number | null,
        private nome: string,
        private email: string,
        private senha: string | null
    ) 
    {}

    public setId(id: number | null): void {
    this.id = id;
    }
     public getId(): number | null{
       return this.id;
     }

      public getNome(): string {
        return this.nome;
    }

    public getEmail(): string {
        return this.email;
    }
    
}
