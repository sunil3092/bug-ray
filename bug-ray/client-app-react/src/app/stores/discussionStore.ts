import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { makeAutoObservable, runInAction, values } from "mobx";
import { Discussion } from "../models/discussion";
import { store } from "./store";

export default class DiscussionStore {
  discssions: Discussion[] = [];
  hubConnection: HubConnection | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  createHubConnection = (projectId: string) => {
    if (store.projectStore.selectedProject) {
      this.hubConnection = new HubConnectionBuilder()
        .withUrl("http://localhost:5000/discuss?projectId=" + projectId, {
          accessTokenFactory: () => store.userStore.user?.token!,
        })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

      this.hubConnection
        .start()
        .catch((error) =>
          console.log("Error establising connection: " + error)
        );

      this.hubConnection.on("LoadDiscussions", (discussions: Discussion[]) => {
        runInAction(() => (this.discssions = discussions));
      });

      this.hubConnection.on("ReceiveDiscussion", (discussion: Discussion) => {
        runInAction(() => this.discssions.push(discussion));
      });
    }
  };

  stopHubConnection = () => {
    this.hubConnection
      ?.stop()
      .catch((error) => console.log("Problem Stopping Connection: " + error));
  };

  clearDiscussion = () => {
    this.discssions = [];
    this.stopHubConnection();
  };

  addDiscussion = async (values: any) => {
    values.projectId = store.projectStore.selectedProject!.id;
    try {
      await this.hubConnection!.invoke("SendDiscussion", values);
    } catch (error) {
      console.log(error);
    }
  };
}
