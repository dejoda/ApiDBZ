import type { ipersonajes } from "./ipersonajes";

export interface iplaneta{
id: number,
  name: string,
  isDestroyed: boolean,
  description:string,
  image: string,
  deletedAt: string,
  characters:ipersonajes[];
}