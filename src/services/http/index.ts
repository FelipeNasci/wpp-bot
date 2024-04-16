import axios, {  AxiosRequestConfig,
} from "axios";

interface HttpResponse<ModelData = any> {
  status: number;
  data: ModelData;
}

interface HttpParams extends AxiosRequestConfig {}
export class Http {
  private static instance: Http;
  private constructor() {}

  async get<ModelData = any>(
    url: string,
    params?: HttpParams
  ): Promise<HttpResponse<ModelData>> {
    return axios.get<ModelData>(url, params);
  }

  async post<ModelData = any>(
    url: string,
    data: ModelData,
    params?: HttpParams
  ): Promise<HttpResponse<ModelData>> {
    return axios.post<ModelData>(url, data, params);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Http();
    }
    return this.instance;
  }
}
