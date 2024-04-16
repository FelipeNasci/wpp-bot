import { MenuOptions } from "../domain/menu-options/interface";

const getOptions = (options: MenuOptions["options"]) =>
  Object.entries(options)
    .map(([key, value]) => `${key} - ${value}`)
    .join("\n");

export const generateMenu = ({ message, options }: MenuOptions) => {
  const formattedOptions = options && getOptions(options);
  return [message, formattedOptions].join("\n").trim();
};

/**
 * Returns an array of values from an object
 * @param object The object to extract values from
 * @returns An array of values from the object
 */
export const extractValuesFromObject = <ValueType>(
  object: object
): ValueType[] => Object.entries(object).map(([_, value]) => value);
