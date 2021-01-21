import React, { Component } from "react";
import axios from "axios";
import qs from "qs";
import outputPicture from "../outputPicture";
import M from "materialize-css";

class RecipeEdit extends Component {
  state = {
    id: null,
    time: null,
    ingredients: null,
    directions: null,
    recipe: null,
  };

  componentDidMount() {
    let id = this.props.match.params.recipe_id;

    M.AutoInit();
    M.updateTextFields();

    // console.log(id); //testing id

    axios
      .get("https://dh-recipesapi.herokuapp.com/detail/" + id)
      .then((res) => {
        // console.log(res); //testing response

        this.setState({
          recipe: res.data,
          id: id,
          time: res.data.time,
          ingredients: res.data.ingredients,
          directions: res.data.directions,
        });
      });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state); //testing

    let updateID = this.state.recipe._id;
    // console.log(updateID); //testing

    axios({
      method: "PUT",
      url: "https://dh-recipesapi.herokuapp.com/edit/" + updateID,
      data: qs.stringify({
        time: this.state.time.toUpperCase(),
        ingredients: this.state.ingredients.toUpperCase(),
        directions: this.state.directions.toUpperCase(),
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    }).then((result) => {
      e.target.reset();
      alert("Recipe Updated");

      this.props.history.push("/" + updateID); //redirect to home
    });
  };

  render() {
    const dataLoaded = this.state.recipe ? (
      <div>
        <h4 className="center red-text text-accent-4">Edit Recipe</h4>

        <form
          onSubmit={this.handleSubmit}
          className="EditRecipe amber lighten-4 z-depth-5"
        >
          <div className="row">
            <div className="col s12">
              <img
                alt="cardicon"
                className="card-icon center responsive-img"
                src={outputPicture(this.state.recipe.category)}
              ></img>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12 m8">
              <i className="material-icons prefix">restaurant</i>
              <input
                disabled
                type="text"
                id="name"
                className="validate"
                value={this.state.recipe.name.toUpperCase()}
              />
            </div>
            <div className="input-field col s12 m4">
              <i className="material-icons prefix">person</i>
              <input
                disabled
                type="text"
                id="owner"
                className="validate"
                value={this.state.recipe.owner.toUpperCase()}
              />
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">access_time</i>
              <input
                type="number"
                id="time"
                className="validate"
                placeholder={this.state.recipe.time.toUpperCase()}
                required
                onChange={this.handleChange}
                defaultValue={this.state.recipe.time.toUpperCase()}
              />
              <label htmlFor="time" className="active">
                Cook time (in minutes):
              </label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">storage</i>

              <textarea
                id="ingredients"
                className="materialize-textarea validate"
                placeholder={this.state.recipe.ingredients.toUpperCase()}
                defaultValue={this.state.recipe.ingredients.toUpperCase()}
                required
                onChange={this.handleChange}
              ></textarea>
              <label htmlFor="ingredients" className="active">
                Ingredients:
              </label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">pie_chart</i>

              <textarea
                id="directions"
                className="materialize-textarea validate"
                defaultValue={this.state.recipe.directions.toUpperCase()}
                placeholder={this.state.recipe.directions.toUpperCase()}
                required
                onChange={this.handleChange}
              ></textarea>
              <label htmlFor="directions" className="active">
                Directions:
              </label>
            </div>
          </div>

          <button
            className="btn waves-effect waves-light orange right"
            type="submit"
            name="action"
          >
            Update Recipe
            <i className="material-icons right">sync</i>
          </button>
        </form>
      </div>
    ) : (
      <div className="center">Error, cannot fetch recipe data</div>
    );
    return <div className="EditRecipe container">{dataLoaded}</div>;
  }
}

export default RecipeEdit;
