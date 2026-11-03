import type { Translations } from "./en"

const pt: Translations = {
  home: {
    versionFast: "v2 rápida",
    versionStandard: "v2",
    showTour: "Mostrar o tour do app",
    passphrase: "Frase secreta",
    password: "Senha",
    site: "Nome do site (ex.: gmail)",
    generate: "Gerar",
    finalPassword: "Senha final",
    copied: "Copiada. A área de transferência será limpa em %{seconds}s.",
    generateError: "Não foi possível gerar a senha",
  },
  tour: {
    welcomeTitle: "Bem-vindo ao Crypto Pass",
    welcomeBody:
      "O Crypto Pass cria senhas fortes a partir de coisas que você consegue lembrar. Digite as mesmas informações e você terá a mesma senha, em qualquer celular, sempre.",
    v2Title: "v2 (recomendada)",
    v2Body:
      "Usa sua frase secreta, sua senha, o nome do site e um contador, então cada site tem a própria senha. Para trocar a senha de um site, aumente o contador dele. Pode levar de 1 a 2 segundos em celulares mais antigos.",
    v2FastTitle: "v2 rápida",
    v2FastBody:
      "Funciona como a v2, mas usa metade da memória: é cerca de duas vezes mais rápida e um pouco menos resistente a ataques. Ela gera senhas diferentes da v2, então use sempre a mesma versão para cada site.",
    warningTitle: "Nada é salvo",
    warningBody:
      "O Crypto Pass nunca guarda nem envia nada: nem sua frase secreta, senha ou nomes de sites, nem as senhas que ele cria.",
    warningLoss:
      "Se você esquecer qualquer uma dessas informações, ou qual versão e contador usou, a senha estará perdida para sempre. Ninguém consegue recuperá-la.",
    warningTip:
      "Dica: anote a versão e o contador que você usa em cada site. Eles não são secretos. Nunca anote sua frase secreta e sua senha.",
    acknowledge: "Entendo que esquecer uma informação significa perder a senha",
    start: "Começar a usar o Crypto Pass",
    next: "Próximo",
    back: "Voltar",
    skip: "Pular",
  },
}

export default pt
