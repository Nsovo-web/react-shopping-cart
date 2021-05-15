import { FETCH_PRODUCTS , ORDER_PRODUCTS_BY_PRICE, FILTER_PRODUCTS_BY_SIZE} from "../types";

export const productsReducer = (state={},action)=>{
    switch (action.type) {
        case FILTER_PRODUCTS_BY_SIZE: 
        return {
            ...state ,//merge the changes with the current state
            filteredItems: action.payload.items,
            size: action.payload.size,
        };
        case ORDER_PRODUCTS_BY_PRICE:
            return {...state, 
              sort: action.payload.sort,
              filteredItems: action.payload.items,
            }
        case FETCH_PRODUCTS: 
        return {items: action.payload,
         filteredItems:action.payload,
        } //when there are new items update them into the redux store
        default: return state
    }
}//(current state, Action). state is equal to empty json by default