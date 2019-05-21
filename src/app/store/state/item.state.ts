import { Item, type } from './../../entities/item';
import { NavigateIntoItem, GoBack, ResetPath, FetchItems, AddItem } from './../actions/item.action';
import { State, Selector, Action, StateContext, NgxsOnInit } from "@ngxs/store";
import { ItemService } from 'src/app/shared/item/item.service';

export class ItemStateModel {
    itemTree: Item[];
    path: Item[];
}

@State<ItemStateModel>({
    name: 'items'
})

export class ItemState implements NgxsOnInit {

    constructor(private itemService: ItemService) { }

    // Setting the initial outermost items in the tree
    ngxsOnInit(ctx?: StateContext<ItemStateModel>) {
        ctx.getState().path = []
        this.itemService.getChildItems([]).subscribe(items =>
            ctx.getState().itemTree = items)
    }

    @Selector()
    static getChildren(state: ItemStateModel) {
        return ItemService.getChildrenFromPathAndTree(state.path, state.itemTree)
    }

    @Selector()
    static getPath(state: ItemStateModel) {
        return state.path
    }

    @Action(NavigateIntoItem)
    navigateInto({ getState, patchState }: StateContext<ItemStateModel>, { payload }: NavigateIntoItem) {
        const state = getState();
        const itemToNavigate = ItemService
            .getChildrenFromPathAndTree(state.path, state.itemTree)
            .find(i => i.id === payload.id)

        if (itemToNavigate.type === type.file || itemToNavigate.type === type.link) {
            throw new Error("Can't navigate into files or links")
        }

        const newPath = [...state.path, itemToNavigate]

        patchState({
            path: newPath
        })

        this.itemService.getChildItems(newPath)
            .subscribe(children => {
                const UpdatedTree = ItemService.updateTree(state.itemTree, newPath, children)
                patchState({
                    itemTree: UpdatedTree
                });
            })
    }

    @Action(GoBack)
    goBack({ getState, patchState }: StateContext<ItemStateModel>, { }: GoBack) {
        const state = getState();
        patchState({
            path: state.path.slice(0, state.path.length - 1) // -1 to remove the last item
        });
    }

    @Action(ResetPath)
    resetPath({ patchState }: StateContext<ItemStateModel>, { }: ResetPath) {
        patchState({
            path: []
        })
    }

    @Action(FetchItems)
    fetchItems({ getState, patchState }: StateContext<ItemStateModel>, { }: FetchItems) {
        const state = getState();
        this.itemService.getChildItems(state.path)
            .subscribe(children => {
                const UpdatedTree = ItemService.updateTree(state.itemTree, state.path, children)
                patchState({
                    itemTree: UpdatedTree
                });
            })
    }

    @Action(AddItem)
    async AddItem({ getState, patchState }: StateContext<ItemStateModel>, { payload }: AddItem) {
        const state = getState()
        const children = ItemService.getChildrenFromPathAndTree(state.path, state.itemTree);
        const id = await this.itemService.AddItem(state.path, payload)
        payload.id = id;
        children.push(payload)
        const UpdatedTree = ItemService.updateTree(state.itemTree, state.path, children)
        patchState({
            itemTree: UpdatedTree
        });
    }
}