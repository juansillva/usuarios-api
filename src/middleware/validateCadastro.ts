//Classe de validação do Cadastro

export class Validator {
   validateEmail(email: string) {
    const erro: Error[] = [];
    if (!email.includes("@")) {
      erro.push(new Error("Email inválido"));
    }

    return erro;
  }

   validateSenha(senha: string) {
    const erro: Error[] = [];
    if (senha.length < 6) {
      erro.push(new Error("A senha deve ter no mínimo 6 caracteres"));
    }

    return erro;
  }

   validateNome(nome: string) {
    const erro: Error[] = [];
    const primeiraLetra = nome.charAt(0);
    if (primeiraLetra !== primeiraLetra.toUpperCase()) {
      erro.push(new Error("Digite a primeira letra do seu nome maiúscula"));
    }
    return erro;
  }

   validateAll(nome: string, email: string, senha: string) {
    const erro: Error[] = [];

    const campos = {
      nome,
      email,
      senha,
    };

    const campoVazio = Object.entries(campos).find(([chave, valor]) => !valor);

    if (campoVazio) {
      erro.push(new Error(`Preencha o campo de ${campoVazio}`));
    }

    erro.push(...this.validateEmail(email))
    erro.push(...this.validateEmail(senha))
    erro.push(...this.validateEmail(nome))
    
    if (erro.length > 0) {
      throw new Error(erro.map((e) => e.message).join(" | "));
    }

    return erro;
  }
}
