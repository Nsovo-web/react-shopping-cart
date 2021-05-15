import logo from './images/logo.jpg';

import React from 'react';
import Products from './Components/Products';
import Filter from './Components/filter';
import Cart from './Components/Cart';
import store from './store'
import { Provider } from 'react-redux';

//featur-1 changes
//convert function component to class componet
class App extends React.Component {
  constructor(){
    super(); //parent constructor
    this.state ={
      
      cartItems: JSON.parse(localStorage.getItem("cartItems"))? JSON.parse(localStorage.getItem("cartItems")) :[], //parse() is the reversal of stringify()
                // lowest price, highest price, latest products
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


render(){
  
  return (
    <Provider store={store}>
    <>
    
  <div className="grid-container">
      
     <header>
       <a href="/"><img alt={"logo"} src={logo} width="50px"/> Styles</a>
     </header>
     <main>
        <div className="content" >
          <div className="products">
            <Filter 
            />
            <Products products={this.state.products} addToCart={this.addToCart}/>
          </div>
          <div className="sidebar">
             <Cart  cartItems={this.state.cartItems} removeItem={this.removeItem}/>
          </div>
          
        </div>
     </main>
     <footer>All Rights Reserved</footer>
  </div>
  </>
  </Provider>
);
}
}

export default App;
