import type { iplaneta } from "./iplaneta";
import type { itransformacion } from "./itransformacion";

export interface iguerreros {
  id: number;
  name: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: string;
  description: string;
  image: string;
  affiliation: string;
  deletedAt: string;
  originPlanet: iplaneta;
  transformations: itransformacion[];
}
