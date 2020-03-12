import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

//https://burger-builder-369b1.firebaseio.com/  firebase api for project
class App extends Component {
  render(){
    return(
      <div>
        <Layout>
          <h1>My Burger <span role="img" aria-label="Delicious">&#128523;</span><span role="img" aria-label="Love">&#128525;</span></h1>
          <BurgerBuilder />
        </Layout>
      </div>
    )
  }
}
export default App;
