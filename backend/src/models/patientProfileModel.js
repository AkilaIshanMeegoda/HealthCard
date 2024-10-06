const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  age: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  
},{timestamps:true});

module.exports=mongoose.model('Profiles',profileSchema)

