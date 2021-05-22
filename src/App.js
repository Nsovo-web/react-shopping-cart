import logo from './images/logo.jpg';

import React from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import store from './store'
import { Provider } from 'react-redux';
import homeScreen from './screens/homeScreen';
import adminScreen from './screens/adminScreen';

//featur-1 changes
//convert function component to class componet
class App extends React.Component {
render(){
  
  return (
    <Provider store={store}>
    <>
    <BrowserRouter>
      <div className="grid-container"> 
          <header>
            <a href="/"><img alt={"logo"} src={logo} width="50px"/> Styles</a>
            <nav>
              <ul>
                <li>
                  <Link className="Link" to="/">Home</Link>
               </li>
                <li>
                 <Link className="Link" to="/Admin">Admin</Link>
               </li>
              </ul>
            </nav>
          </header>
          <main>
            <Route path="/" component={homeScreen} exact/>
            <Route path="/Admin" component={adminScreen} exact/>
          </main>
          <footer>All Rights Reserved</footer>
        </div>
    </BrowserRouter>
 
  </>
  </Provider>
);
}
}

export default App;
