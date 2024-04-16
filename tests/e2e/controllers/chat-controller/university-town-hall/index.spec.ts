import { PuMaintenanceDepartmentKindState } from "../../../../../src/controllers/chat-controller/university-town-hall";
import { botControllerSut } from "../../../shared-flow";

type Step = {
  describe: string;
  it: string;
  input: { message: string };
  output: {
    output: string;
    matcher: "toEqual";
    expected: string;
  };
  params?: {
    showConsole?: boolean;
  };
};

const steps: Step[] = [
  {
    describe: "when user arrive in the University Town Hall menu",
    it: "returns the menu options",
    input: { message: "ola" },
    output: {
      output: "create",
      matcher: "toEqual",
      expected: [
        "Olá 😁, vamos iniciar nos apresentando. Eu sou o 🤖 CCAE-BOT, o assistente virtual do CCAE.",
        "A qualquer momento você pode enviar:",
        `⬅️ "voltar" para retornar ao menu anterior`,
        `💡 "sair" para encerrar o atendimento`,
        "",
        "Qual o seu nome completo?",
      ].join("\n"),
    },
  },
  {
    describe: "when user arrive in the University Town Hall menu",
    it: "returns the menu options",
    input: { message: "ola" },
    output: {
      output: "create",
      matcher: "toEqual",
      expected: [
        "Olá 😁, vamos iniciar nos apresentando. Eu sou o 🤖 CCAE-BOT, o assistente virtual do CCAE.",
        "A qualquer momento você pode enviar:",
        `⬅️ "voltar" para retornar ao menu anterior`,
        `💡 "sair" para encerrar o atendimento`,
        "",
        "Qual o seu nome completo?",
      ].join("\n"),
    },
  },
];

steps.forEach((step) => {
  describe(step.describe, () => {
    it(step.it, () => {
      const { matcher, expected } = step.output;
      const { params } = step;
      const output = botControllerSut(step.input);
      !!params?.showConsole && console.log(output);
      expect(output)[matcher](expected);
    });
  });
});
