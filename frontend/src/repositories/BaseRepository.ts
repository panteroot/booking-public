import axios, { AxiosError, AxiosResponse } from "axios";

const CURRENT_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

type UserType = "ADMIN" | "USER";
type ErrorResponseData = {
  userType: UserType;
};

const LOGIN_PAGES: Record<UserType, string> = {
  ["ADMIN"]: "/admin/login",
  ["USER"]: "/login",
};

export const globalSettings = {
  bypassInterceptor: false,
};

// Add a response interceptor
API.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (globalSettings.bypassInterceptor) {
      // Reset the flag and return the error without further processing
      globalSettings.bypassInterceptor = false;
      return Promise.reject(error);
    }

    const { response } = error;

    const errorData = response?.data as ErrorResponseData;
    const userType: UserType = errorData.userType;

    if (error.response?.status === 401) {
      // Redirect based on user type
      const loginPage = LOGIN_PAGES[userType];
      // window.location.href = loginPage;
      // Avoid redirection loop or multiple redirects
      if (window.location.pathname !== loginPage) {
        window.location.replace(loginPage);
      }
    }

    return Promise.reject(error);
  }
);

export interface IBaseRepository<T> {
  get(id: any): Promise<T>;
  getRow(): Promise<T>;
  getMany(): Promise<T[]>;
  getPagination(): Promise<T>;
  post(item: T): Promise<T>;
  postWithFile(item: FormData): Promise<T>;
  logout(): Promise<any>;
  update(id: any, item: T): Promise<T>;
  updateWithFile(id: any, item: FormData): Promise<T>;
  delete(id: any): Promise<T>;
}

export class ApiResponse<T> {
  data?: T;
  succeeded?: boolean;
  errors: any;
}

const transform = <T>(response: AxiosResponse): Promise<T> => {
  const succeeded =
    response.status === 200 ||
    response.status === 201 ||
    response.status === 400 ||
    response.status === 401;

  return new Promise((resolve, reject) => {
    if (succeeded) {
      resolve(response.data);
    } else {
      reject(new Error(`Request failed with status ${response.status}`));
    }
  });
};

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  protected collection: string | undefined;
  protected endpoint: string | undefined;
  protected options: {
    withCredentials: boolean;
    headers?: { [key: string]: any };
    // headers?: { any: any };
  } = {
    withCredentials: false,
  };

  public async get(id: string) {
    const result = await API.get(
      `${CURRENT_BASE_URL}/${this.collection}/${id}`,
      this.options
    );

    const data = await transform<T>(result);
    return data;
  }

  public async getRow() {
    const result = await API.get(
      `${CURRENT_BASE_URL}/${this.collection}/${this.endpoint}`,
      this.options
    );

    const data = await transform<T>(result);
    return data;
  }

  public async getMany() {
    const result = await API.get(
      `${CURRENT_BASE_URL}/${this.collection}/${this.endpoint}`,
      this.options
    );

    const data = await transform<T[]>(result);
    return data;
  }

  public async getPagination() {
    const result = await API.get(
      `${CURRENT_BASE_URL}/${this.collection}/${this.endpoint}`,
      this.options
    );

    const data = await transform<T>(result);
    return data;
  }

  public async post(item: T) {
    const result = await API.post(
      `${CURRENT_BASE_URL}/${this.collection}/${this.endpoint}/`,
      item,
      this.options
    );

    const data = await transform<T>(result);
    return data;
  }

  public async postWithFile(item: FormData): Promise<T> {
    const result = await API.post(
      `${CURRENT_BASE_URL}/${this.collection}/${this.endpoint}/`,
      item,
      this.options
    );

    const data = await transform<T>(result);
    return data;
  }

  public async logout() {
    const result = await API.post(
      `${CURRENT_BASE_URL}/${this.collection}/${this.endpoint}/`,
      {},
      this.options
    );

    const data = await transform<T>(result);
    return data;
  }

  public async update(id: string, item: T): Promise<T> {
    const result = await API.put(
      `${CURRENT_BASE_URL}/${this.collection}/${id}`,
      item,
      this.options
    );

    const data = await transform<T>(result);
    return data;
  }

  public async updateWithFile(id: string, item: FormData): Promise<T> {
    const result = await API.patch(
      `${CURRENT_BASE_URL}/${this.collection}/${id}`,
      item,
      this.options
    );
    const data = await transform<T>(result);
    return data;
  }

  public async delete(id: any): Promise<T> {
    const result = await API.delete(
      `${CURRENT_BASE_URL}/${this.collection}/${id}`,
      this.options
    );

    const data = await transform<T>(result);
    return data;
  }
}
