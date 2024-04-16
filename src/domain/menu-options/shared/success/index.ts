import { MenuOptions } from '../../interface'

export const TICKET_CONFIRMATION: MenuOptions = {
  className: "TICKET_CONFIRMATION",
  message: [
    "Por favor, confirme as informações do seu chamado.",
    "Se estiver tudo certo, envie 'ok'",
    " ",
    "Caso vocë queira alterar alguma informação utilize o comando 'voltar'",
  ].join("\n"),
};

export const SUCCESS_ANSWER: MenuOptions = {
  message:
    "Tudo certo! Nós registramos o seu chamado. Obrigado! Fique de olho em seu e-mail.",
};
