import logo from './images/logo.jpg';
import data from './data.json'
import React from 'react';
import Products from './Components/Products';

//featur-1 changes
//convert function component to class componet
class App extends React.Component {
  constructor(){
    super(); //parent constructor
    this.state ={
      products: data.products,
      size:"",
      sort:""
    }
  }
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
            <Products Products={this.state.products}/>
          </div>
          <div className="sidebar">
            cart Items
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
