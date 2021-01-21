import React from "react";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import AddRecipe from "./components/AddRecipe";
import RecipeDetails from "./components/RecipeDetails";
import RecipeEdit from "./components/RecipeEdit";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar></NavBar>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/addrecipe" component={AddRecipe}></Route>
          <Route path="/edit/:recipe_id" component={RecipeEdit}></Route>
          <Route path="/:recipe_id" component={RecipeDetails}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
