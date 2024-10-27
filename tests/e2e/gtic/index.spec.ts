import { botController } from "../../../src/controllers/bot-controller";
import { ENTRYPOINT_MENU_OPTIONS } from "../../../src/domain/menu-options";
import { ChatUser } from "../../../src/domain";
import { welcomeToChatMessage } from "../../../src/helpers/messages";
import * as Signup from "../../../src/domain/menu-options/sign-up";
import { generateMenu } from "../../../src/helpers";
import { GTIC } from "../../../src/domain/menu-options/gtic";
import { ZIMBRA_KIND_SERVICE, ZIMBRA_MORE_DETAILS } from "../../../src/domain/menu-options/gtic/email-zimbra";
import { SUCCESS_ANSWER } from "../../../src/domain/menu-options/shared/success";

const useMock: ChatUser = { phoneNumber: "string", message: "" };

const setup = (message: string) => botController({ ...useMock, message });

describe("GTIC Integration Tests", () => {
  test("step 1", () => {
    expect(setup("Hello")).toBe(welcomeToChatMessage(Signup.FULL_NAME.message));
  });

  test("step 2", () => {
    expect(setup("Hello")).toBe(generateMenu(Signup.USER_TYPE));
  });

  test("step 3", () => {
    expect(setup("1")).toBe(generateMenu(Signup.LOCATION));
  });

  test("step 4", () => {
    expect(setup("2")).toBe(generateMenu(Signup.EMAIL));
  });

  test("step 5", () => {
    expect(setup("jhon@doe.com")).toBe(generateMenu(ENTRYPOINT_MENU_OPTIONS));
  });

  test("step 6", () => {
    expect(setup("1")).toBe(generateMenu(GTIC));
  });

  test("step 7", () => {
    expect(setup("2")).toBe(generateMenu(ZIMBRA_KIND_SERVICE));
  });

  test("step 8", () => {
    expect(setup("1")).toBe(generateMenu(ZIMBRA_MORE_DETAILS));
  });

  test("step 8", () => {
    // SUCCESS_ANSWER
    expect(setup("1")).toBe(generateMenu(ZIMBRA_MORE_DETAILS));
  });
});
