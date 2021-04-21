import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../../api/agent";
import { Photo, Profile, UserProjects } from "../models/profile";
import { store } from "./store";

export default class ProfileStore {
  profile: Profile | null = null;
  loadingProfile = false;
  uploading = false;
  loading = false;
  trackings: Profile[] = [];
  loadingTrackings: boolean = false;
  activeTab: number = 0;
  userProjects: UserProjects[] = [];
  loadingProjects = false;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.activeTab,
      (activeTab) => {
        if (activeTab === 3 || activeTab === 4) {
          const predicate = activeTab === 3 ? "trackers" : "trackings";
          this.loadTrackings(predicate);
        } else {
          this.trackings = [];
        }
      }
    );
  }

  setActiveTab = (activeTab: any) => {
    this.activeTab = activeTab;
  };

  get isCurrentUser() {
    if (store.userStore.user && this.profile) {
      return store.userStore.user.username === this.profile.username;
    }

    return false;
  }

  loadProfile = async (username: string) => {
    this.loadingProfile = true;

    try {
      const profile = await agent.Profiles.get(username);
      runInAction(() => {
        this.profile = profile;
        this.loadingProfile = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingProfile = false;
      });
    }
  };

  uploadPhoto = async (file: Blob) => {
    this.uploading = true;
    try {
      const response = await agent.Profiles.uploadPhoto(file);
      const photo = response.data;
      runInAction(() => {
        if (this.profile) {
          this.profile.photos?.push(photo);
          if (photo.isMain && store.userStore.user) {
            store.userStore.setImage(photo.url);
            this.profile.image = photo.url;
          }
        }
        this.uploading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.uploading = false));
    }
  };

  setMainPhoto = async (photo: Photo) => {
    this.loading = true;
    try {
      await agent.Profiles.setMainPhoto(photo.id);
      store.userStore.setImage(photo.url);
      runInAction(() => {
        if (this.profile && this.profile.photos) {
          this.profile.photos.find((p) => p.isMain)!.isMain = false;
          this.profile.photos.find((p) => p.id === photo.id)!.isMain = true;
          this.profile.image = photo.url;
        }
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading = false));
    }
  };

  deletePhoto = async (photo: Photo) => {
    this.loading = true;
    try {
      await agent.Profiles.deletePhoto(photo.id);
      runInAction(() => {
        if (this.profile) {
          this.profile.photos = this.profile.photos?.filter(
            (p) => p.id !== photo.id
          );
        }
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading = false));
    }
  };

  updateProfile = async (profile: Partial<Profile>) => {
    this.loading = true;
    try {
      await agent.Profiles.updateProfile(profile);
      runInAction(() => {
        if (
          profile.displayName &&
          profile.displayName !== store.userStore.user?.displayName
        ) {
          store.userStore.setDisplayName(profile.displayName);
        }
        this.profile = { ...this.profile, ...(profile as Profile) };
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading = false));
    }
  };

  updateTracking = async (username: string, tracking: boolean) => {
    this.loading = true;
    try {
      await agent.Profiles.updateTracking(username);
      store.projectStore.updateContributorTracking(username);

      runInAction(() => {
        if (
          this.profile &&
          this.profile.username !== store.userStore.user?.username &&
          this.profile.username === username
        ) {
          tracking
            ? this.profile.trackingCount++
            : this.profile.trackingCount--;
          this.profile.tracking = !this.profile.tracking;
        }

        if (
          this.profile &&
          this.profile.username === store.userStore.user?.username
        ) {
          tracking ? this.profile.trackedCount++ : this.profile.trackedCount--;
        }

        this.trackings.forEach((profile) => {
          if (profile.username === username) {
            profile.tracking
              ? profile.trackingCount--
              : profile.trackingCount++;
            profile.tracking = !profile.tracking;
          }
        });

        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  loadTrackings = async (predicate: string) => {
    this.loadingTrackings = true;
    try {
      const trackings = await agent.Profiles.listTrackings(
        this.profile!.username,
        predicate
      );
      runInAction(() => {
        this.trackings = trackings;
        this.loadingTrackings = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingTrackings = false;
      });
    }
  };

  loadUserProjects = async (username: string, predicate?: string) => {
    this.loadingProjects = true;
    try {
      const activities = await agent.Profiles.listProjects(
        username,
        predicate!
      );
      runInAction(() => {
        this.userProjects = activities;
        this.loadingProjects = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingProjects = false;
      });
    }
  };
}
