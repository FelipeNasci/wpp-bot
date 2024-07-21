import { State } from "../interface";
import {
  ENTRYPOINT_MENU_OPTIONS,
  EntrypointOptions,
} from "../../../domain/menu-options";
import { GticMenuOptionsState } from "../gtic";
import { AsconMenuOptionsState } from "../ascon";
import { AdministrativeConsultancyMenuOptionsState } from "../administrative-consultancy";
import { PuMaintenanceDepartmentKindState } from "../university-town-hall";

export const InitialMenuState: State = {
  menu: ENTRYPOINT_MENU_OPTIONS,
  next: (choice) => {
    switch (choice) {
      case EntrypointOptions.GTIC:
        return GticMenuOptionsState;
      case EntrypointOptions.ASCON:
        return AsconMenuOptionsState;
      case EntrypointOptions.ADMINISTRATIVE_CONSULTANCY:
        return AdministrativeConsultancyMenuOptionsState;
      case EntrypointOptions.SUBPREFEITRA:
        return PuMaintenanceDepartmentKindState;
    }
  },
};
