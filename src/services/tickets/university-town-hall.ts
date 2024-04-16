import { Ticket } from "./interface";
import { ticket as ticketConfig } from "../../../config";
import { Http } from "../http";
import { LOCATION, ELocation } from "../../domain/menu-options/sign-up";
import FormData from "form-data";

export class UniversityTownHallTicket implements Ticket {
  private static instance: UniversityTownHallTicket;
  private constructor() {}

  async create(data: any) {
    const { url } = ticketConfig.universityTownHall;
    const form = prepareRequest(data);

    await Http.getInstance().post(url, form);
    
  }

  public static getInstance() {
    if (!this.instance) this.instance = new UniversityTownHallTicket();
    return this.instance;
  }
}

const getLocation = (locationUnit: string) => {
  const { options } = LOCATION;

  const rioTinto = options[ELocation.RTT];
  const mamanguape = options[ELocation.MME];

  return { [rioTinto]: "1", [mamanguape]: "3" }[locationUnit];
};
const prepareRequest = (data: any) => {
  const formData = new FormData();

  const location = getLocation(data.unidade);
  const subject = `Solicitação de manutenção em ${data.unidade} - ${data.maintenanceDepartment} - ${data.tipoServico}`;
  const priority = "low";

  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("priority", priority);
  formData.append("custom1", data.departmentRequester);
  formData.append("custom2", data.registerNumberRequester);
  formData.append("custom3", data.departmentPhone);
  formData.append("custom4", data.maintenanceDepartment);
  formData.append("custom5", data.maintenanceDepartment);
  formData.append("custom6", data.maintenanceDepartment);
  formData.append("custom7", data.tipoServico);
  formData.append("category", location);
  formData.append("message", data.descricao);
  formData.append("subject", subject);

  formData.append("hx", "3");
  formData.append("hy", "");

  return formData;
};
