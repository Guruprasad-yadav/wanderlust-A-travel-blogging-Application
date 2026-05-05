const mongoose = require("mongoose");
const initData=require("./data.js")
const Listing=require("../models/listing.js")

require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
console.log("ENV VALUE:", process.env.ATLAS_DB_URL);

const dbUrl=process.env.ATLASDB_URL||"mongodb+srv://delta-student:6ClfcrN0JQVMGhRL@cluster0.xfpjin1.mongodb.net/?appName=Cluster0";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data=initData.data.map((obj)=>({...obj, owner:"69f9db65c06edba765725d20"}))
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();