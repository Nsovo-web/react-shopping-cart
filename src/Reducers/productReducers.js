import { FETCH_PRODUCTS } from "../types";

export const productsReducer = (state={},action)=>{
    switch (action.type) {
        case FETCH_PRODUCTS: return {items: action.payload} //when there are new items update them into the redux store
        default: return state
    }
}//(current state, Action). state is equal to empty json by default