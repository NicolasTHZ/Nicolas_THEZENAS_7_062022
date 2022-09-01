const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  userId: { type:String, required: true },
  postId: { type: String, required: true },
  name: { type: String, required : true },
  commentContent: { type: String, required: true },
  dateTime: {type: Date, default: Date.now}, 
  imageUrl: { type: String, required: false},
  likes: { type: Number, required: false, default: 0 },
  dislikes: { type: Number, required: false, default: 0 },
  usersLiked: { type: Array, required: false, default: "[]" },
  usersDisliked: { type: Array, required: false, default: "[]" }
});


module.exports = mongoose.model('Comment', postSchema);