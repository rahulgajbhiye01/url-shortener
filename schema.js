import mongoose, { Schema } from "mongoose";

const urlSchema = new Schema({
  shortId: String,
  longUrl: String,
});

export const Url = mongoose.model("URL", urlSchema);
