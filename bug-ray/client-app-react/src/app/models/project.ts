import { Profile } from "./profile";

export interface Project {
  id: string;
  name: string;
  description: string;
  estimate: Date | null;
  isFavourate: boolean;
  hostUsername: string;
  isCancelled: boolean;
  isContributing: boolean;
  isOwner: boolean;
  owner?: Profile;
  contributors: Profile[];
}

export class Project implements Project {
  constructor(init?: ProjectFormValues) {
    //Mapping init object with Project object
    Object.assign(this, init);
  }
}

export class ProjectFormValues {
  id?: string = undefined;
  name: string = "";
  description: string = "";
  estimate: Date | null = null;
  isFavourate: boolean = false;

  constructor(project?: ProjectFormValues) {
    if (project) {
      this.id = project.id;
      this.name = project.name;
      this.description = project.description;
      this.estimate = project.estimate;
      this.isFavourate = project.isFavourate;
    }
  }
}
