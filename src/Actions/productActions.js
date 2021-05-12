import { FETCH_PRODUCTS } from "../types";

export const fetchProducts =()=> async(dispatch)=>{
   const res = await fetch('/api/products'); //res data contains the list of products
   const data = await res.json();
   dispatch({
       type: FETCH_PRODUCTS,
       payload:data
   })
}  //fetchProducts() function accepts no parameters because we are not going to filter the products