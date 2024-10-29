import whatsappMessages from "./services/whatsapp-messages";
import { botController } from "./controllers/bot-controller";

function sendMessage(client, sendTo, text: string) {
  client
    .sendText(sendTo, text)
    .then((result) => {})
    .catch((erro) => {
      console.error("ERRO: ", erro);
    });
}

async function startServer() {
  whatsappMessages
    .createServer()
    .then(handleClient)
    .catch((error) => console.log({ error }));
}

function handleClient(client) {
  client.onMessage((message) => messageHandler(client, message));
}

function messageHandler(client, message) {
  if (!message?.body) return;

  const response = botController({
    phoneNumber: message.from,
    message: message.body,
  });

  if (!response) return;

  sendMessage(client, message.from, response);
}

startServer();
