import { MenuOptions } from "../../domain/menu-options/interface";

type Type = "service" | "information";

export type State = {
  type?: Type;
  menu?: MenuOptions;
  next?: (choice: string, ticket?: any) => State;
  answer?: (choice: string) => string;
};

export { MenuOptions as Flow };
