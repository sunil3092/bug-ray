import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../../api/agent";
import { Project, ProjectFormValues } from "../models/project";
import { format } from "date-fns";
import { store } from "./store";
import { Profile } from "../models/profile";
import { Pagination, PaginationPrams } from "../models/pagination";

export default class ProjectStore {
  projectRegistry = new Map<string, Project>();
  selectedProject: Project | undefined = undefined;
  editMode = false;
  loading = false;
  lodaingInital = false;
  pagination: Pagination | null = null;
  pagingParams = new PaginationPrams();
  predicate = new Map().set("all", true);

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.predicate.keys(),
      () => {
        this.pagingParams = new PaginationPrams();
        this.projectRegistry.clear();
        this.loadProjects();
      }
    );
  }

  setPagingParams = (pagingParams: PaginationPrams) => {
    this.pagingParams = pagingParams;
  };

  setPredicate = (predicate: string, value: string | Date) => {
    const resetPredicate = () =>
      this.predicate.forEach((value, key) => {
        //Remove this for Date freedom
        //if (key !== "estimate")
        this.predicate.delete(key);
      });
    switch (predicate) {
      case "all":
        resetPredicate();
        this.predicate.set("all", true);
        break;
      case "isOwner":
        resetPredicate();
        this.predicate.set("isOwner", true);
        break;
      case "isContributing":
        resetPredicate();
        this.predicate.set("isContributing", true);
        break;
      case "estimate":
        resetPredicate();
        this.predicate.delete("estimate");
        this.predicate.set("estimate", value);
        break;
    }
  };

  get axiosParams() {
    const params = new URLSearchParams();
    params.append("pageNumber", this.pagingParams.pageNumber.toString());
    params.append("pageSize", this.pagingParams.pageSize.toString());
    this.predicate.forEach((value, key) => {
      if (key === "estimate") {
        params.append(key, (value as Date).toISOString());
      } else {
        params.append(key, value);
      }
    });
    return params;
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
    this.setLoadingInital(true);
    try {
      const result = await agent.Projects.list(this.axiosParams);
      result.data.forEach((project) => {
        this.setProject(project);
      });
      runInAction(() => {
        this.setPagination(result.pagination);
        this.setLoadingInital(false);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setLoadingInital(false);
      });
    }
  };

  setPagination = (pagination: Pagination) => {
    this.pagination = pagination;
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
    const user = store.userStore.user;

    //Flag the is Contributing by using current user username to see if the user is contributing.
    if (user) {
      project.isContributing = project.contributors!.some(
        (p) => p.username === user.username
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

  createProject = async (project: ProjectFormValues) => {
    const user = store.userStore.user;
    const contributor = new Profile(user!);
    try {
      await agent.Projects.create(project);
      const newProject = new Project(project);
      newProject.hostUsername = user!.username;
      newProject.contributors = [contributor];
      this.setProject(newProject);
      runInAction(() => {
        this.selectedProject = newProject;
      });
    } catch (error) {
      console.log(error);
    }
  };

  updateProject = async (project: ProjectFormValues) => {
    try {
      await agent.Projects.update(project);
      runInAction(() => {
        if (project.id) {
          let updatedProject = { ...this.getProject(project.id), ...project };
          this.projectRegistry.set(project.id, updatedProject as Project);
          this.selectedProject = updatedProject as Project;
        }
      });
    } catch (error) {
      console.log(error);
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

  updateContribution = async () => {
    const user = store.userStore.user;
    this.loading = true;
    try {
      await agent.Projects.contribute(this.selectedProject!.id);
      runInAction(() => {
        if (this.selectedProject?.isContributing) {
          this.selectedProject.contributors = this.selectedProject.contributors?.filter(
            (a) => a.username !== user?.username
          );
          this.selectedProject.isContributing = false;
        } else {
          const contributor = new Profile(user!);
          this.selectedProject?.contributors?.push(contributor);
          this.selectedProject!.isContributing = true;
        }

        this.projectRegistry.set(
          this.selectedProject!.id,
          this.selectedProject!
        );
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  cancelProjectToggle = async () => {
    this.loading = true;
    try {
      await agent.Projects.contribute(this.selectedProject!.id);
      runInAction(() => {
        this.selectedProject!.isCancelled = !this.selectedProject?.isCancelled;
        this.projectRegistry.set(
          this.selectedProject!.id,
          this.selectedProject!
        );
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  clearSelectedProject = () => {
    this.selectedProject = undefined;
  };

  updateContributorTracking = (username: string) => {
    this.projectRegistry.forEach((project) => {
      project.contributors.forEach((contributor) => {
        if (contributor.username === username) {
          contributor.tracking
            ? contributor.trackingCount--
            : contributor.trackingCount++;
          contributor.tracking = !contributor.tracking;
        }
      });
    });
  };
}
