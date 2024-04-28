import {
  actions,
  didNotUnderstand,
  restartChat,
  welcomeToChat,
} from "../../../assets/texts";

const emptyLine = "";

export const wrongAnswerMessage = (menu: string) => {
  const { title, tryAgain } = didNotUnderstand;
  return [title, tryAgain, emptyLine, menu].join("\n");
};

export const welcomeToChatMessage = (menu: string) => {
  const { title, subtitle, goBack, exit } = welcomeToChat;
  return [title, subtitle, goBack, exit, emptyLine, menu].join("\n");
};

export const restartChatMessage = (menu: string) => {
  const { title, subtitle, goBack, exit } = restartChat;
  return [title, subtitle, goBack, exit, emptyLine, menu].join("\n");
};

export const exitMessage = () => actions.exit;
