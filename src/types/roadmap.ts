import { VentureTask } from "./ventures";

export interface RoadmapResponse {
  stage: string;
  objective?: string;
  tasks: VentureTask[];
}