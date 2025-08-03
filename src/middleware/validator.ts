export class Validator {
  validateEmail(email: string): void {
    if (!email.includes("@")) {
      throw new Error("Email inválido");
    }
  }

  validateSenha(senha: string): void {
    if (senha.length < 6) {
      throw new Error("A senha deve ter no mínimo 6 caracteres");
    }
  }

  validateNome(nome: string): void {
    const primeiraLetra = nome.charAt(0);
    if (primeiraLetra !== primeiraLetra.toUpperCase()) {
      throw new Error("Digite a primeira letra do seu nome maiúscula");
    }
  }

  validateAll(nome: string, email: string, senha: string): void {
    // Verifica campos vazios primeiro
    const campos = { nome, email, senha };
    const campoVazio = Object.entries(campos).find(([_, valor]) => !valor);

    if (campoVazio) {
      const [campo] = campoVazio;
      throw new Error(`Preencha o campo de ${campo}`);
    }
    
    this.validateEmail(email);
    this.validateSenha(senha);
    this.validateNome(nome);
  }
}
