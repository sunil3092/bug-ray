import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "..";
import { Project } from "../app/models/project";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response!;
    switch (status) {
      case 400:
        toast.error("Bad Request");
        break;
      case 401:
        toast.error("Unauthorised");
        break;
      case 404:
        history.push("/not-found");
        break;
      case 500:
        toast.error("Server Error");
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
  list: () => requests.get<Project[]>("/project"),
  details: (id: string) => requests.get<Project>(`/project/${id}`),
  create: (project: Project) => requests.post<void>("/project", project),
  update: (project: Project) =>
    requests.put<void>(`/project/${project.id}`, project),
  delete: (id: string) => requests.del<void>(`/project/${id}`),
};

const agent = {
  Projects,
};

export default agent;
