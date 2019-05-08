import { Item } from "../entities/item";



export class AddItem {
    static readonly type = '[Item] Add';

    constructor(public payload: Item) { }
}