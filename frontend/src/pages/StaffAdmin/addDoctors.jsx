import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext"; // Updated import
import { Link, useNavigate } from "react-router-dom";
import { Button, Label, Select, Textarea, TextInput } from "flowbite-react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { FaUserMd } from "react-icons/fa";
import { IconContext } from "react-icons";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const AddDoctors = () => {
  const { user } = useContext(AuthContext); // Updated context
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(""); // New state to store the image URL
  const [image, setImage] = useState(null); // To handle the selected image file
  const [maxAppointmentCount, setMaxAppointmentCount] = useState(10); // New state for max appointment count

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
  const [availability, setAvailability] = useState([{ date: "" }]);
  const [doctorStatus, setDoctorStatus] = useState("active"); // Default status
  const [paymentAmount, SetPaymentAmount] = useState("");
  const [time, setTime] = useState("");

  const handleImageUpload = async (file) => {
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file.name);
    try {
      await fileRef.put(file); // Upload the file to Firebase
      const uploadedImageUrl = await fileRef.getDownloadURL(); // Get the image URL after upload
      setImageUrl(uploadedImageUrl); // Store the image URL in state
      toast.success("Image uploaded successfully!", {
        position: "bottom-right",
        theme: "colored",
      });
    } catch (error) {
      setErrors((prev) => ({ ...prev, image: "Image upload failed" }));
      console.error("Image upload error: ", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (limit example: 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: "File size exceeds 5MB limit",
        }));
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          image: "Only image files are allowed",
        }));
        return;
      }

      setImage(file);
      handleImageUpload(file);
    }
  };

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
      image: imageUrl,
      availability: availability,
      time: time,
      maxAppointmentCount: maxAppointmentCount, // Add max appointment count to the doctor object
      description: form.description.value.trim(),
      ward: ward,
      status: doctorStatus,
      paymentAmount: paymentAmount,
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
    setAvailability([...availability, { date: "" }]);
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
      case "time":
        if (!value.trim()) error = "Time cannot be empty";
        break;
      case "status":
        if (!value.trim()) error = "Status cannot be empty";
        break;
      case "experience":
        if (!value || isNaN(value) || value < 0)
          error = "Enter a valid number of years of experience";
        break;
      case "ward":
        if (!value || isNaN(value) || value < 0)
          error = "Enter a valid number of ward";
        break;
      case "paymentAmount":
        if (!value || isNaN(value) || value < 0)
          error = "Enter a valid Payment Amount";
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
                <TextInput
                  id={`date-${index}`}
                  type="text" // Set type to text
                  placeholder="e.g., Thursday" // Placeholder to indicate format
                  value={slot.date}
                  onChange={(e) =>
                    handleAvailabilityChange(index, "date", e.target.value)
                  }
                  required
                />
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
          <Button
            type="button"
            onClick={addAvailabilitySlot}
            className="mt-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Add Availability Slot
          </Button>
        </div>

        {/* Time input field */}
        <div className="lg:w-1/3">
          <Label htmlFor={`time`} value="Time" className="text-lg" />
          <TextInput
            id={`time`}
            type="text"
            value={time} // Replace with your state variable
            placeholder="e.g., 9 AM"
            onChange={(e) => setTime(e.target.value)} // Replace with your state setter
            required
          />
        </div>

        {/* third row */}
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <Label htmlFor="ward" value="Ward" className="text-lg" />
            <TextInput
              id="ward"
              name="ward"
              type="number" // Changed from "text" to "number"
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
              onChange={handleFileChange} // Handle file selection
              required
            />
            {errors.image && (
              <div className="font-semibold text-red-600">{errors.image}</div>
            )}
          </div>
        </div>

        {/* max appointment count field */}
        <div className="lg:w-1/2">
          <Label
            htmlFor="maxAppointmentCount"
            value="Max Appointment Count"
            className="text-lg"
          />
          <TextInput
            id="maxAppointmentCount"
            name="maxAppointmentCount"
            type="number"
            placeholder="Maximum appointments allowed"
            value={maxAppointmentCount}
            onChange={(e) => setMaxAppointmentCount(e.target.value)}
            required
          />
        </div>

        <div className="flex gap-8">
          <div className="lg:w-1/2">
            {" "}
            {/* Increase to lg:w-3/4 for a wider input */}
            <Label
              htmlFor="paymentAmount"
              value="Payment Amount"
              className="text-lg"
            />
            <TextInput
              id="paymentAmount"
              name="paymentAmount"
              type="number"
              placeholder="Payment Amount"
              required
              className="w-full" // Ensure the input takes full width of the container
              onChange={(e) => {
                SetPaymentAmount(e.target.value);
                validateInput("paymentAmount", e.target.value);
              }}
            />
            {errors.paymentAmount && (
              <div className="font-semibold text-red-600">
                {errors.paymentAmount}
              </div>
            )}
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
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-6"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Add Doctor"}
        </Button>
        {errors.server && (
          <div className="font-semibold text-red-600 mt-4">{errors.server}</div>
        )}
      </form>
    </div>
  );
};

export default AddDoctors;
