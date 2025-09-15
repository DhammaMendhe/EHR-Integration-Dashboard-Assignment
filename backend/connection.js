const mongoose = require("mongoose");

const mongoUrl =
  "mongodb+srv://send2dhammadipmendhe:CsVqDvk5Zbzaqw0o@cluster0.ke16gtv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function connection() {
  try {
    await mongoose.connect(mongoUrl);
    console.log("connected to mongodb")
  } catch (error) {
    console.log("not connected to mongodb ");
  }
}
module.exports = connection