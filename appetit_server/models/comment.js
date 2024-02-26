import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
  commentText: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment
