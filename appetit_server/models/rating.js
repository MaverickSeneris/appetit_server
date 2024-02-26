import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
  ratingValue: { type: Number, required: true, min: 1, max: 5 },
  timestamp: { type: Date, default: Date.now }
});

const Rating = mongoose.model('Rating', ratingSchema);

export default Rating
