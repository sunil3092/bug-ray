import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/serverError";
import { store } from "./store";

export default class CommonStore {
  error: ServerError | null = null;
  token: string | null = window.localStorage.getItem("jwt");
  appLoaded = false;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.token,
      (token) => {
        if (token) {
          window.localStorage.setItem("jwt", token);
        } else {
          window.localStorage.removeItem("jwt");
        }
      }
    );
  }

  setServerError = (error: ServerError) => {
    this.error = error;
  };

  setToken = (token: string | null) => {
    this.token = token;
  };

  setAppLoaded = () => {
    // if (this.token) {
    //   var jwt = this.parseJwt(this.token);
    //   store.profileStore.loadProfile(jwt.unique_name);
    // }
    this.appLoaded = true;
  };

  parseJwt = (token: string) => {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  };
}
