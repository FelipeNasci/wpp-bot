import { Ticket } from "../../domain";

export const ticketConfirmation = (ticket: Ticket) => {
  const data = [
    `*Nome*: ${ticket?.user?.name}`,
    `*Tipo de vínculo*: ${ticket?.user?.userType}`,
    `*email*: ${ticket?.user?.email}`,
    `*Local*: ${ticket?.destination?.location} - ${ticket?.destination?.block} - ${ticket?.destination?.room}`,
    `*Tipo de Serviço*: ${ticket?.serviceType}`,
    `*Equipamento*: ${ticket?.equipment}`,
    `*Identificação do Equipamento*: ${ticket?.equipmentId}`,
  ];

  return data.join("\n");
};
