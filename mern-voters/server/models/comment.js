const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  text: { type: String, required: true },
  issueID: {
    type: Schema.Types.ObjectId,
    ref: "Issue",
    required: true,
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model("Comment", commentSchema);
