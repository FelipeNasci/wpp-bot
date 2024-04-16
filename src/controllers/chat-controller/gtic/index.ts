import { State } from "../interface";
import { GTIC, EGticOptions } from "../../../domain/menu-options/gtic";
import { InternetAccessState } from "./internet";
import { ZimbraKindServiceState } from "./email-zimbra";
import { EmailGroupKindState } from "./email-group";
import { EquipmentServiceKindState } from "./it-equipment";
import { SetupKindState } from "./setup-and-installation";
import { ItManagementState } from "./it-management";

export const GticMenuOptionsState: State = {
  menu: GTIC,
  next: (choice: string): State => {
    switch (choice) {
      case EGticOptions.InternetAccess:
        return InternetAccessState;

      case EGticOptions.EmailZimbra:
        return ZimbraKindServiceState;

      case EGticOptions.EmailGroup:
        return EmailGroupKindState;

      case EGticOptions.ItEquipments:
        return EquipmentServiceKindState;

      case EGticOptions.SetupAndInstallation:
        return SetupKindState;

      case EGticOptions.ItManagement:
        return ItManagementState;
    }
  },
};
