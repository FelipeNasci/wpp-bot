import { botController } from "../../../../../src/controllers/bot-controller";
import { phoneNumberMock, gticMock } from "./mocks";

enum Choice {
  ANY_MESSAGE = "Message_test",
  LOCATION = "1",
  BOND_TYPE = "1",
  EMAIL = "message_test@mail.com",
  GTIC = "1",
  INTERNET_ACCESS = "1",
  SETUP_WIFI = "1",
}

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

describe("when user want to setup wifi with operational system:", () => {
  Object.entries(gticMock.internet.setupWifi.operationSystem).forEach(
    ([OS, value]) => {
      describe(`#${OS}`, () => {
        beforeAll(() => {
          goToInternetFailureStage();
        });

        let output: string;

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

          describe("when user select setup wifi", () => {
            it("returns operational system options", () => {
              output = makeSut({ message: Choice.SETUP_WIFI });
              expect(output).toEqual(gticMock.internet.setupWifi.menu);
            });
          });

          describe(`when user select the operational system ${OS}`, () => {
            it(`returns how to setup wifi within ${OS}`, () => {
              output = makeSut({ message: value.option });
              expect(output).toEqual(value.answer);
            });
          });
        });
      });
    }
  );
});
