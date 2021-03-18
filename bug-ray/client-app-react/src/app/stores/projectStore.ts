import { makeAutoObservable, runInAction } from "mobx";
import agent from "../../api/agent";
import { Project } from "../models/project";
import { v4 as uuid } from "uuid";

export default class ProjectStore {
  projects: Project[] = [];
  selectedProject: Project | undefined = undefined;
  editMode = false;
  loading = false;
  lodaingInital = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadProjects = async () => {
    this.setLoadingInital(true);

    try {
      const projects = await agent.Projects.list();
      projects.forEach((project) => {
        project.estimate = project.estimate.split("T")[0];
        this.projects.push(project);
      });

      this.setLoadingInital(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInital(false);
    }
  };

  setLoadingInital = (state: boolean) => {
    this.lodaingInital = state;
  };

  selectProject = (id: string) => {
    this.selectedProject = this.projects.find((p) => p.id === id);
  };

  cancelSelectedProject = () => {
    this.selectedProject = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectProject(id) : this.cancelSelectedProject();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  createProject = async (project: Project) => {
    this.loading = true;
    project.id = uuid();
    try {
      await agent.Projects.create(project);
      runInAction(() => {
        this.projects.push(project);
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
        this.projects = [
          ...this.projects.filter((p) => p.id !== project.id),
          project,
        ];
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
        this.projects = [...this.projects.filter((p) => p.id !== id)];
        if (this.selectedProject?.id === id) {
          this.cancelSelectedProject();
        }
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
