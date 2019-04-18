import { Item } from "./Item";
import { Resource } from "./resource";

export interface Event extends Item {
    start: Date
    end: Date
    resources: Resource[]
}