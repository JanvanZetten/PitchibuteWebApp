import { Item } from 'src/app/entities/item';


export class AddItem {
    static readonly type = '[Item] Add';

    constructor(public payload: Item) { }
}

export class DeleteItem {
    static readonly type = '[Item] Delete'

    constructor(public itemId: number) { }
}

export class UpdateItem {
    static readonly type = '[Item] Update'

    constructor(public payload: Item) { }
}

export class FetchItems {
    static readonly type = '[Item] Fetch'
    constructor() { }
}

export class NavigateIntoItem {
    static readonly type = '[Item] NavigateInto'
    constructor(public payload: Item) { }
}

export class GoBack {
    static readonly type = '[Item] GoBack'
    constructor() { }
}