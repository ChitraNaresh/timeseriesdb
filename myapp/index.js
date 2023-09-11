const socket = require("socket.io-client")("http://localhost:3002"); // Replace with your listener service URL
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const crypto = require("crypto");
const mongoose = require("mongoose");
const moment = require("moment");
const assert = require("assert");

mongoose
  .connect(
    "mongodb+srv://ChitraNaresh18:ChitraNaresh18@cluster1.ahdanvp.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
db1 = mongoose.connection;

db1.on("error", console.error.bind(console, "MongoDB connection error:"));
db1.once("open", () => {
  console.log("Connected to MongoDB");
});

// / Define MongoDB schema and model for time series data
const timeSeriesSchema = new mongoose.Schema({
  name: String,
  origin: Array,
  destination: String,
});

const TimeSeries = mongoose.model("User1", timeSeriesSchema);

async function insert() {
  await TimeSeries.create({
    name: "Nani",
    origin: [{ value: 20 }],
    destination: "Hyderabad",
  });
  console.log("User Created");
}

insert();
