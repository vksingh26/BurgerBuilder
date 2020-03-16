import React, { Component } from 'react';
import { Route, Switch } from 'react-router';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';


//https://burger-builder-369b1.firebaseio.com/  firebase api for project
class App extends Component {
  render(){
    return(
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout}></Route>
            <Route path="/orders" component={Orders}></Route>
            <Route path="/" exact component={BurgerBuilder}></Route>
          </Switch>
        </Layout>
      </div>
    )
  }
}
export default App;
