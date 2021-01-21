import React, { Component } from "react";
import axios from "axios";
import qs from "qs";
// Import Materialize
import M from "materialize-css";

class AddRecipe extends Component {
  state = {
    id: null,
    category: null,
    name: null,
    time: null,
    ingredients: null,
    directions: null,
    owner: null,
  };

  componentDidMount() {
    // Auto initialize all the things!
    M.AutoInit();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });

    // console.log(this.state.category);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.category === null || this.state.category === "") {
      let noCategoryConfirm = window.confirm(
        "No specific category was selected, continue?"
      );
      if (noCategoryConfirm) {
        axios({
          method: "POST",
          url: "https://dh-recipesapi.herokuapp.com/new",
          data: qs.stringify({
            category: "other",
            name: this.state.name.toUpperCase(),
            time: this.state.time.toUpperCase(),
            ingredients: this.state.ingredients,
            directions: this.state.directions,
            owner: this.state.owner.toUpperCase(),
          }),
          headers: {
            "content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }).then((result) => {
          // console.log(result.data); //log info for testing

          //if server returns no duplicate attempt
          if (result.data.addRecipeResult.toUpperCase() === "YES") {
            alert("Recipe Added"); //pop up alert
            e.target.reset(); //reset all inputs
            this.props.history.push("/"); //redirect to home
          }
          //if server returns already existing card
          else {
            alert(result.data.addRecipeResult); //pop up alert
          }
        });
      }
    } else {
      axios({
        method: "POST",
        url: "https://dh-recipesapi.herokuapp.com/new",
        data: qs.stringify({
          category: this.state.category.toUpperCase(),
          name: this.state.name.toUpperCase(),
          time: this.state.time.toUpperCase(),
          ingredients: this.state.ingredients,
          directions: this.state.directions,
          owner: this.state.owner.toUpperCase(),
        }),
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }).then((result) => {
        // console.log(result.data); //log info for testing

        //if server returns no duplicate attempt
        if (result.data.addRecipeResult.toUpperCase() === "YES") {
          alert("Recipe Added"); //pop up alert
          e.target.reset(); //reset all inputs
          this.props.history.push("/"); //redirect to home
        }
        //if server returns already existing card
        else {
          alert(result.data.addRecipeResult); //pop up alert
        }
      });
    }
  };

  render() {
    return (
      <div className="AddRecipe container amber lighten-4 z-depth-5">
        <h4 className="center red-text text-accent-4">New Recipe</h4>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-field col m8 s12">
              <i className="material-icons prefix">restaurant</i>
              <label htmlFor="name">Recipe Name:</label>
              <input
                type="text"
                id="name"
                className="validate"
                required
                onChange={this.handleChange}
              />
            </div>
            <div className="input-field col m4 s12">
              <i className="material-icons prefix">assignment</i>
              <select
                id="category"
                onChange={this.handleChange}
                defaultValue="other"
              >
                <option value="other" disabled>
                  Choose your category
                </option>
                <option value="beef">Beef</option>
                <option value="chicken">Chicken</option>
                <option value="pork">Pork</option>
                <option value="salad">Salad</option>
                <option value="seafood">Seafood</option>
                <option value="soup">Soup</option>
                <option value="other">Other</option>
              </select>
              <label htmlFor="category">Category</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col m8 s12">
              <i className="material-icons prefix">person</i>
              <label htmlFor="owner">Owner Name:</label>
              <input
                type="text"
                id="owner"
                className="validate"
                required
                onChange={this.handleChange}
              />
            </div>
            <div className="input-field col m4 s12">
              <i className="material-icons prefix">access_time</i>
              <label htmlFor="time">Time (in minutes):</label>
              <input
                type="number"
                id="time"
                className="validate"
                required
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">storage</i>
              <label htmlFor="ingredients">Ingredients:</label>
              <textarea
                id="ingredients"
                className="materialize-textarea validate"
                required
                onChange={this.handleChange}
              ></textarea>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">pie_chart</i>
              <label htmlFor="directions">Directions:</label>
              <textarea
                id="directions"
                className="materialize-textarea validate"
                required
                onChange={this.handleChange}
                row="3"
              ></textarea>
            </div>
          </div>

          <button
            className="btn right waves-effect waves-light orange"
            type="submit"
            name="action"
          >
            Add Recipe
            <i className="material-icons right">add</i>
          </button>
        </form>
      </div>
    );
  }
}

export default AddRecipe;
