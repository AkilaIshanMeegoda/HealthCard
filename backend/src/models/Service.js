const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  serviceName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  hospitalId: {
    type: String,
    required: true, // Matches the hospital admin's email
  },
  image: {
    type: String, // URL or path to the image
    required: false,
  },
  price: {
    type: Number,
    required: false, // Only add this if services have costs
  }
  
  
});

module.exports = mongoose.model("Service", serviceSchema);
