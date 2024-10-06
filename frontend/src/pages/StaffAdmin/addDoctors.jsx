import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext"; // Updated import
import { Link, useNavigate } from "react-router-dom";
import { Button, Label, Select, Textarea, TextInput } from "flowbite-react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { FaUserMd } from "react-icons/fa";
import { IconContext } from "react-icons";

const AddDoctors = () => {
  const { user } = useContext(AuthContext); // Updated context
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const showSuccess = () => {
    toast.success("Doctor added successfully!", {
      position: "bottom-right",
      theme: "colored",
    });
  };

  const specialties = [
    "Cardiologist",
    "Dermatologist",
    "Neurologist",
    "Pediatrician",
    "Radiologist",
    "Surgeon",
    "General Practitioner",
    "Orthopedic",
    "Psychiatrist",
    "Other",
  ];

  const [selectedSpecialty, setSelectedSpecialty] = useState(specialties[0]);
  const [experience, setExperience] = useState("");
  const [ward, setWard] = useState("");
  const [availability, setAvailability] = useState([
    { date: "", time: "", status: "available" },
  ]);
  const [image, setImage] = useState("");
  const [doctorStatus, setDoctorStatus] = useState("active"); // Default status

  const handleAddDoctor = async (event) => {
    event.preventDefault();
    if (!user) {
      setErrors((prev) => ({ ...prev, auth: "You must be logged in" }));
      return;
    }

    const form = event.target;
    const doctorObj = {
      doctorName: form.name.value.trim(),
      specialization: selectedSpecialty,
      experience: experience,
      hospitalId: user.email, // Using user email as hospitalId
      image: image, // Assuming you will handle the image upload separately
      availability: availability,
      description: form.description.value.trim(),
      ward: ward,
      status: doctorStatus,
    };

    try {
      const response = await fetch("http://localhost:3000/api/doctors/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(doctorObj),
      });

      // Log the response for debugging
      console.log("Response:", response);

      if (response.ok) {
        showSuccess();
        navigate("/admin/adminDashboard");
      } else {
        setErrors((prev) => ({ ...prev, server: "Failed to add doctor" }));
      }
    } catch (error) {
      setErrors((prev) => ({ ...prev, server: "Server error occurred" }));
    }
  };

  const handleAvailabilityChange = (index, field, value) => {
    const updatedAvailability = [...availability];
    updatedAvailability[index][field] = value;
    setAvailability(updatedAvailability);
  };

  const addAvailabilitySlot = () => {
    setAvailability([
      ...availability,
      { date: "", time: "", status: "available" },
    ]);
  };

  const removeAvailabilitySlot = (index) => {
    const updatedAvailability = availability.filter((_, i) => i !== index);
    setAvailability(updatedAvailability);
  };

  // Consolidated Validation Handler
  const validateInput = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value.trim()) error = "Name cannot be empty";
        break;
      case "description":
        if (!value.trim()) error = "Description cannot be empty";
        break;
      case "experience":
        if (!value || isNaN(value) || value < 0)
          error = "Enter a valid number of years of experience";
        break;
      case "ward":
        if (!value.trim()) error = "Ward cannot be empty";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  return (
    <div className="px-20 pb-12 mt-16 bg-white shadow-xl rounded-3xl mx-44">
      <div className="pt-8 mt-8">
        <Link to={`/`}></Link>
      </div>
      <div className="flex p-6 pt-0 rounded-xl">
        <IconContext.Provider value={{ color: "blue", size: "24px" }}>
          <FaUserMd className="mt-8 mr-4" />
        </IconContext.Provider>
        <h2 className="mt-6 text-3xl font-semibold">Add Doctor</h2>
      </div>

      <form
        onSubmit={handleAddDoctor}
        className="flex flex-col flex-wrap gap-4 m-auto"
      >
        {/* first row */}
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <Label htmlFor="name" value="Doctor Name" className="text-lg" />
            <TextInput
              id="name"
              name="name"
              type="text"
              placeholder="Doctor's name"
              required
              onChange={(e) => validateInput("name", e.target.value)}
              minLength={3}
              maxLength={50}
            />
            {errors.name && (
              <div className="font-semibold text-red-600">{errors.name}</div>
            )}
          </div>

          <div className="lg:w-1/2">
            <Label
              htmlFor="experience"
              value="Experience (Years)"
              className="text-lg"
            />
            <TextInput
              id="experience"
              name="experience"
              type="number"
              placeholder="Years of experience"
              required
              onChange={(e) => {
                setExperience(e.target.value);
                validateInput("experience", e.target.value);
              }}
            />
            {errors.experience && (
              <div className="font-semibold text-red-600">
                {errors.experience}
              </div>
            )}
          </div>
        </div>

        {/* second row */}
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <Label htmlFor="specialty" value="Specialty" className="text-lg" />
            <Select
              id="specialty"
              name="specialty"
              className="w-full rounded"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              {specialties.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Doctor Status Section */}
        <div className="flex flex-col gap-4 mb-6">
          <Label value="Doctor Status" className="text-lg" />
          <Select
            value={doctorStatus}
            onChange={(e) => setDoctorStatus(e.target.value)}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </Select>
        </div>

        {/* availability section */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Availability</h3>
          {availability.map((slot, index) => (
            <div key={index} className="flex gap-4">
              <div className="lg:w-1/3">
                <Label
                  htmlFor={`date-${index}`}
                  value="Date"
                  className="text-lg"
                />
                <TextInput
                  id={`date-${index}`}
                  type="date"
                  value={slot.date}
                  onChange={(e) =>
                    handleAvailabilityChange(index, "date", e.target.value)
                  }
                  required
                />
              </div>

              <div className="lg:w-1/3">
                <Label
                  htmlFor={`time-${index}`}
                  value="Time Slot"
                  className="text-lg"
                />
                <TextInput
                  id={`time-${index}`}
                  type="text"
                  placeholder="e.g., 9:00 AM - 11:00 AM"
                  value={slot.time}
                  onChange={(e) =>
                    handleAvailabilityChange(index, "time", e.target.value)
                  }
                  required
                />
              </div>

              <div className="lg:w-1/3">
                <Label
                  htmlFor={`status-${index}`}
                  value="Status"
                  className="text-lg"
                />
                <Select
                  id={`status-${index}`}
                  value={slot.status}
                  onChange={(e) =>
                    handleAvailabilityChange(index, "status", e.target.value)
                  }
                >
                  <option value="available">Available</option>
                  <option value="unavailable">Unavailable</option>
                  <option value="booked">Booked</option>
                </Select>
              </div>

              <Button
                type="button"
                color="failure"
                onClick={() => removeAvailabilitySlot(index)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button type="button" onClick={addAvailabilitySlot} className="mt-2">
            Add Availability Slot
          </Button>
        </div>

        {/* third row */}
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <Label htmlFor="ward" value="Ward" className="text-lg" />
            <TextInput
              id="ward"
              name="ward"
              type="text"
              placeholder="Ward"
              required
              onChange={(e) => {
                setWard(e.target.value);
                validateInput("ward", e.target.value);
              }}
            />
            {errors.ward && (
              <div className="font-semibold text-red-600">{errors.ward}</div>
            )}
          </div>

          <div className="lg:w-1/2">
            <Label htmlFor="image" value="Upload Image" className="text-lg" />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0]; // Get the selected file
                if (file) {
                  const reader = new FileReader(); // Create a new FileReader instance

                  reader.onloadend = () => {
                    const base64String = reader.result; // Get the base64 string
                    setImage(base64String); // Store the base64 string in state
                  };

                  reader.readAsDataURL(file); // Convert the file to a base64-encoded string
                }
              }} // Handle image upload and conversion to base64
              required
            />
          </div>
        </div>

        {/* last row */}
        <div className="flex gap-8">
          <div className="lg:w-full">
            <Label
              htmlFor="description"
              value="Doctor Description"
              className="text-lg"
            />
            <Textarea
              id="description"
              name="description"
              placeholder="Write a brief description..."
              required
              onChange={(e) => validateInput("description", e.target.value)}
              rows={5}
              maxLength={1000}
            />
            {errors.description && (
              <div className="font-semibold text-red-600">
                {errors.description}
              </div>
            )}
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading || Object.keys(errors).some((key) => errors[key])}
          className="w-40 bg-red-500 shadow-lg"
        >
          <p className="text-lg font-bold">Add Doctor</p>
        </Button>
      </form>
    </div>
  );
};

export default AddDoctors;
