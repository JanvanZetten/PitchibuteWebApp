import { Item } from "./Item";

export interface Group extends Item {
    items: Item[]
    //owner: User
}