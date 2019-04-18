import { Resource } from "./resource";

export interface File extends Resource{
    url: string
    lastmodified?: Date 
    size: number
}