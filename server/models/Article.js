import mongoose from "mongoose";
var Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: String,
  description: String,
  createdAt: Number
});

mongoose.model("articles", articleSchema);
