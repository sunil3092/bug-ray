import { makeAutoObservable, runInAction } from "mobx";
import agent from "../../api/agent";
import { Project } from "../models/project";
import { format } from "date-fns";
import { store } from "./store";

export default class ProjectStore {
  projectRegistry = new Map<string, Project>();
  selectedProject: Project | undefined = undefined;
  editMode = false;
  loading = false;
  lodaingInital = false;

  constructor() {
    makeAutoObservable(this);
  }

  get projectsByDate() {
    return Array.from(this.projectRegistry.values()).sort(
      (a, b) => a.estimate!.getTime() - b.estimate!.getTime()
    );
  }

  //Study Again
  get groupByEstimate() {
    return Object.entries(
      this.projectsByDate.reduce((projects, project) => {
        const date = format(project.estimate!, "dd MMM yyyy");
        projects[date] = projects[date]
          ? [...projects[date], project]
          : [project];
        return projects;
      }, {} as { [key: string]: Project[] })
    );
  }

  loadProjects = async () => {
    try {
      const projects = await agent.Projects.list();
      projects.forEach((project) => {
        this.setProject(project);
      });

      this.setLoadingInital(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInital(false);
    }
  };

  loadProject = async (id: string) => {
    let project = this.getProject(id);
    if (project) {
      this.selectedProject = project;
      return project;
    } else {
      this.lodaingInital = true;
      try {
        project = await agent.Projects.details(id);
        this.setProject(project);
        runInAction(() => {
          this.selectedProject = project;
        });
        this.setLoadingInital(false);
        console.log(this.lodaingInital);

        return project;
      } catch (error) {
        console.log(error);
        this.setLoadingInital(false);
        console.log(this.lodaingInital);
      }
    }
  };

  //Helper Method
  private setProject = (project: Project) => {
    const user = store.userStore.user;

    //Flag the is Contributing by using current user username to see if the user is contributing.
    if (user) {
      project.isContributing = project.contributors!.some(
        (p) => p.username == user.username
      );
      //Set if its the owner
      project.isOwner = project.hostUsername === user.username;
      project.owner = project.contributors?.find(
        (x) => x.username === project.hostUsername
      );
    }
    project.estimate = new Date(project.estimate!);
    this.projectRegistry.set(project.id, project);
  };

  //Helper Method
  private getProject = (id: string) => {
    return this.projectRegistry.get(id);
  };

  setLoadingInital = (state: boolean) => {
    this.lodaingInital = state;
  };

  createProject = async (project: Project) => {
    this.loading = true;
    try {
      await agent.Projects.create(project);
      runInAction(() => {
        this.projectRegistry.set(project.id, project);
        this.selectedProject = project;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateProject = async (project: Project) => {
    this.loading = true;
    try {
      await agent.Projects.update(project);
      runInAction(() => {
        this.projectRegistry.set(project.id, project);
        this.selectedProject = project;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteProject = async (id: string) => {
    this.loading = true;
    try {
      await agent.Projects.delete(id);
      runInAction(() => {
        this.projectRegistry.delete(id);
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
