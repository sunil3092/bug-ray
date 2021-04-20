import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "..";
import { PaginatedResult } from "../app/models/pagination";
import { Photo, Profile } from "../app/models/profile";
import { Project, ProjectFormValues } from "../app/models/project";
import { User, userFormValues } from "../app/models/user";
import { store } from "../app/stores/store";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    const pagination = response.headers["pagination"];
    if (pagination) {
      response.data = new PaginatedResult(response.data, pagination);
      return response as AxiosResponse<PaginatedResult<any>>;
    }
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response!;
    switch (status) {
      case 400:
        if (typeof data === "string") {
          toast.error(data);
        }

        if (config.method === "get" && data.errors.hasOwnProperty("Id")) {
          history.push("/not-found");
        }

        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        }
        break;
      case 401:
        toast.error("Unauthorised");
        break;
      case 404:
        history.push("/not-found");
        break;
      case 500:
        store.commonStore.setServerError(data);
        history.push("server-error");
        break;
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Projects = {
  list: () => requests.get<PaginatedResult<Project[]>>("/project"),
  details: (id: string) => requests.get<Project>(`/project/${id}`),
  create: (project: ProjectFormValues) =>
    requests.post<void>("/project", project),
  update: (project: ProjectFormValues) =>
    requests.put<void>(`/project/${project.id}`, project),
  delete: (id: string) => requests.del<void>(`/project/${id}`),
  contribute: (id: string) =>
    requests.post<void>(`/project/${id}/contribute`, {}),
};

const Account = {
  current: () => requests.get<User>("/account"),
  login: (user: userFormValues) => requests.post<User>("/account/login", user),
  register: (user: userFormValues) =>
    requests.post<User>("/account/register", user),
};

const Profiles = {
  get: (username: string) => requests.get<Profile>(`/profiles/${username}`),
  uploadPhoto: (file: Blob) => {
    let formData = new FormData();
    formData.append("File", file);
    return axios.post<Photo>("photos", formData, {
      headers: { "Content-type": "multipart/form-data" },
    });
  },
  setMainPhoto: (id: string) => requests.post(`/photos/${id}/setMain`, {}),
  deletePhoto: (id: string) => requests.del(`/photos/${id}`),
  updateProfile: (profile: Partial<Profile>) =>
    requests.put(`/profiles`, profile),
  updateTracking: (username: string) =>
    requests.post(`/tracking/${username}`, {}),
  listTrackings: (username: string, predicate: string) =>
    requests.get<Profile[]>(`/tracking/${username}?predicate=${predicate}`),
};

const agent = {
  Projects,
  Account,
  Profiles,
};

export default agent;
