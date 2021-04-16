import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import DiscussionStore from "./discussionStore";
import ModalStore from "./modalStore";
import ProfileStore from "./profileStore";
import ProjectStore from "./projectStore";
import UserStore from "./userStore";

interface Store {
  projectStore: ProjectStore;
  commonStore: CommonStore;
  userStore: UserStore;
  modalStore: ModalStore;
  profileStore: ProfileStore;
  discussionStore: DiscussionStore;
}

export const store: Store = {
  projectStore: new ProjectStore(),
  commonStore: new CommonStore(),
  userStore: new UserStore(),
  modalStore: new ModalStore(),
  profileStore: new ProfileStore(),
  discussionStore: new DiscussionStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
