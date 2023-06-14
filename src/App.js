import React from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Header from './components/Header';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <div>
      <h1>Hello, TrybeWallet!</h1>
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route
          path="/carteira"
          exact
          render={ () => (
            <>
              <Header />
              <Wallet />
            </>
          ) }
        />
      </Switch>
    </div>
  );
}

export default App;
