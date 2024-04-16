import { botController } from "../../../src/controllers/bot-controller";
import { signUpMock, phoneNumberMock, actionsMock } from "./mocks";

enum ChatAction {
  START = "Hello, I need help",
  GO_BACK = "Voltar",
}

enum Choice {
  NAME = "Message_test",
  LOCATION = "1",
  BOND_TYPE = "1",
  EMAIL = "message_test@mail.com",
}

type MakeSutParams = {
  message: string;
  phoneNumber?: string;
};

const makeSut = (params: MakeSutParams) =>
  botController({ phoneNumber: phoneNumberMock, ...params });

describe("and when starts the bot", () => {
  let output: string;
  describe("and the bot request a signup form", () => {
    it("asks for user his name", () => {
      output = makeSut({ message: ChatAction.START });
      expect(output).toEqual(actionsMock.welcomeMessage);
    });
    it(`asks for user his name if receive ${ChatAction.GO_BACK} as answer`, () => {
      output = makeSut({ message: ChatAction.GO_BACK });
      expect(output).toEqual(signUpMock.nameRequest);
    });

    describe("when user send his name", () => {
      it("asks for user his bond type", () => {
        output = makeSut({ message: Choice.NAME });
        expect(output).toEqual(signUpMock.bondRequest);
      });

      it(`asks for user his name if receive ${ChatAction.GO_BACK} as answer`, () => {
        output = makeSut({ message: ChatAction.GO_BACK });
        expect(output).toEqual(signUpMock.nameRequest);
      });

      it(`asks for user his name if receive ${ChatAction.GO_BACK} as answer`, () => {
        output = makeSut({ message: ChatAction.GO_BACK });
        expect(output).toEqual(signUpMock.nameRequest);
      });

      it("asks for user his bond type", () => {
        output = makeSut({ message: Choice.NAME });
        expect(output).toEqual(signUpMock.bondRequest);
      });
    });

    describe("when user send the correct bond type", () => {
      it("asks for user his location", () => {
        output = makeSut({ message: Choice.BOND_TYPE });
        expect(output).toEqual(signUpMock.localizationRequest);
      });
    });

    describe("when user send his location", () => {
      it("asks for user his email", () => {
        output = makeSut({ message: Choice.LOCATION });
        expect(output).toEqual(signUpMock.emailRequest);
      });
    });
  });
});
