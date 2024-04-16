import { PuMaintenanceMoreDetailsState } from "../../../../../src/controllers/chat-controller/university-town-hall";
import { puMaintenanceMoreDetailsStateMock, ticketMock } from "../mocks";

describe("University Town Hall", () => {
  describe("PuMaintenanceMoreDetailsState", () => {
    it("goes to correct menu when receive the correct input", () => {
      const chat = PuMaintenanceMoreDetailsState;
      const output = chat.next("moreDetailsChoice", ticketMock);

      expect(output.menu.message).toEqual(
        puMaintenanceMoreDetailsStateMock.menu.message
      );
    });
  });
});
