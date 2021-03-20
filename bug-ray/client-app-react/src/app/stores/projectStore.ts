import { makeAutoObservable, runInAction } from "mobx";
import agent from "../../api/agent";
import { Project } from "../models/project";

export default class ProjectStore {
  projectRegistry = new Map<string, Project>();
  selectedProject: Project | undefined = undefined;
  editMode = false;
  loading = false;
  lodaingInital = true;

  constructor() {
    makeAutoObservable(this);
  }

  get projectsByDate() {
    return Array.from(this.projectRegistry.values()).sort(
      (a, b) => Date.parse(a.estimate) - Date.parse(b.estimate)
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
        return project;
      } catch (error) {
        console.log(error);
        this.setLoadingInital(false);
      }
    }
  };

  //Helper Method
  private setProject = (project: Project) => {
    project.estimate = project.estimate.split("T")[0];
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
