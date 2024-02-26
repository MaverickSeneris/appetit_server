import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    recipe:{
        type: String,
        require: true
    },
    author:{
        type: String,
        require: true
    },
    image:{
        type: String
    }
})

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe