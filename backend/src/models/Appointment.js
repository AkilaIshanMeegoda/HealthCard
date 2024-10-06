const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
    userId: {
      type: String,
    },
    userName: {
      type: String,
    },
    email: {
      type: String,
    },
    contact: {
      type: String,
    },
    doctorId: {
      type: String,
    },
    date: {
        type: String,
    },
    time: {
        type: String,
    },
    status: {
      type: String,
    },
    paymentAmount: {
        type: String,
    },
    hospitalName: {
        type: String,
    },
    hospitalId: {
        type: String,
    },
    doctorName: {
        type: String,
    },
    specialization: {
        type: String,
    },
    wardNo: {
        type: String,
    },
    note: {
        type: String,
    }
  },{timestamps:true});
  
  module.exports=mongoose.model('Appointment',appointmentSchema)