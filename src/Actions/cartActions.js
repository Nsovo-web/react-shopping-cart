import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";


export const addToCart = (product) =>(dispatch,getState) => {
    //make a clone of items 
    const cartItems = getState().cart.cartItems.slice();
    //check if product is in the cart
    let alreadyInCart = false;
    cartItems.forEach(x=>{
        if (x._id === product._id) {
            alreadyInCart = true;
            x.count++;
        }
    })
    //product is not in the cart. add product
    if (!alreadyInCart){
        cartItems.push({...product,count:1}) //we only add one item at the start. initialise count to 1

    }
    dispatch({
        type:ADD_TO_CART,
        payload: {cartItems},


    })

    localStorage.setItem('cartItems',JSON.stringify(cartItems))
}


export const removeFromCart = (product) =>(dispatch,getState)=>{
    const cartItems = getState().cart.cartItems.slice().filter(item =>item._id !== product._id)

    dispatch({
        type:REMOVE_FROM_CART,
        payload:{cartItems}
    })
    //update the localStorage
    localStorage.setItem('cartItems',JSON.stringify(cartItems))
}