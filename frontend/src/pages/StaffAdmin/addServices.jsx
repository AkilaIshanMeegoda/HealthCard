import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { FaConciergeBell } from "react-icons/fa";
import { IconContext } from "react-icons";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const AddServices = () => {
  const { user } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(""); // New state to store the image URL
  const [image, setImage] = useState(null); // To handle the selected image file

  const showSuccess = () => {
    toast.success("Service added successfully!", {
      position: "bottom-right",
      theme: "colored",
    });
  };

  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");


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

  
  const handleAddService = async (event) => {
    event.preventDefault();
    if (!user) {
      setErrors((prev) => ({ ...prev, auth: "You must be logged in" }));
      return;
    }

    const form = event.target;
    const serviceObj = {
      serviceName: form.serviceName.value.trim(),
      description: form.description.value.trim(),
      price: price,
      hospitalId: user.email, // Using user email as hospitalId
      image: imageUrl, // Assuming you will handle the image upload separately
    };

    try {
      const response = await fetch("http://localhost:3000/api/services/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(serviceObj),
      });

      console.log("Response:", response);

      if (response.ok) {
        showSuccess();
        navigate("/admin/adminDashboard");
      } else {
        setErrors((prev) => ({ ...prev, server: "Failed to add service" }));
      }
    } catch (error) {
      setErrors((prev) => ({ ...prev, server: "Server error occurred" }));
    }
  };

  const validateInput = (name, value) => {
    let error = "";
    switch (name) {
      case "serviceName":
        if (!value.trim()) error = "Service name cannot be empty";
        break;
      case "description":
        if (!value.trim()) error = "Description cannot be empty";
        break;
      case "price":
        if (!value || isNaN(value) || value < 0)
          error = "Enter a valid price";
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
          <FaConciergeBell className="mt-8 mr-4" />
        </IconContext.Provider>
        <h2 className="mt-6 text-3xl font-semibold">Add Service</h2>
      </div>

      <form
        onSubmit={handleAddService}
        className="flex flex-col flex-wrap gap-4 m-auto"
      >
        {/* Service Name */}
        <div className="lg:w-full">
          <Label
            htmlFor="serviceName"
            value="Service Name"
            className="text-lg"
          />
          <TextInput
            id="serviceName"
            name="serviceName"
            type="text"
            placeholder="Service name"
            required
            onChange={(e) => {
              setServiceName(e.target.value);
              validateInput("serviceName", e.target.value);
            }}
            minLength={3}
            maxLength={50}
          />
          {errors.serviceName && (
            <div className="font-semibold text-red-600">
              {errors.serviceName}
            </div>
          )}
        </div>

        {/* Price */}
        <div className="lg:w-full">
          <Label htmlFor="price" value="Price (USD)" className="text-lg" />
          <TextInput
            id="price"
            name="price"
            type="number"
            placeholder="Price"
            required
            onChange={(e) => {
              setPrice(e.target.value);
              validateInput("price", e.target.value);
            }}
          />
          {errors.price && (
            <div className="font-semibold text-red-600">{errors.price}</div>
          )}
        </div>

        {/* Description */}
        <div className="lg:w-full">
          <Label
            htmlFor="description"
            value="Service Description"
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
    

          <Button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-6"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Add Service"}
        </Button>
        {errors.server && (
          <div className="font-semibold text-red-600 mt-4">{errors.server}</div>
        )}
      </form>
    </div>
  );
};

export default AddServices;
