import { Link } from "react-router-dom";
import outputPicture from "../outputPicture"; //import a js function that outputs picture

const Recipes = ({ recipesList, recipeSearch }) => {
  const recipeList = recipesList.map((r) => {
    let displayImg = outputPicture(r.category);

    return (
      <div className="myRecipe" key={r._id}>
        <div className="col s12 m8 offset-m2 l6 offset-l3 hoverable">
          <div className="card horizontal amber lighten-4 z-depth-4">
            <div className="card-image">
              <img src={displayImg} alt="recipe-pic" className="activator" />
            </div>

            <div className="card-stacked">
              <div className="card-content">
                <h5 className="red-text">{r.name}</h5>
                <p>
                  <strong>By: </strong>
                  {r.owner}
                  <br />
                  <strong>Cook time: </strong>
                  {r.time} minutes
                </p>
              </div>
              <div className="card-action">
                <Link
                  to={"/" + r._id}
                  className="waves-effect waves-light btn orange right"
                >
                  <i className="material-icons right">keyboard_tab</i>
                  Detail
                </Link>
              </div>
            </div>

            {/* Reveal card detail */}
            <div className="card-reveal">
              <span className="card-title red-text">
                {r.name.toUpperCase()}
                <i className="material-icons right">close</i>
              </span>

              <p>
                <strong>Ingredients:</strong>
                <br />
                {r.ingredients.toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  });

  //handle search result
  let recipeSearchResult = null;

  if (recipeSearch !== null) {
    recipeSearchResult = recipeSearch.map((r) => {
      let displayImg = outputPicture(r.category);

      return (
        <div className="myRecipeSearch" key={r._id}>
          <div className="col s12 m8 offset-m2 l6 offset-l3 hoverable">
            <div className="card horizontal amber lighten-4 z-depth-4">
              <div className="card-image">
                <img src={displayImg} alt="recipe-pic" className="activator" />
              </div>

              <div className="card-stacked">
                <div className="card-content">
                  <h5 className="red-text">{r.name}</h5>
                  <p>
                    <strong>By: </strong>
                    {r.owner}
                    <br />
                    <strong>Cook time: </strong>
                    {r.time} minutes
                  </p>
                </div>
                <div className="card-action">
                  <Link
                    to={"/" + r._id}
                    className="waves-effect waves-light btn orange right"
                  >
                    <i className="material-icons right">keyboard_tab</i>
                    Detail
                  </Link>
                </div>
              </div>

              {/* Reveal card detail */}
              <div className="card-reveal">
                <span className="card-title red-text">
                  {r.name.toUpperCase()}
                  <i className="material-icons right">close</i>
                </span>

                <p>
                  <strong>Ingredients:</strong>
                  <br />
                  {r.ingredients.toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  if (recipeList) {
    if (recipeSearchResult) {
      return <div className="recipeList">{recipeSearchResult}</div>;
    } else {
      return <div className="recipeList">{recipeList}</div>;
    }
  } else {
    return (
      <div className="center">
        <p>Loading Recipes....</p>
      </div>
    );
  }
};

export default Recipes;
