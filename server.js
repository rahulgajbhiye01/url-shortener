import express from "express";
import mongoose from "mongoose";
import { nanoid } from "nanoid";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { Url } from "./schema.js";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MONGODB Connected"));

//Post Method
app.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  const shortId = nanoid(7);

  const newUrl = new Url({
    shortId,
    longUrl,
  });

  await newUrl.save();

  res.json({
    shortid: `http://localhost:5000/${shortId}`,
  });
});

//Get Method
app.get("/:shortId", async (req, res) => {
  const url = await Url.findOne({
    shortId: req.params.shortId,
  });

  if (url) {
    res.redirect(url.longUrl);
  } else {
    res.status(404).json({
      error: "Url not found",
    });
  }
});

app.listen(5000, () => {
  console.log("http://localhost:5000");
});
