import { makeAutoObservable } from "mobx";
import agent from "../../api/agent";
import { Project } from "../models/project";

export default class ProjectStore {
  projects: Project[] = [];
  selectedProject: Project | null = null;
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
}
