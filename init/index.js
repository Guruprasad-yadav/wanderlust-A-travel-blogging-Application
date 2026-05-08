const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");


const dbUrl = "mongodb+srv://delta-student:6ClfcrN0JQVMGhRL@cluster0.xfpjin1.mongodb.net/?appName=Cluster0";

const MONGO_URL =dbUrl

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {

  await Listing.deleteMany({});

  const updatedData = initData.data.map((obj) => ({
    ...obj,

    owner: "69fdc6f62200bebd811fbc1c",

  }));

  await Listing.insertMany(updatedData);

  console.log("data was initialized");
};

initDB();