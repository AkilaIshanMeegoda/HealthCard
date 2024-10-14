const mongoose = require("mongoose");

let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) {
    console.log("Using existing MongoDB connection.");
    return mongoose.connection;
  }

  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL);

    isConnected = true;
    console.log("MongoDB Connection Success!");

    return connection;
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
