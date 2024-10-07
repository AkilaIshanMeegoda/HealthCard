const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reportSchema = new Schema(
  {
    titleName: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    patientName: {
      type: String,
      required: true,
    },
    category: {
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
    patientId: {
      type: String,
      required: true,
    },
    hospitalId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Report = mongoose.model("report", reportSchema);

module.exports = Report;
