import { Item, type } from './../../entities/item';
import { NavigateIntoItem, GoBack, ResetPath } from './../actions/item.action';
import { State, Selector, Action, StateContext, NgxsOnInit } from "@ngxs/store";
import { ItemService } from 'src/app/shared/item/item.service';

export class ItemStateModel implements NgxsOnInit {
    itemTree: Item[];
    path: Item[];

    constructor(private itemService: ItemService) { }

    // Setting the initial outermost items in the tree
    ngxsOnInit(ctx?: StateContext<ItemStateModel>) {
        ctx.getState().path = []
        this.itemService.getChildItems([]).subscribe(items =>
            ctx.getState().itemTree = items)
    }
}

@State<ItemStateModel>({
    name: 'items'
})

export class ItemState {

    constructor(private itemService: ItemService) { }

    @Selector()
    static getChildren(state: ItemStateModel) {
        return ItemService.getChildrenFromPathAndTree(state.path, state.itemTree)
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
        });

        this.itemService.getChildItems(state.path.concat(itemToNavigate))
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
    ResetPath({ patchState }: StateContext<ItemStateModel>, { }: ResetPath) {
        patchState({
            path: []
        })
    }

    /*
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
                //itemTree: [/*Here should the items from firestore *//*]
});
}
*/
}