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
            <Filter />
            <Products />
          </div>
          <div className="sidebar">
             <Cart />
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
