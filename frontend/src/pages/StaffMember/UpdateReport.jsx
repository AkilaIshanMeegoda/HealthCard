import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Datepicker, Label, Select, Textarea, TextInput } from "flowbite-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IconContext } from "react-icons";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { FaBoxArchive } from "react-icons/fa6";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { Spinner } from "flowbite-react";

const UpdateReport = () => {
  const { user } = useAuthContext();
  const [errors, setErrors] = useState({});
  const [postImage, setPostImage] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [reportDetails, setReportDetails] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const showSuccess = () => {
    toast.success("Report is updated successfully!", {
      position: "bottom-right",
      theme: "colored",
    });
  };

  const category = [
    "Blood Test Report",
    "Urine Test Report",
    "Biopsy Report",
    "Microbiology Report",
    "X-ray Report",
    "MRI Report",
    "CT Scan Report",
    "Ultrasound Report",
    "Echocardiogram Report",
    "Preoperative Report",
    "General Consultation Report",
    "ICU Report",
    "Cancer Diagnosis Report",
    "Other Report",
  ];

  const [selectedCategory, setSelectedCategory] = useState(category[0]);

  useEffect(() => {
    fetch(`http://localhost:3000/report/ViewReport/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setReportDetails(data);
        setSelectedCategory(data.category);
        setSelectedDate(new Date(data.date));
        setPostImage(data.image);
      })
      .catch((error) => {
        console.error("Error fetching report details", error);
      });
  }, [id, user.token]);

  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setLoading(true); // Start loading
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(selectedFile.name);

      try {
        const snapshot = await fileRef.put(selectedFile);
        const downloadURL = await snapshot.ref.getDownloadURL();
        setPostImage(downloadURL);
        setFileUploaded(true);
        setLoading(false); // Stop loading when done
      } catch (error) {
        console.error("Error uploading file: ", error);
        setLoading(false); // Stop loading in case of error
      }
    } else {
      setErrors((prev) => ({ ...prev, file: "No file selected" }));
    }
  };

  const handleUpdateReport = (event) => {
    event.preventDefault();
    if (!user) {
      toast.error("You must be logged in");
      return;
    }
    const form = event.target;

    const reportObj = {
      titleName: form.titleName.value.trim(),
      date: form.date.value,
      patientName: form.patientName.value.trim(),
      category: selectedCategory,
      description: form.description.value.trim(),
      image: postImage
    };

    fetch(`http://localhost:3000/report/updateReport/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(reportObj),
    })
      .then((res) => res.json())
      .then((data) => {
        showSuccess();
        navigate("/staffMember/dashboard");
      })
      .catch((error) => {
        console.error("Error updating report", error);
      });
  };

  if (!reportDetails) {
    return <div>Loading...</div>;
  }

  //Validations
  const validateInput = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value.trim())
          // This checks for empty or only space
          error = "Name cannot be empty";
        break;
      case "qty":
        if (value <= 0 || value > 99999)
          error = "Enter a valid quantity (1-99999)";
        break;
      case "price":
        if (value <= 0 || value > 999999999999)
          error = "Enter a valid price (1-999999999999)";
        break;
      case "description":
        if (!value.trim())
          // This checks for empty or only space in description
          error = "Description cannot be empty";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <div className="px-20 pb-12 bg-white shadow-xl rounded-3xl mx-44">
        <div className="w-8 pt-8 mt-8">
          <Link to={`/staffMember/patients`}>
            <IconContext.Provider value={{ color: "green", size: "40px" }}>
              <IoArrowBackCircleSharp />
            </IconContext.Provider>
          </Link>
        </div>
        <div className="flex p-6 pt-0 rounded-xl">
          <IconContext.Provider value={{ color: "blue", size: "24px" }}>
            <FaBoxArchive className="mt-8 mr-4" />
          </IconContext.Provider>
          <h2 className="mt-6 text-3xl font-bold">Update Report</h2>
        </div>

        <form
          onSubmit={handleUpdateReport}
          className="flex flex-col flex-wrap gap-4 m-auto"
        >
          {/* first row */}
          <div className="flex gap-8">
            <div className="lg:w-1/2">
              <Label htmlFor="name" value="Title Name" className="text-lg" />
              <TextInput
                id="titleName"
                name="titleName"
                type="text"
                placeholder="Title Name"
                defaultValue={reportDetails.titleName}
                required
                onChange={(e) => validateInput("name", e.target.value)}
                minLength={3}
                maxLength={30}
              />
              {errors.name && (
                <div className="font-semibold text-red-600">{errors.name}</div>
              )}
            </div>

            <div className="lg:w-1/2">
              <Label
                htmlFor="date"
                value="Date Of Report"
                className="text-lg"
              />
              <Datepicker
                id="date"
                name="date"
                required
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)} // Handle date selection
                className="form-input"
              />
            </div>
          </div>

          {/* second row */}
          <div className="flex gap-8">
            <div className="lg:w-1/2">
              <Label htmlFor="name" value="Patient Name" className="text-lg" />
              <TextInput
                id="patientName"
                name="patientName"
                type="text"
                placeholder="Patient Name"
                defaultValue={reportDetails.patientName}
                required
                onChange={(e) => validateInput("name", e.target.value)}
                minLength={3}
                maxLength={30}
              />
              {errors.name && (
                <div className="font-semibold text-red-600">{errors.name}</div>
              )}
            </div>

            <div className="lg:w-1/2">
              <Label
                htmlFor="category"
                value="Report Category"
                className="text-lg"
              />
              <Select
                id="category"
                name="category"
                className="w-full rounded"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {category.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          {/* last row */}
          <div className="flex gap-8">
            <div className="lg:w-1/2">
              <Label
                htmlFor="description"
                value="Report Description"
                className="text-lg"
              />
              <Textarea
                id="description"
                name="description"
                defaultValue={reportDetails.description}
                placeholder="Write your report description..."
                required
                onChange={(e) => validateInput("description", e.target.value)}
                rows={7}
                maxLength={1000}
              />
              {errors.description && (
                <div className="font-semibold text-red-600">
                  {errors.description}
                </div>
              )}
            </div>

            <div className="lg:w-1/2">
              <div className="block mb-2">
                <Label
                  htmlFor="image"
                  value="Report Image"
                  className="text-lg"
                />
                <div>
                  {postImage && (
                    <div className="mb-4">
                      <img
                        src={postImage}
                        alt="Current report"
                        className="object-cover w-20 h-20 rounded-md shadow-lg"
                      />
                    </div>
                  )}
                  <input
                    className="mt-4 bg-black"
                    type="file"
                    label="Image"
                    name="image"
                    id="file-upload"
                    accept=".jpeg,.png,.jpg"
                    onChange={handleFileUpload}
                  />
                  {loading && (
                    <div className="flex items-center mt-2">
                      <Spinner size="md" color="blue" />
                      <span className="ml-2">Uploading...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={
              loading ||
              Object.keys(errors).some((key) => errors[key])
            }
            className="mt-2 bg-red-500 shadow-lg w-60"
          >
            <p className="text-lg font-bold">Update Report</p>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateReport;
