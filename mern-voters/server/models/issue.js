const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const issueSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  upVotes: { type: Number, default: 0 },
  downVotes: { type: Number, default: 0 },
  voters: { type: Array, default: [] },
  comments: { type: Array, default: [] },
  date: { type: Date, required: true, default: Date.now },
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Issue", issueSchema);
