import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  ingredients: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  yield: {
    type: Number,
    required: false,
  },
  cookingTime: {
    type: Number,
    required: false,
  },
  type: {
    type: String,
    enum: ["meat", "seafood", "vegetables", "poultry"],
    required: false,
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
