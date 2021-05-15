import {createStore, applyMiddleware,compose,combineReducers} from "redux"
import thunk from "redux-thunk"
import { orderReducer } from "./Reducers/orderReducers";
import {productsReducer} from './Reducers/productReducers' //{} is for named exports, not default exports

const initialState ={};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers({  //createstore(), first argument is the reducers
    //we only have one reducer
    products: productsReducer,
    order: orderReducer
}),//second parametermis initial state
   initialState ,
   //the last parametes is middlewares
   //using redux thunk to handle request actions
   //use compose function to compose al midddlewares together
    composeEnhancer(applyMiddleware(thunk))

)

export default store;