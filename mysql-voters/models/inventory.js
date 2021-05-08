//schema storing all ids.
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
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
  commentID: {
    type: String,
    ref: "Comment",
    required: true,
  },
  date: { type: Date, required },
});

module.exports = mongoose.model("Inventory", inventorySchema);
