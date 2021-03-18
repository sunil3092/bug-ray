import { makeAutoObservable, makeObservable, observable } from "mobx";

export default class ProjectStore {
  title = "Hrllo FromMobX";

  /**
   *
   */
  constructor() {
    makeAutoObservable(this);
  }
}
