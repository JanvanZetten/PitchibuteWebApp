import { UpdateItem, FetchItems } from './../actions/item.action';
import { Item } from "src/app/entities/item";
import { State, Selector, Action, StateContext, createSelector } from "@ngxs/store";
import { AddItem, DeleteItem } from "../actions/item.action";

export class ItemStateModel {
    items: Item[];

    constructor() {
    }
    // If some inital state should be added then the NgxsOnInit can be used
}

@State<ItemStateModel>({
    name: 'items',
    defaults: {
        items: []
    }
})

export class ItemState {

    @Selector()
    static getItems(state: ItemStateModel) {
        return state.items;
    }

    static directChildren(parrentPath: Item) {
        return createSelector([ItemState], (state: Item[]) => {
            // TODO add some check here to only get the children maybe run the fetch state
            return state
        });
    }

    @Action(AddItem)
    add({ getState, patchState }: StateContext<ItemStateModel>, { payload }: AddItem) {
        const state = getState();
        //TODO call backend service 
        patchState({
            items: [...state.items, payload]
        });
    }

    @Action(DeleteItem)
    delete({ getState, patchState }: StateContext<ItemStateModel>, { payload }: DeleteItem) {
        const state = getState();
        //TODO call backend service
        patchState({
            items: state.items.filter(i => i.id !== payload.id)
        });
    }

    @Action(UpdateItem)
    update({ getState, patchState }: StateContext<ItemStateModel>, { payload }: UpdateItem) {
        const state = getState();
        //TODO call backend service
        patchState({
            items: state.items.map(i => i.id === payload.id ? payload : i)
        });
    }

    @Action(FetchItems)
    fetch({ patchState }: StateContext<ItemStateModel>, { }: FetchItems) {
        // Update the state bassed on the items on firestore via an item service
        patchState({
            items: [/*Here should the items from firestore */]
        });
    }


}