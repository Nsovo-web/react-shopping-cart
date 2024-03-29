import { FETCH_PRODUCTS, ORDER_PRODUCTS_BY_PRICE } from "../types";

import { FILTER_PRODUCTS_BY_SIZE } from "../types";

export const fetchProducts =()=> async(dispatch)=>{
   const res = await fetch('/api/products'); //res data contains the list of products
   const data = await res.json();
   dispatch({
       type: FETCH_PRODUCTS,
       payload:data
   })
}  //fetchProducts() function accepts no parameters because we are not going to filter the products

export const filterProducts = (products,size) =>(dispatch)=> {dispatch({
    type: FILTER_PRODUCTS_BY_SIZE, 
    payload:{
        size: size,
        items: size=== ""? products
        : products.filter(x=>x.availableSizes.indexOf(size)>=0), //conditional assignment
    }

})};

export const sortProducts = (filteredProducts,sort) =>(dispatch)=> {
    const sortedProducts = filteredProducts.slice();
    if (sort==="latest"){
        sortedProducts.sort((a,b)=>(a._id>b._id? 1:-1));
    }else{
        sortedProducts.sort((a,b)=>(
            sort === "lowest" ? a.price > b.price ? 1:-1 : 
            a.price > b.price ? -1:1
        ))
    }
    
    dispatch({
    
    type: ORDER_PRODUCTS_BY_PRICE, 
    payload:{
        sort: sort,
       items:sortedProducts,
    }

})};