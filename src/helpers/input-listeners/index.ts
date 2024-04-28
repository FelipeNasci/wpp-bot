import { MenuOptions } from "../../domain/menu-options/interface";
import {
  USER_TYPE,
  FULL_NAME,
  LOCATION,
  EMAIL,
} from "../../domain/menu-options/sign-up";

import { GTIC } from "../../domain/menu-options/gtic";
import { INTERNET_ACCESS_KIND } from "../../domain/menu-options/gtic/internet";
import {
  BLOCK_FAILURE_INTERNET_ACCESS,
  HALL_FAILURE_INTERNET_ACCESS,
  MORE_DETAILS_FAILURE_INTERNET_ACCESS,
} from "../../domain/menu-options/gtic/internet/failure";

import { ZIMBRA_KIND_SERVICE } from "../../domain/menu-options/gtic/email-zimbra";
import {
  EMAIL_GROUP_KIND,
  EMAIL_GROUP_MORE_DETAILS,
} from "../../domain/menu-options/gtic/email-group";

import {
  EQUIPMENT_SERVICE_KIND,
  EQUIPMENT_BLOCK_LOCATION,
  EQUIPMENT_HALL_LOCATION,
  EQUIPMENT_ID,
  EQUIPMENT_MAINTENANCE_KIND,
  EQUIPMENT_MORE_DETAILS,
} from "../../domain/menu-options/gtic/it-equipment";

import {
  SETUP_EQUIPMENT_BLOCK_LOCATION,
  SETUP_EQUIPMENT_HALL_LOCATION,
  SETUP_EQUIPMENT_ID,
  SETUP_KIND,
  SETUP_EQUIPMENT_MORE_DETAILS,
} from "../../domain/menu-options/gtic/sertup-and-installation";

import {
  IT_MANAGEMENT,
  IT_MANAGEMENT_MORE_DETAILS,
} from "../../domain/menu-options/gtic/it-management";

import { ASCON } from "../../domain/menu-options/ascon";

import { ADMINISTRATIVE_CONSULTANCY } from "../../domain/menu-options/administrative-consultancy";

import {
  PU_DEPARTMENT_REQUESTER,
  PU_REGISTER_NUMBER_REQUESTER,
  PU_DEPARTMENT_PHONE_REQUESTER,
  PU_MAINTENANCE_DEPARTMENT,
  PU_MAINTENANCE_DEPARTMENT_MME,
  PU_MAINTENANCE_DEPARTMENT_RTT,
  PU_MAINTENANCE_CATEGORY,
  PU_MAINTENANCE_MORE_DETAILS,
} from "../../domain/menu-options/university-town-hall";

import { State } from "../../controllers/chat-controller/interface";
import { Request, Ticket, TicketDestination } from "../../domain";

const getClassName = ({ className }: MenuOptions) => className;

export const inputListener = ({ className }: State["menu"], input: string) =>
  mapInputToOptions(className, input);

