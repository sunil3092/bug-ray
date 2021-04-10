import { Profile } from "./profile";

export interface Project {
  id: string;
  name: string;
  description: string;
  estimate: Date | null;
  isFavourate: boolean;
  hostUsername?: string;
  isCancelled?: boolean;
  contributors?: Profile[];
}
