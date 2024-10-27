import { FullNameState as InitialState } from "../chat-controller/sign-up";
import { State } from "../chat-controller/interface";
import { generateMenu } from "../../helpers";
import {
  wrongAnswerMessage,
  exitMessage,
  welcomeToChatMessage,
  restartChatMessage,
} from "../../helpers/messages";
import { inputListener } from "../../helpers/input-listeners";
import {
  getAllowedMenu,
  isAllowedOption,
} from "../../helpers/user-permissions";
import { TicketController } from "../ticket-controller";
import { time } from "../../../config";
import { Actions, ActiveUsers, ChatUser, Request } from "../../domain";

import { InMemoryDatabase } from "../../services/database/in-memory";
import { ETicketConfirmationOptions } from "../../domain/menu-options/shared/success";

const activeUsers = new InMemoryDatabase<string, ActiveUsers>({ time });

const handleInitialPayload = (user: ChatUser) => {
  const state = InitialState;

  const payload: ActiveUsers["payload"] = {
    createdAt: new Date(),
    ticket: {},
    currentState: state,
    previousStates: [],
  };

  activeUsers.set(user.phoneNumber, { payload });
  return state;
};

const handleGoBack = (
  user: ChatUser,
  activeUser: ActiveUsers,
  isFirsStage: boolean
) => {
  const previousState = isFirsStage
    ? activeUser.payload.currentState
    : activeUser.payload.previousStates.pop();

  const payload = { ...activeUser.payload, currentState: previousState };

  activeUsers.set(user.phoneNumber, { payload });
  return previousState;
};

const handleUpdateState = (
  user: ChatUser,
  activeUser: ActiveUsers,
  ticket: Request,
  nextState: State
) => {
  activeUser.payload.previousStates.push(activeUser.payload.currentState);

  const payload: ActiveUsers["payload"] = {
    ...activeUser.payload,
    ticket,
    currentState: nextState,
  };

  activeUsers.set(user.phoneNumber, { payload });
};

const handleExit = (user: ChatUser) => {
  activeUsers.delete(user.phoneNumber);
};

const handleFinalStage = (state: State, request: Request, user: ChatUser) => {
  activeUsers.delete(user.phoneNumber);
  if (state?.type === "service") TicketController.create(request);
  return state;
};

const buildTicket = (
  choice: string,
  ticketData: Request,
  currentState: State
): Request => {
  const {
    user: inputListenerUser,
    destination: inputListenerDestination,
    information: inputListenerInformation,
    ...rest
  } = inputListener(currentState.menu, choice) as any;

  return {
    ...ticketData,
    ...rest,
    user: { ...ticketData.user, ...inputListenerUser },
    destination: { ...ticketData.destination, ...inputListenerDestination },
    information: { ...ticketData.information, ...inputListenerInformation },
  };
};

export function botController(user: ChatUser): string {
  const activeUser = activeUsers.get(user.phoneNumber);

  if (!activeUser) {
    const { menu } = handleInitialPayload(user);
    return welcomeToChatMessage(generateMenu(menu));
  }

  const choice = user.message;
  const { currentState } = activeUser.payload;

  try {
    const isFirstStage = activeUser.payload.previousStates.length === 0;
    const hasGoBackChoose = choice.toLowerCase() === Actions.goBack;
    const hasExitChoose = choice.toLowerCase() === Actions.exit;

    const ticket = buildTicket(choice, activeUser.payload.ticket, currentState);

    const nextState = currentState?.next(choice, ticket);
    const isFinalStage = !nextState?.next;

    if (hasGoBackChoose) {
      const { menu } = handleGoBack(user, activeUser, isFirstStage);
      return generateMenu(menu);
    }

    if (hasExitChoose) {
      handleExit(user);
      return exitMessage();
    }

    if (!nextState) return wrongAnswerMessage(generateMenu(currentState.menu));

    const { userType } = ticket.user;

    const _isAllowedOption = isAllowedOption(
      currentState.menu.className,
      userType,
      choice
    );

    if (!_isAllowedOption)
      return wrongAnswerMessage(generateMenu(currentState.menu));

    if (isFinalStage) {
      const restart = choice === ETicketConfirmationOptions.NoINeedRestart;

      if (restart) {
        const { menu } = handleInitialPayload(user);
        return restartChatMessage(generateMenu(menu));
      }

      handleFinalStage(nextState, ticket, user);
      return nextState.answer(choice);
    }

    if (userType) {
      const options = getAllowedMenu(
        nextState.menu.className,
        userType,
        activeUser.payload.currentState.next(choice, ticket)
      );

      if (options) {
        const newState = {
          ...nextState,
          menu: { ...nextState.menu, options },
        };
        handleUpdateState(user, activeUser, ticket, newState);
        return generateMenu(newState.menu);
      }
    }

    handleUpdateState(user, activeUser, ticket, nextState);

    return generateMenu(nextState.menu);
  } catch (error) {
    console.log({ error });
    return wrongAnswerMessage(generateMenu(currentState.menu));
  }
}
