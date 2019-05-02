import { Resource } from "./resource";

export interface Folder extends Resource {
    resources: Resource[]
}