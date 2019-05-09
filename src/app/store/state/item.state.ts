import { UpdateItem, FetchItems, NavigateIntoItem, GoBack } from './../actions/item.action';
import { Item } from "src/app/entities/item";
import { State, Selector, Action, StateContext, createSelector } from "@ngxs/store";
import { AddItem, DeleteItem } from "../actions/item.action";

export class ItemStateModel {
    items: Item[];
    path: Item[];

    constructor() {
    }
    // If some inital state should be added then the NgxsOnInit can be used
}

@State<ItemStateModel>({
    name: 'items',
    defaults: {
        items: [],
        path: []
    }
})

export class ItemState {

    @Selector()
    static getItems(state: ItemStateModel) {
        return state.items;
    }

    // TODO GetChildren

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

    @Action(NavigateIntoItem)
    navigateInto({ getState, patchState }: StateContext<ItemStateModel>, { payload }: NavigateIntoItem) {
        const state = getState();

        patchState({
            // TODO check if the item exists and check that it is a of a type that is valid to navigat into.
            // TODO if the cheks have passed then add item to the current path and load the children from firebase.
            
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