import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import ProductPage from "./components/Product/ProductPage";
import Navigation from "./components/Home/Navigation";

function App() {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route path="/product" component={ProductPage} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
