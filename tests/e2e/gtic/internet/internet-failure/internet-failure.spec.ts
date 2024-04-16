import { botController } from "../../../../../src/controllers/bot-controller";
import { gticMock, phoneNumberMock } from "./mocks";

enum Choice {
  ANY_MESSAGE = "Message_test",
  LOCATION = "1",
  BOND_TYPE = "1",
  EMAIL = "message_test@mail.com",
  GTIC = "1",
  INTERNET_ACCESS = "1",
  ETHERNET_FAILURE = "2",
  WIFI_FAILURE = "3",
}

const failureType = {
  [Choice.ETHERNET_FAILURE]: "Ethernet Failure",
  [Choice.WIFI_FAILURE]: "Wifi Failure",
};

const choices: Choice[] = [Choice.ETHERNET_FAILURE, Choice.WIFI_FAILURE];

type MakeSutParams = {
  message: string;
  phoneNumber?: string;
};

const makeSut = (params: MakeSutParams) =>
  botController({ phoneNumber: phoneNumberMock, ...params });

const goToInternetFailureStage = () => {
  makeSut({ message: Choice.ANY_MESSAGE });
  makeSut({ message: Choice.ANY_MESSAGE });
  makeSut({ message: Choice.BOND_TYPE });
  makeSut({ message: Choice.LOCATION });
  makeSut({ message: Choice.EMAIL });
};

choices.forEach((choice) => {
  describe(`#${failureType[choice]} - when the user want to report a internet error`, () => {
    beforeAll(() => {
      goToInternetFailureStage();
    });

    let output: string;

    describe("and when starts the bot", () => {
      describe("when user select the GTIC option", () => {
        it("returns the GTIC options", () => {
          output = makeSut({ message: Choice.GTIC });
          expect(output).toEqual(gticMock.menu);
        });

        describe("when user select internet access", () => {
          it("returns internet services options", () => {
            output = makeSut({ message: Choice.INTERNET_ACCESS });
            expect(output).toEqual(gticMock.internet.menu);
          });
        });

        describe("when user select ethernet error", () => {
          it("returns a question asking which block the problem occurred in", () => {
            output = makeSut({ message: choice });
            expect(output).toEqual(gticMock.internet.failure.block);
          });
        });

        describe("when user report the block with failure", () => {
          it("returns a question asking which hall the problem occurred in", () => {
            output = makeSut({ message: Choice.ANY_MESSAGE });
            expect(output).toEqual(gticMock.internet.failure.hall);
          });
        });

        describe("when user report the hall with failure", () => {
          it("returns a question asking more details about the problem", () => {
            output = makeSut({ message: Choice.ANY_MESSAGE });
            expect(output).toEqual(gticMock.internet.failure.moreDetails);
          });
        });

        describe("when user report more details about the failure", () => {
          it("returns a answer saying that the report was sent", () => {
            output = makeSut({ message: Choice.ANY_MESSAGE });
            expect(output).toEqual(gticMock.internet.failure.answer);
          });
        });
      });
    });
  });
});
