const mongoose = require("mongoose"); // Import mongoose
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  doctorName: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  hospitalId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  availability: [
    {
      date: {
        type: String,
        required: true,
      },
    },
  ],
  time: {
    type: String, // Can be a time slot like "9:00 AM - 11:00 AM"
    required: true,
  },
  maxAppointmentCount: {
    type: Number, // Maximum number of appointments the doctor can handle
    required: true,
    default: 10, // Default value if needed
  },
  description: {
    type: String,
    required: false,
  },
  ward: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["active", "inactive", "on leave", "retired"],
    default: "active",
  },
  paymentAmount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Doctor", doctorSchema);
