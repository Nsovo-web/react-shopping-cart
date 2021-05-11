import logo from './images/logo.jpg';
import data from './data.json'
import React from 'react';
import Products from './Components/Products';
import Filter from './Components/filter';
import Cart from './Components/Cart';

//featur-1 changes
//convert function component to class componet
class App extends React.Component {
  constructor(){
    super(); //parent constructor
    this.state ={
      products: data.products,
      cartItems: JSON.parse(localStorage.getItem("cartItems"))? JSON.parse(localStorage.getItem("cartItems")) :[], //parse() is the reversal of stringify()
      size:"",               //dress size
      sort:""               // lowest price, highest price, latest products
    }

  

  }
  saveOrder(order) {
    alert("Save"+order.name)
  }
  removeItem =(product) =>{ //accepts the product we are going to remove
   const cartItems = this.state.cartItems.slice();
   this.setState({cartItems:cartItems.filter(x=>x._id !== product._id)})
   localStorage.setItem("cartItems",JSON.stringify(cartItems.filter(x=>x._id !== product._id)));
  }
  
  addToCart =(product)=>{
   
    const cartItems = this.state.cartItems.slice();  //created a clone of the cartItem
    
    let alreadyInCart=false;
    cartItems.forEach(item=>{
      if(item._id === product._id){
        item.count++;
        alreadyInCart = true;
      }
    
    })
      if(!alreadyInCart){
        cartItems.push({...product, count:1})  // add count as a new item into cartItems. `(...) spread operator used to unpack array elements
        
      }
   
    
    this.setState({cartItems:cartItems})
    //console.log(cartItems)
    localStorage.setItem("cartItems",JSON.stringify(cartItems));
    
  }

  sortProducts =(event)=>{  
    const sort = event.target.value;                   //function to sort our products
    this.setState(state=>({
      sort:sort,
      products:(this.state.products.slice()).sort((a,b)=>(
        sort === "lowest"?
        ((a.price > b.price)? 1:-1):
        sort === "highest"?
        ((a.price < b.price)? 1:-1):
        ((a._id > b._id)? 1:-1)
      )),
    }))
  };

  filterProducts = (event)=>{ //function to filter our products *method function
 
    if(event.target.value === ""){
     this.setState({
       size:event.target.value,
       Products: data.products
     })
    }else{
     this.setState({
       size: event.target.value,
       products: data.products.filter(product =>
       product.availableSizes.indexOf(event.target.value)>=0
       )
     })  
    }
             //setState is a react component class method
    if(event.target.value === "All"){
      this.setState({
        size: event.target.value,
        products: data.products
        
      }) 
    }
   };
render(){
  
  return (
    <>
    
  <div className="grid-container">
      
     <header>
       <a href="/"><img alt={"logo"} src={logo} width="50px"/> Styles</a>
     </header>
     <main>
        <div className="content" >
          <div className="products">
            <Filter count={this.state.products.length} size={this.state.size} sort={this.state.sort} 
            filterProducts={this.filterProducts} sortProducts={this.sortProducts}/>
            <Products Products={this.state.products} addToCart={this.addToCart}/>
          </div>
          <div className="sidebar">
             <Cart saveOrder={this.saveOrder} cartItems={this.state.cartItems} removeItem={this.removeItem}/>
          </div>
          
        </div>
     </main>
     <footer>All Rights Reserved</footer>
  </div>
  </>
);
}
}

export default App;
