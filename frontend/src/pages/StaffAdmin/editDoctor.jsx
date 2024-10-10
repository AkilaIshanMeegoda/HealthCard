import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext"; // Updated import
import { Button, Label, Select, Textarea, TextInput } from "flowbite-react";
import { toast } from "react-toastify";
import { FaUserMd } from "react-icons/fa";
import { IconContext } from "react-icons";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const EditDoctor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Updated context
  const [doctor, setDoctor] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(""); // New state to store the image URL
  const [image, setImage] = useState(null); // To handle the selected image file
  const [specialties] = useState([
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
  ]);
  const [availability, setAvailability] = useState([{ date: "" }]);
  const [doctorStatus, setDoctorStatus] = useState("active"); // Default status
  const [maxAppointmentCount, setMaxAppointmentCount] = useState(10); // New state for max appointments
  const [ward, setWard] = useState(""); // New state for Ward
  const [paymentAmount, setPaymentAmount] = useState(""); // New state for Payment Amount
  const [time, setTime] = useState("");


  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/doctors/doctor/${id}`
        ); // Adjust to your API endpoint
        console.log(response.data);
        setDoctor(response.data);
        setAvailability(response.data.availability || []);
        setDoctorStatus(response.data.status || "active");
        setImageUrl(response.data.image || "");
        setMaxAppointmentCount(response.data.maxAppointmentCount || 0); // Set maxAppointmentCount
        setWard(response.data.ward || ""); // Set Ward
        setPaymentAmount(response.data.paymentAmount || ""); // Set Payment Amount
        setTime(response.data.time || "");

      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchDoctor();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const doctorObj = {
        ...doctor,
        availability: availability,
        status: doctorStatus,
        image:imageUrl,
        maxAppointmentCount,
        ward, // Include ward
        paymentAmount, // Include paymentAmount
        time,

      };

      await axios.put(
        `http://localhost:3000/api/doctors/${id}`,
        doctorObj // Adjust to your API endpoint
      ); 
      toast.success("Doctor updated successfully!", { // Success message
        position: "bottom-right",
        theme: "colored",
      });
      navigate("/admin/adminDashboard"); // Redirect after updating
    } catch (error) {
      console.error("Error updating doctor:", error);
      toast.error("Failed to update doctor."); // Error message
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor({ ...doctor, [name]: value });
  };

  const handleAvailabilityChange = (index, field, value) => {
    const updatedAvailability = [...availability];
    updatedAvailability[index][field] = value;
    setAvailability(updatedAvailability);
  };

  const addAvailabilitySlot = () => {
    setAvailability([
      ...availability,
      { date: ""},
    ]);
  };

  const removeAvailabilitySlot = (index) => {
    const updatedAvailability = availability.filter((_, i) => i !== index);
    setAvailability(updatedAvailability);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleImageUpload = async (file) => {
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file.name);
    try {
      await fileRef.put(file); // Upload the file to Firebase
      const uploadedImageUrl = await fileRef.getDownloadURL(); // Get the image URL after upload
      setImageUrl(uploadedImageUrl); // Store the image URL in state
      console.log("Uploaded Image URL:", uploadedImageUrl); // Debugging line
      toast.success("Image uploaded successfully!", {
        position: "bottom-right",
        theme: "colored",
      });
    } catch (error) {
      setErrors((prev) => ({ ...prev, image: "Image upload failed" }));
      console.error("Image upload error: ", error);
    }
  };
  
  return (
    <div className="px-20 pb-12 mt-16 bg-white shadow-xl rounded-3xl mx-44">
      <div className="flex p-6 pt-0 rounded-xl">
        <IconContext.Provider value={{ color: "blue", size: "24px" }}>
          <FaUserMd className="mt-8 mr-4" />
        </IconContext.Provider>
        <h2 className="mt-6 text-3xl font-semibold">Edit Doctor</h2>
      </div>

      <form onSubmit={handleUpdate} className="flex flex-col flex-wrap gap-4 m-auto">
        {/* Doctor Name */}
        <div className="lg:w-1/2">
          <Label htmlFor="doctorName" value="Doctor Name" className="text-lg" />
          <TextInput
            id="doctorName"
            name="doctorName"
            type="text"
            value={doctor.doctorName || ''}
            placeholder="Doctor's name"
            required
            onChange={handleChange}
          />
        </div>

        {/* Specialty */}
        <div className="lg:w-1/2">
          <Label htmlFor="specialty" value="Specialty" className="text-lg" />
          <Select
            id="specialty"
            name="specialty"
            value={doctor.specialization || specialties[0]}
            onChange={(e) => handleChange({ target: { name: 'specialization', value: e.target.value } })}
          >
            {specialties.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </div>

        {/* Experience */}
        <div className="lg:w-1/2">
          <Label htmlFor="experience" value="Experience (Years)" className="text-lg" />
          <TextInput
            id="experience"
            name="experience"
            type="number"
            value={doctor.experience || ''}
            placeholder="Years of experience"
            required
            onChange={handleChange}
          />
        </div>

        {/* Image Upload */}
        <div className="lg:w-1/2">
          <Label htmlFor="image" value="Upload Image" className="text-lg" />
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {imageUrl && <img src={imageUrl} alt="Doctor" className="mt-2 w-32 h-32" />}
        </div>

        {/* Doctor Status */}
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

        {/* Availability Section */}
<div className="flex flex-col gap-4">
  <h3 className="text-lg font-semibold">Availability</h3>
  {availability.map((slot, index) => (
    <div key={index} className="flex gap-4">
      <div className="lg:w-1/3">
        <Label htmlFor={`date-${index}`} value="Date" className="text-lg" />
        <TextInput
          id={`date-${index}`}
          type="text" // Keep the date input as plain text
          value={slot.date || ""} // Use the value directly
          onChange={(e) => handleAvailabilityChange(index, "date", e.target.value)}
          required
        />
      </div>
      <Button onClick={() => removeAvailabilitySlot(index)} type="button" color="failure">
        Remove
      </Button>
    </div>
  ))}
  <Button onClick={addAvailabilitySlot} type="button" color="success">
    Add Availability
  </Button>
</div>


<div className="lg:w-1/2">
          <Label htmlFor="time" value="Time" className="text-lg" />
          <TextInput
            id="time"
            name="time"
            type="text"
            value={doctor.time || ''}
            placeholder="Doctor's available time"
            required
            onChange={handleChange}
          />
        </div>

 {/* Max Appointment Count */}
 <div className="lg:w-1/2">
          <Label htmlFor="maxAppointmentCount" value="Max Appointment Count" className="text-lg" />
          <TextInput
            id="maxAppointmentCount"
            name="maxAppointmentCount"
            type="number"
            value={maxAppointmentCount || ''}
            placeholder="Maximum appointments allowed"
            required
            onChange={(e) => setMaxAppointmentCount(e.target.value)}
          />
          </div>
        {/* Description */}
        <div className="lg:w-full">
          <Label htmlFor="description" value="Description" className="text-lg" />
          <Textarea
            id="description"
            name="description"
            rows={4}
            value={doctor.description || ''}
            placeholder="Description about the doctor"
            onChange={handleChange}
          />
        </div>


 {/* Ward */}
 <div className="lg:w-1/2">
          <Label htmlFor="ward" value="Ward" className="text-lg" />
          <TextInput
            id="ward"
            type="number"
            value={ward}
            onChange={(e) => setWard(Number(e.target.value))} // Convert to number
            required
          />
        </div>

        {/* Payment Amount */}
        <div className="lg:w-1/2">
          <Label htmlFor="paymentAmount" value="Payment Amount" className="text-lg" />
          <TextInput
            id="paymentAmount"
            type="number"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(Number(e.target.value))} // Convert to number
            required
          />
        </div>
        
        <Button type="submit" color="success" className="mt-4">
          Update Doctor
        </Button>
      </form>
    </div>
  );
};

export default EditDoctor;
