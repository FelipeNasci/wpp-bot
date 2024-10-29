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

export const gticsetupInstallationTicketConfirmation = (ticket: Ticket) => {
  const data = [
    `*Nome*: ${ticket?.user?.name}`,
    `*Tipo de vínculo*: ${ticket?.user?.userType}`,
    `*email*: ${ticket?.user?.email}`,
    `*Local*: ${ticket?.destination?.location} - ${ticket?.destination?.block} - ${ticket?.destination?.room}`,
    `*Tipo de Serviço*: ${ticket?.information.category} - ${ticket?.information.serviceType} - ${ticket?.information.equipmentKind}`,
    `*Equipamento*: ${ticket?.information.equipmentKind}`,
    `*Identificação do Equipamento*: ${ticket?.information.equipmentId}`,
    `*Detalhes*: ${ticket?.information.description}`,
  ];

  return data.join("\n");
};

export const gticEquipmentTicketConfirmation = (ticket: Ticket) => {
  const data = [
    `*Nome*: ${ticket?.user?.name}`,
    `*Tipo de vínculo*: ${ticket?.user?.userType}`,
    `*email*: ${ticket?.user?.email}`,
    `*Local*: ${ticket?.destination?.location} - ${ticket?.destination?.block} - ${ticket?.destination?.room}`,
    `*Tipo de Serviço*: ${ticket?.information.category} - ${ticket?.information.serviceType} - ${ticket?.information.equipmentKind}`,
    `*Equipamento*: ${ticket?.information.equipmentKind}`,
    `*Identificação do Equipamento*: ${ticket?.information.equipmentId}`,
    `*Detalhes*: ${ticket?.information.description}`,
  ];

  return data.join("\n");
};

export const gticItManagementTicketConfirmation = (ticket: Ticket) => {
  const data = [
    `*Nome*: ${ticket?.user?.name}`,
    `*Tipo de vínculo*: ${ticket?.user?.userType}`,
    `*email*: ${ticket?.user?.email}`,
    `*Local*: ${ticket?.destination?.location}`,
    `*Tipo de Serviço*: ${ticket?.information.category}`,
    `*Detalhes*: ${ticket?.information.description}`,
  ];

  return data.join("\n");
};

export const gticZimbraTicketConfirmation = (ticket: Ticket) => {
  const data = [
    `*Nome*: ${ticket?.user?.name}`,
    `*Tipo de vínculo*: ${ticket?.user?.userType}`,
    `*Seu Email*: ${ticket?.user?.email}`,
    `*Você está em*: ${ticket?.destination?.location}`,
    `*O que você precisa*: ${ticket?.information?.serviceType} em ${ticket?.information.category}`,
    `*Detalhes*: ${ticket?.information.description}`,
  ];

  return data.join("\n");
};

export const gticEmailGroupTicketConfirmation = (ticket: Ticket) => {
  const data = [
    `*Nome*: ${ticket?.user?.name}`,
    `*Tipo de vínculo*: ${ticket?.user?.userType}`,
    `*Seu Email*: ${ticket?.user?.email}`,
    `*Você está em*: ${ticket?.destination?.location}`,
    `*O que você precisa*: Entrar no ${ticket?.information.category}: ${ticket?.information?.serviceType} `,
    `*Detalhes*: ${ticket?.information.description}`,
  ];

  return data.join("\n");
};

export const puTicketConfirmationTemplate = (ticket: Ticket) => {
  const data = [
    `*Nome*: ${ticket?.user?.name}`,
    `*email*: ${ticket?.user?.email}`,
    `Setor que deverá lhe atender: Subprefeitura Universitária`,
    `*Local de atendimento*: ${ticket?.destination?.location} - ${ticket?.destination?.block} - ${ticket?.destination?.specificPlace}`,
    `*O que deve ser feito*: Manutenção relacionada a ${ticket?.information.serviceType} - ${ticket.information.description}`,
  ];

  return data.join("\n");
};

export const administrativeConsultancyConfirmationTemplate = (
  ticket: Ticket
) => {
  const data = [
    `*Nome*: ${ticket?.user?.name}`,
    `*email*: ${ticket?.user?.email}`,
    `Setor que deverá lhe atender: Assessoria Administrativa`,
    `*Local de atendimento*: ${ticket?.destination?.location}`,
    `*O que deve ser feito*: ${ticket.information.description}`,
  ];

  return data.join("\n");
};

export const asconConfirmationTemplate = (ticket: Ticket) => {
  const data = [
    `*Nome*: ${ticket?.user?.name}`,
    `*email*: ${ticket?.user?.email}`,
    `Setor que deverá lhe atender: ASCON - Assessoria de comunicação`,
    `*Local de atendimento*: ${ticket?.destination?.location}`,
    `*O que deve ser feito*: ${ticket.information.description}`,
  ];

  return data.join("\n");
};
