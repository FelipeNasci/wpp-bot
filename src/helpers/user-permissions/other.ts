import { EGticOptions, GTIC } from "../../domain/menu-options/gtic";

export const otherPermissions = {
  denied: {
    [GTIC.className]: [
      EGticOptions.EmailZimbra,
      EGticOptions.EmailGroup,
      EGticOptions.ItManagement,
    ],
  },
};
