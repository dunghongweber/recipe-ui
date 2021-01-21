import React, { Component } from "react";
import Recipes from "./Recipes";
import SearchBar from "./SearchBar";
import axios from "axios";

class Home extends Component {
  //store data of all recipes from API
  state = {
    recipes: [],
    searchResult: null,
    loading: true,
  };
  componentDidMount() {
    axios.get("https://dh-recipesapi.herokuapp.com/all").then((res) => {
      // console.log(res); //testing response

      this.setState({
        recipes: res.data,
        loading: false,
      });
    });
  }

  handleSearch = (e) => {
    //using search bar to filter a search result set
    let searchResult = this.state.recipes.filter((r) => {
      return r.name.includes(e.target.value.toUpperCase());
    });

    //update the search result set
    this.setState({
      searchResult: searchResult,
    });
  };

  render() {
    //Handle error when cannot connect database
    const recipesData = this.state.recipes ? (
      <Recipes
        recipesList={this.state.recipes}
        recipeSearch={this.state.searchResult}
      ></Recipes>
    ) : (
      <div>
        <h5 className="center">Error, cannot fetch data</h5>
      </div>
    );

    //display data and preloader if needed
    return (
      <div className="Home container row">
        {this.state.loading ? (
          <div>
            <h5 className="center">Loading...</h5>
            <div className="progress">
              <div className="indeterminate"></div>
            </div>
          </div>
        ) : (
          <div>
            <SearchBar handleSearch={this.handleSearch}></SearchBar>
            <div className="row">{recipesData}</div>
          </div>
        )}
      </div>
    );
  }
}
export default Home;
