import BeefPic from "./pics/beef.jpg";
import ChickenPic from "./pics/chicken.jpg";
import FoodPic from "./pics/food.jpg";
import SaladPic from "./pics/salad.jpg";
import SeafoodPic from "./pics/seafood.jpg";
import SoupPic from "./pics/soup.jpg";
import PorkPic from "./pics/pork.jpg";

// this is a function that decides which picture to show for a specific category
const outputPicture = (category) => {
  let displayImg = null;

  switch (category.toLowerCase()) {
    case "beef":
      displayImg = BeefPic;
      break;
    case "chicken":
      displayImg = ChickenPic;
      break;
    case "salad":
      displayImg = SaladPic;
      break;
    case "seafood":
      displayImg = SeafoodPic;
      break;
    case "soup":
      displayImg = SoupPic;
      break;
    case "pork":
      displayImg = PorkPic;
      break;
    default:
      displayImg = FoodPic;
  }

  return displayImg;
};

export default outputPicture;
