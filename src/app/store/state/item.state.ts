import { Resource } from './../../entities/resource';
import { Group } from './../../entities/group';
import { Folder } from './../../entities/folder';
import { Event as EventEntitie } from './../../entities/event';
import { UpdateItem, FetchItems, NavigateIntoItem, GoBack } from './../actions/item.action';
import { Item, type } from "src/app/entities/item";
import { State, Selector, Action, StateContext, createSelector } from "@ngxs/store";
import { AddItem, DeleteItem } from "../actions/item.action";
import { ItemService } from 'src/app/shared/item/item.service';

export class ItemStateModel {
    itemTree: Item[];
    path: Item[];

    constructor() {
    }
    // If some inital state should be added then the NgxsOnInit can be used
}

@State<ItemStateModel>({
    name: 'items',
    defaults: {
        itemTree: [],
        path: []
    }
})

export class ItemState {

    @Selector()
    static getChildren(state: ItemStateModel) {
        var children = state.itemTree
        state.path.forEach(i => {
            const childToGo = children.find(c => c.id === i.id)
            if (childToGo.type === type.event) {
                children = (childToGo as EventEntitie).resources
            } else if (childToGo.type === type.folder) {
                children = (childToGo as Folder).resources
            } else if (childToGo.type === type.group) {
                children = (childToGo as Group).items
            } else {
                throw new Error("Unexpected error occured, item can't have items")
            }
        })
        return children
    }

    @Action(AddItem)
    add({ getState, patchState }: StateContext<ItemStateModel>, { payload }: AddItem) {
        const state = getState();
        //TODO call backend service 
        patchState({
            //itemTree: [...state.items, payload]
        });
    }

    @Action(DeleteItem)
    delete({ getState, patchState }: StateContext<ItemStateModel>, { payload }: DeleteItem) {
        const state = getState();
        //TODO call backend service
        patchState({
            //itemTree: state.items.filter(i => i.id !== payload.id)
        });
    }

    @Action(UpdateItem)
    update({ getState, patchState }: StateContext<ItemStateModel>, { payload }: UpdateItem) {
        const state = getState();
        //TODO call backend service
        patchState({
            //itemTree: state.items.map(i => i.id === payload.id ? payload : i)
        });
    }

    @Action(FetchItems)
    fetch({ patchState }: StateContext<ItemStateModel>, { }: FetchItems) {
        // Update the state bassed on the items on firestore via an item service
        patchState({
            //itemTree: [/*Here should the items from firestore */]
        });
    }

    @Action(NavigateIntoItem)
    navigateInto({ getState, patchState }: StateContext<ItemStateModel>, { payload }: NavigateIntoItem) {
        const state = getState();
        // TODO check if the item exists and check that it is a of a type that is valid to navigat into.
        // TODO if the cheks have passed then add item to the current path and load the children from firebase.
        const children = ItemService.getChildItems(state.path.concat(payload))

        patchState({

        });
    }

    @Action(GoBack)
    goBack({ getState, patchState }: StateContext<ItemStateModel>, { }: GoBack) {
        const state = getState();
        patchState({
            path: state.path.slice(0, state.path.length - 1) // -1 to remove the last item
        });
    }
}