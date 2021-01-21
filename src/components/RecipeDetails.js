import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import outputPicture from "../outputPicture"; //import a js function that outputs picture

import M from "materialize-css";
import "materialize-css";
import { Button, Icon } from "react-materialize";

class RecipeDetails extends Component {
  state = {
    id: null,
    recipe: null,
  };
  componentDidMount() {
    M.AutoInit();

    var elems = document.querySelectorAll(".tooltipped");
    M.Tooltip.init(elems, { enterDelay: 0, exitDelay: 100 });

    let id = this.props.match.params.recipe_id;

    // console.log(id); //testing id

    axios
      .get("https://dh-recipesapi.herokuapp.com/detail/" + id)
      .then((res) => {
        // console.log(res); //testing response
        this.setState({ recipe: res.data, id: id });
      });
  }

  handleDelete = () => {
    let deleteID = this.state.recipe._id;
    // console.log(typeof deleteID); //testing

    let confirmDelete = window.confirm(
      "Are you sure you want to delete this recipe?"
    );

    if (confirmDelete) {
      axios
        .delete("https://dh-recipesapi.herokuapp.com/delete/" + deleteID)
        .then((result) => {
          this.props.history.push("/"); //redirect to home
        });
    }
  };

  formatDate = (inputDate) => {
    let newDate = new Date(inputDate);
    return newDate.toDateString();
  };

  render() {
    const recipe = this.state.recipe ? (
      <div className="carddetails container card-panel amber lighten-4 z-depth-4">
        <div className="row">
          {/* card image */}
          <div className="col m3 hide-on-small">
            <img
              alt="cardicon"
              className="card-icon center responsive-img"
              src={outputPicture(this.state.recipe.category)}
            ></img>
          </div>
          {/* recipe owner name */}
          <div className="col m9">
            <div className="row">
              <div className="col s8">
                <h5 className="red-text">
                  {this.state.recipe.name.toUpperCase()}
                </h5>
              </div>
              <div className="col s4">
                <Link to={"/edit/" + this.state.recipe._id}>
                  <Button
                    className="right"
                    node="button"
                    style={{
                      marginRight: "5px",
                      background: "orange",
                      direction: "right",
                    }}
                    waves="light"
                    tooltip="Edit recipe"
                  >
                    <Icon>edit</Icon>
                  </Button>
                </Link>
              </div>
            </div>
            <div className="row">
              <div className="col s8">
                <div>
                  <strong>by: </strong>
                  {this.state.recipe.owner.toUpperCase()}
                </div>
              </div>
              <div className="col s4">
                <Button
                  className="right"
                  node="button"
                  style={{
                    marginRight: "5px",
                    background: "red",
                    direction: "right",
                  }}
                  waves="light"
                  tooltip="Delete recipe"
                  onClick={this.handleDelete}
                >
                  <Icon>delete</Icon>
                </Button>
              </div>
            </div>
            {/* cook time and category */}
            <div className="row">
              <div className="col s12 m7">
                <div>
                  <strong>Cook Time: </strong>
                  {this.state.recipe.time.toUpperCase()} minutes
                </div>
              </div>
              <div className="col s12 m5">
                <div>
                  <strong>Category: </strong>
                  {this.state.recipe.category.toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <p>
            <strong>Ingredients:</strong> <br />{" "}
            {this.state.recipe.ingredients.toUpperCase()}
          </p>
        </div>
        <div className="row">
          <p>
            <strong>Directions:</strong> <br />{" "}
            {this.state.recipe.directions.toUpperCase()}
          </p>
        </div>
        <div className="row">
          <p>
            <strong>Created:</strong> <br />{" "}
            {this.formatDate(this.state.recipe.createdAt)}
          </p>
        </div>
      </div>
    ) : (
      <div className="center">Error, cannot fetch card data</div>
    );
    //after checking then return fetched data
    return <div className="container">{recipe}</div>;
  }
}

export default RecipeDetails;