export const mapInputToOptions = (
  className: string,
  input: string
): Ticket | Request => {
  switch (className) {
    case getClassName(GTIC):
      const servico = GTIC.options[input];

      return {
        servico,
        information: { category: servico },
        destination: { department: TicketDestination.Gtic },
      };

    case getClassName(INTERNET_ACCESS_KIND):
      const option = { "2": "cabo", "3": "wifi" };
      return {
        tipoConexao: option[input],
        tipoServico: option[input],
        serviceType: INTERNET_ACCESS_KIND.options[input],
        connectionType: INTERNET_ACCESS_KIND.options[input],
        information: { connectionType: INTERNET_ACCESS_KIND.options[input] },
      };

    case getClassName(BLOCK_FAILURE_INTERNET_ACCESS):
      return { bloco: input, destination: { block: input } };

    case getClassName(HALL_FAILURE_INTERNET_ACCESS):
      return { sala: input, destination: { room: input } };

    case getClassName(MORE_DETAILS_FAILURE_INTERNET_ACCESS):
      return {
        descricao: input,
        description: input,
        information: { description: input },
      };

    case getClassName(FULL_NAME):
      const name = input;
      return { name, user: { name } };

    case getClassName(USER_TYPE):
      return { tipo: USER_TYPE.options[input], user: { userType: input } };

    case getClassName(LOCATION):
      const location = LOCATION.options[input];
      return {
        unidade: location,
        destination: {
          location: location as Ticket["destination"]["location"],
        },
      };

    case getClassName(EMAIL):
      return { email: input, user: { email: input } };

    case getClassName(ZIMBRA_KIND_SERVICE):
      return {
        tipoServico: ZIMBRA_KIND_SERVICE.options[input],
        serviceType: ZIMBRA_KIND_SERVICE.options[input],
      };

    case getClassName(EMAIL_GROUP_KIND):
      return {
        tipoServico: EMAIL_GROUP_KIND.options[input],
        serviceType: EMAIL_GROUP_KIND.options[input],
      };

    case getClassName(EMAIL_GROUP_MORE_DETAILS):
      return {
        descricao: input,
        description: input,
        information: { description: input },
      };

    case getClassName(EQUIPMENT_SERVICE_KIND):
      return {
        tipoServico: EQUIPMENT_SERVICE_KIND.options[input],
        serviceType: EQUIPMENT_SERVICE_KIND.options[input],
      };

    case getClassName(EQUIPMENT_MAINTENANCE_KIND):
      const equipment = EQUIPMENT_MAINTENANCE_KIND.options[input];
      return {
        dispositivo: equipment,
        equipment,
        information: { equipmentKind: equipment },
      };

    case getClassName(EQUIPMENT_ID):
      return {
        tombamento: input,
        equipmentId: input,
        information: { equipmentId: input },
      };

    case getClassName(EQUIPMENT_BLOCK_LOCATION):
      return { bloco: input, destination: { block: input } };

    case getClassName(EQUIPMENT_HALL_LOCATION):
      return { sala: input, destination: { room: input } };

    case getClassName(EQUIPMENT_MORE_DETAILS):
      return {
        descricao: input,
        description: input,
        information: { description: input },
      };

    case getClassName(SETUP_KIND):
      return {
        tipoServico: SETUP_KIND.options[input],
        serviceType: SETUP_KIND.options[input],
      };

    case getClassName(SETUP_EQUIPMENT_ID):
      return {
        tombamento: input,
        equipmentId: input,
        information: { equipmentId: input },
      };

    case getClassName(SETUP_EQUIPMENT_BLOCK_LOCATION):
      return { bloco: input, destination: { block: input } };

    case getClassName(SETUP_EQUIPMENT_HALL_LOCATION):
      return { sala: input, destination: { room: input } };

    case getClassName(SETUP_EQUIPMENT_MORE_DETAILS):
      return {
        descricao: input,
        description: input,
      };

    case getClassName(IT_MANAGEMENT):
      return {
        tipoServico: IT_MANAGEMENT.options[input],
        serviceType: IT_MANAGEMENT.options[input],
      };

    case getClassName(IT_MANAGEMENT_MORE_DETAILS):
      return {
        descricao: input,
        description: input,
        information: { description: input },
      };

    case getClassName(ASCON):
      return {
        destination: { department: TicketDestination.Ascon },
        descricao: input,
        information: { description: input },
      };

    case getClassName(ADMINISTRATIVE_CONSULTANCY):
      return {
        destination: {
          department: TicketDestination.AdministrativeConsultancy,
        },
        descricao: input,
      };

    case getClassName(PU_DEPARTMENT_REQUESTER):
      return {
        destination: { department: TicketDestination.UniversityTownHall },
        departmentRequester: input,
        user: { department: input },
      };

    case getClassName(PU_REGISTER_NUMBER_REQUESTER):
      return { registerNumberRequester: input, user: { register: input } };

    case getClassName(PU_DEPARTMENT_PHONE_REQUESTER):
      return { departmentPhone: input, destination: { phone: input } };

    case getClassName(PU_MAINTENANCE_DEPARTMENT):
      return {
        maintenanceDepartment: input,
        destination: { specificPlace: input },
      };

    case getClassName(PU_MAINTENANCE_DEPARTMENT_RTT):
      return {
        maintenanceDepartmentLocation:
          PU_MAINTENANCE_DEPARTMENT_RTT.options[input],
        destination: { block: PU_MAINTENANCE_DEPARTMENT_RTT.options[input] },
      };

    case getClassName(PU_MAINTENANCE_DEPARTMENT_MME):
      return {
        maintenanceDepartmentLocation:
          PU_MAINTENANCE_DEPARTMENT_MME.options[input],
        destination: { block: PU_MAINTENANCE_DEPARTMENT_MME.options[input] },
      };

    case getClassName(PU_MAINTENANCE_CATEGORY):
      return {
        tipoServico: PU_MAINTENANCE_CATEGORY.options[input],
        serviceType: PU_MAINTENANCE_CATEGORY.options[input],
      };

    case getClassName(PU_MAINTENANCE_MORE_DETAILS):
      return {
        descricao: input,
        description: input,
      };

    default:
      return {};
  }
};
