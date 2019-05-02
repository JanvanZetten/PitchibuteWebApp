import { Resource } from "./resource";

export interface IFile extends Resource{
    url: string,
    lastModified?: Date,
    size: number,
}
