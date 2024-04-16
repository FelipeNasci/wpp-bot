import { State } from "../../interface";
import {
  EInternetAccessKind,
  INTERNET_ACCESS_KIND,
} from "../../../../domain/menu-options/gtic/internet";
import { SetupWifiState } from "./setup-wifi";
import { FailureInternetBlockState } from "./failure";

export const InternetAccessState: State = {
  menu: INTERNET_ACCESS_KIND,
  next: (choice: string): State => {
    switch (choice) {
      case EInternetAccessKind.SetupWifi:
        return SetupWifiState;

      case EInternetAccessKind.CableInternetFailure:
        return FailureInternetBlockState;

      case EInternetAccessKind.WifiInternetFailure:
        return FailureInternetBlockState;
    }
  },
};
