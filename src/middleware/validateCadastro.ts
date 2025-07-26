//Classe de validação do Cadastro
export class ValidateCadastro {

  public async validator(nome: string, email: string, senha: string) {

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
    
    if (senha.length < 6) {
      erro.push(new Error("A senha deve ter no mínimo 6 caracteres"));
    }

    if (!email.includes("@")) {
      erro.push(new Error("Email inválido"));
    }
    
    const primeiraLetra = nome.charAt(0);
    if (primeiraLetra !== primeiraLetra.toUpperCase()) {
      erro.push(new Error("Digite a primeira letra do seu nome maiúscula"));
    }

     if (erro.length > 0) {
      throw new Error(erro.map(e => e.message).join(" | "));
    }

    return erro;
}
}
    

