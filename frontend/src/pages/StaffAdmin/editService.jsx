import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { toast } from "react-toastify";
import { FaConciergeBell } from "react-icons/fa";
import { IconContext } from "react-icons";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const UpdateService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [service, setService] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(""); 
  const [image, setImage] = useState(null); 

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/services/service/${id}`);
        console.log(response.data);
        setService(response.data);
        setImageUrl(response.data.image || ""); // Load existing image URL
      } catch (error) {
        console.error("Error fetching service data:", error);
      }
    };

    fetchService();
  }, [id]);

  const showSuccess = () => {
    toast.success("Service updated successfully!", {
      position: "bottom-right",
      theme: "colored",
    });
  };

  const handleImageUpload = async (file) => {
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file.name);
    try {
      await fileRef.put(file);
      const uploadedImageUrl = await fileRef.getDownloadURL();
      setImageUrl(uploadedImageUrl);
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
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, image: "File size exceeds 5MB limit" }));
        return;
      }
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({ ...prev, image: "Only image files are allowed" }));
        return;
      }
      setImage(file);
      handleImageUpload(file);
    }
  };

  const handleUpdateService = async (event) => {
    event.preventDefault();
    if (!user) {
      setErrors((prev) => ({ ...prev, auth: "You must be logged in" }));
      return;
    }

    const updatedService = {
      serviceName: service.serviceName,
      description: service.description,
      price: service.price,
      hospitalId: user.email,
      image: imageUrl,
    };

    try {
      const response = await axios.put(`http://localhost:3000/api/services/${id}`, updatedService, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.status === 200) {
        showSuccess();
        navigate("/admin/adminDashboard");
      } else {
        setErrors((prev) => ({ ...prev, server: "Failed to update service" }));
      }
      
    } catch (error) {
      setErrors((prev) => ({ ...prev, server: "Server error occurred" }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService({ ...service, [name]: value });
  };

  return (
    <div className="px-20 pb-12 mt-16 bg-white shadow-xl rounded-3xl mx-44">
      <div className="flex p-6 pt-0 rounded-xl">
        <IconContext.Provider value={{ color: "blue", size: "24px" }}>
          <FaConciergeBell className="mt-8 mr-4" />
        </IconContext.Provider>
        <h2 className="mt-6 text-3xl font-semibold">Update Service</h2>
      </div>

      <form onSubmit={handleUpdateService} className="flex flex-col flex-wrap gap-4 m-auto">
        {/* Service Name */}
        <div className="lg:w-full">
          <Label htmlFor="serviceName" value="Service Name" className="text-lg" />
          <TextInput
            id="serviceName"
            name="serviceName"
            type="text"
            value={service.serviceName || ""}
            onChange={handleChange}
            required
            minLength={3}
            maxLength={50}
          />
          {errors.serviceName && <div className="font-semibold text-red-600">{errors.serviceName}</div>}
        </div>

        {/* Price */}
        <div className="lg:w-full">
          <Label htmlFor="price" value="Price (USD)" className="text-lg" />
          <TextInput
            id="price"
            name="price"
            type="number"
            value={service.price || ""}
            onChange={handleChange}
            required
          />
          {errors.price && <div className="font-semibold text-red-600">{errors.price}</div>}
        </div>

        {/* Description */}
        <div className="lg:w-full">
          <Label htmlFor="description" value="Service Description" className="text-lg" />
          <Textarea
            id="description"
            name="description"
            placeholder="Write a brief description..."
            value={service.description || ""}
            onChange={handleChange}
            required
            rows={5}
            maxLength={1000}
          />
          {errors.description && <div className="font-semibold text-red-600">{errors.description}</div>}
        </div>

        {/* Image Upload */}
        <div className="lg:w-1/2">
          <Label htmlFor="image" value="Upload Image" className="text-lg" />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
          {errors.image && <div className="font-semibold text-red-600">{errors.image}</div>}
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-6"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Update Service"}
        </Button>
        {errors.server && <div className="font-semibold text-red-600 mt-4">{errors.server}</div>}
      </form>
    </div>
  );
};

export default UpdateService;
