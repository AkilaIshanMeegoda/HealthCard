const mongoose = require("mongoose");

const labappointmentSchema = mongoose.Schema({
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
    labId: {
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
      default: 'Pending',
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
    testType: {
        type: String,
    },
    wardNo: {
        type: String,
    },
    note: {
        type: String,
    }
  },{timestamps:true});
  
  module.exports=mongoose.model('LabAppointment',labappointmentSchema)