import { State } from "../../../../src/controllers/chat-controller/interface";
import { Ticket } from "../../../../src/domain";

export const ticketMock: Ticket = {
  user: {
    name: "John Doe",
    email: "john.doe@unb.br",
    userType: "Aluno",
  },
  destination: {
    department: "ascon",
    location: "Rio Tinto",
    block: "A",
    room: "101",
  },
  serviceType: "Manutenção",
  equipment: "Computador",
  equipmentId: "123456",
};

export const puMaintenanceMoreDetailsStateMock: State = {
  menu: {
    message: [
      "Por favor, confirme as informações do seu chamado.",
      "Se estiver tudo certo, envie 'ok'",
      " ",
      "Caso vocë queira alterar alguma informação utilize o comando 'voltar'",

      `*Nome*: ${ticketMock.user.name}`,
      `*Tipo de vínculo*: ${ticketMock.user.userType}`,
      `*email*: ${ticketMock.user.email}`,
      `*Local*: ${ticketMock.destination.location} - ${ticketMock.destination.block} - ${ticketMock.destination.room}`,
      `*Tipo de Serviço*: ${ticketMock.serviceType}`,
      `*Equipamento*: ${ticketMock.equipment}`,
      `*Identificação do Equipamento*: ${ticketMock.equipmentId}`,
    ].join("\n"),
  },
};
