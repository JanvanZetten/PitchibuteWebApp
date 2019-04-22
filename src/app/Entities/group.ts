import { Item } from "./item";

export interface Group extends Item {
    items: Item[]
    //owner: User
}