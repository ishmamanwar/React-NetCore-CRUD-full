import logo from './logo.svg';
import './App.css';

import {Home} from './Home';
import {Category} from './Category';
import {Product} from './Product';
import {Navigation} from './Navigation';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <h3 className="m-3 d-flex justify-content-center">
        React .Net Core CRUD
      </h3>
    
    <Navigation/>

    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/category" component={Category} exact />
      <Route path="/product" component={Product} exact />
    </Switch>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
