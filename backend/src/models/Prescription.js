const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const prescriptionSchema = new Schema(
  {
    patientName: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    patientId:{
      type:String,
      required:true,
    }
  },
  { timestamps: true }
);

const Prescription = mongoose.model("prescription", prescriptionSchema);

module.exports = Prescription;
