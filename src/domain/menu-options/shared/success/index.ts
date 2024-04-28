import { MenuOptions } from "../../interface";

export enum ETicketConfirmationOptions {
  AllRight = "1",
  NoINeedRestart = "2",
}

export const TICKET_CONFIRMATION: MenuOptions = {
  className: "TICKET_CONFIRMATION",
  message: [
    "Por favor, confirme as informações do seu chamado.",
    " ",
    "⚠️ _Adicionalmente, você pode utilizar o comando *'voltar'* para retornar para passos anteriores._",
    " ",
    "🤖As informações estão corretas?",
    " ",
  ].join("\n"),
  options: {
    [ETicketConfirmationOptions.AllRight]: "✅ Sim, está tudo certo!",
    [ETicketConfirmationOptions.NoINeedRestart]:
      "❌ Não, reiniciar o processo de abertura de chamado",
  },
};

export const SUCCESS_ANSWER: MenuOptions = {
  message:
    "Tudo certo! Nós registramos o seu chamado. Obrigado! Fique de olho em seu e-mail.",
};

export const RESTART_PROCESS: MenuOptions = {
  message: "OK! Vamos reiniciar o processo de abertura de chamado.",
};
