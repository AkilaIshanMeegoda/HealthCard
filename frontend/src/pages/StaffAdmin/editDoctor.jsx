import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditDoctor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState({});

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/doctors/doctor/${id}`); // Adjust to your API endpoint
        console.log(response.data);
        setDoctor(response.data);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchDoctor();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/doctors/${id}`, doctor); // Adjust to your API endpoint
      navigate(`http://localhost:3000/doctors/${id}`); // Redirect after updating
    } catch (error) {
      console.error("Error updating doctor:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor({ ...doctor, [name]: value });
  };

  return (
    <form onSubmit={handleUpdate}>
      {/* Render form fields for updating doctor information */}
      <input type="text" name="doctorName" value={doctor.doctorName || ''} onChange={handleChange} />
      {/* Add more fields as needed */}
      <button type="submit">Update</button>
    </form>
  );
};

export default EditDoctor;
