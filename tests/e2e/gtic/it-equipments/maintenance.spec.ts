import { botController } from "../../../../src/controllers/bot-controller";
import {
  ENTRYPOINT_MENU_OPTIONS,
  EntrypointOptions,
} from "../../../../src/domain/menu-options";
import {
  ChatUser,
  Location,
  Ticket,
  TicketDestination,
} from "../../../../src/domain";
import { welcomeToChatMessage } from "../../../../src/helpers/messages";
import * as Signup from "../../../../src/domain/menu-options/sign-up";
import { generateMenu } from "../../../../src/helpers";
import { GTIC, EGticOptions } from "../../../../src/domain/menu-options/gtic";
import {
  gticEmailGroupTicketConfirmation,
  gticEquipmentTicketConfirmation,
} from "../../../../src/templates/ticket-confirmation";
import {
  SUCCESS_ANSWER,
  TICKET_CONFIRMATION,
} from "../../../../src/domain/menu-options/shared/success";
import { ELocation } from "../../../../src/domain/menu-options/sign-up";
import EmailSender from "../../../../src/services/email";
import {
  EEmailGroupKind,
  EMAIL_GROUP_KIND,
  EMAIL_GROUP_MORE_DETAILS,
} from "../../../../src/domain/menu-options/gtic/email-group";
import { EquipmentServiceKindState } from "../../../../src/controllers/chat-controller/gtic/it-equipment";
import {
  EEquipmentServiceType,
  EEquipmentType,
  EQUIPMENT_BLOCK_LOCATION,
  EQUIPMENT_HALL_LOCATION,
  EQUIPMENT_ID,
  EQUIPMENT_MAINTENANCE_KIND,
  EQUIPMENT_MORE_DETAILS,
  EQUIPMENT_SERVICE_KIND,
} from "../../../../src/domain/menu-options/gtic/it-equipment";

jest.mock("../../../../src/services/email", () => ({
  send: jest.fn(),
}));

const data = {
  firstMessage: "Hello",
  confirmTicket: "1",
  user: { name: "John Doe", email: "jhon@ccae.ufpb.br" },
  destination: {
    block: "MA",
    room: "104",
  },
  information: {
    equipmentId: "60 503 404",
    description:
      "Preventive and corrective maintenance of IT equipment available at LabSec.",
  },
};
const input = {
  ...data,
  user: { ...data.user, userType: Signup.EUserType.TAE },
  destination: {
    ...data.destination,
    location: Signup.ELocation.MME,
    department: EntrypointOptions.GTIC,
  },
  information: {
    ...data.information,
    category: EGticOptions.ItEquipments,
    equipmentKind: EEquipmentType.Computer,
    serviceType: EEquipmentServiceType.Maintenance,
  },
};

const ticketMock: Ticket = {
  ...data,
  user: {
    ...data.user,
    userType: Signup.USER_TYPE.options[Signup.EUserType.TAE],
  },
  destination: {
    ...data.destination,
    location: Signup.LOCATION.options[ELocation.MME] as Location,
    department: ENTRYPOINT_MENU_OPTIONS.options[
      EntrypointOptions.GTIC
    ] as TicketDestination,
  },
  information: {
    ...data.information,
    category: GTIC.options[EGticOptions.ItEquipments],
    equipmentKind: EQUIPMENT_MAINTENANCE_KIND.options[EEquipmentType.Computer],

    serviceType:
      EQUIPMENT_SERVICE_KIND.options[EEquipmentServiceType.Maintenance],
  },
};

const useMock: ChatUser = { phoneNumber: "string", message: "" };

const setup = (message: string) => botController({ ...useMock, message });

describe("e2e: GTIC > IT Equipments :", () => {
  describe("Maintenance", () => {
    test("[step 1] - Input: Say hello - Answer: Full Name", () => {
      expect(setup(input.firstMessage)).toBe(
        welcomeToChatMessage(Signup.FULL_NAME.message)
      );
    });

    test("[step 2] - Input: Inform name - Answer: User Type", () => {
      expect(setup(input.user.name)).toBe(generateMenu(Signup.USER_TYPE));
    });

    test("[step 3] - Input: User Type - Answer: User Location", () => {
      expect(setup(input.user.userType)).toBe(generateMenu(Signup.LOCATION));
    });

    test("[step 4] - Input: User Location - Answer: User Email", () => {
      expect(setup(input.destination.location)).toBe(
        generateMenu(Signup.EMAIL)
      );
    });

    test("[step 5] - Input: User Email - Answer: Which department do you want open a ticket", () => {
      expect(setup(input.user.email)).toBe(
        generateMenu(ENTRYPOINT_MENU_OPTIONS)
      );
    });

    test("[step 6] - Input: 1: GTIC - Answer: GTIC Options", () => {
      expect(setup(input.destination.department)).toBe(generateMenu(GTIC));
    });

    test("[step 7] - Input: 3: Select It Equipments - Answer: Equipment Service Options", () => {
      expect(setup(input.information.category)).toBe(
        generateMenu(EQUIPMENT_SERVICE_KIND)
      );
    });

    test("[step 8] - Input: 1: Select Maintenance IT Equipment - Answer: Which kind of equipment do you want a service", () => {
      expect(setup(input.information.serviceType)).toBe(
        generateMenu(EQUIPMENT_MAINTENANCE_KIND)
      );
    });

    test("[step 9] - Input: 1: Select Equipment Kind - Answer: Which kind of equipment do you want a service", () => {
      expect(setup(input.information.equipmentKind)).toBe(
        generateMenu(EQUIPMENT_ID)
      );
    });

    test("[step 10] - Input: 1: Type Equipment Id - Answer: Which block location is localized the equipment", () => {
      expect(setup(input.information.equipmentId)).toBe(
        generateMenu(EQUIPMENT_BLOCK_LOCATION)
      );
    });

    test("[step 11] - Input: 1: Type Block Location - Answer: Which room location is localized the equipment", () => {
      expect(setup(input.destination.block)).toBe(
        generateMenu(EQUIPMENT_HALL_LOCATION)
      );
    });

    test("[step 12] - Input: Hall Location - Answer: More Details", () => {
      expect(setup(input.destination.room)).toBe(
        generateMenu(EQUIPMENT_MORE_DETAILS)
      );
    });

    test("[step 13] - Input: Describe the Ticket - Answer: Ticket Confirmation", () => {
      const descriptionMock = [
        TICKET_CONFIRMATION.message,
        gticEquipmentTicketConfirmation(ticketMock),
        " ",
      ].join("\n");

      expect(setup(input.information.description)).toBe(
        generateMenu({ ...TICKET_CONFIRMATION, message: descriptionMock })
      );
    });

    test("[step 14] - Input: Confirm message - Answer: Success Message", () => {
      expect(setup(input.confirmTicket)).toBe(generateMenu(SUCCESS_ANSWER));
      expect(EmailSender.send).toHaveBeenCalled();
    });
  });
});
