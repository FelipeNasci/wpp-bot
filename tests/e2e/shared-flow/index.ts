import { botController } from "../../../src/controllers/bot-controller";

type MakeSutParams = { message: string; phoneNumber?: string };

const phoneNumberMock = "+5583999999997";

export const botControllerSut = (params: MakeSutParams) =>
  botController({ phoneNumber: phoneNumberMock, ...params });
