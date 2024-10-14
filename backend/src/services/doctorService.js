const doctorRepository = require("../repositories/doctorRepository");

const createDoctor = async (doctorData) => {
  return await doctorRepository.createDoctor(doctorData);
};

const getDoctorsByHospital = async (hospitalId) => {
  const doctors = await doctorRepository.getAllByHospitalId(hospitalId);
  if (!doctors || doctors.length === 0) {
    throw new Error("No doctors found for this hospital.");
  }
  return doctors;
};

const getDoctorById = async (id) => {
  const doctor = await doctorRepository.getById(id);
  if (!doctor) {
    throw new Error("No doctor found with this ID.");
  }
  return doctor;
};

const updateDoctor = async (id, updatedData) => {
  const doctor = await doctorRepository.updateById(id, updatedData);
  if (!doctor) {
    throw new Error("Failed to update doctor.");
  }
  return doctor;
};

const deleteDoctor = async (id) => {
  const result = await doctorRepository.deleteById(id);
  if (!result) {
    throw new Error("Failed to delete doctor.");
  }
  return { message: "Doctor deleted successfully." };
};

module.exports = {
  createDoctor,
  getDoctorsByHospital,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
