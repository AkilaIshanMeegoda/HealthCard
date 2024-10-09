import React from "react";
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import { Card, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ServiceCard = ({ service, onDelete = () => {} }) => {
  const navigate = useNavigate();

  // Navigate to the edit service page
  const handleEditClick = () => {
    navigate(`/admin/addDashboard/edit-service/${service._id}`);
  };

  // Handle delete service action
  const handleDeleteClick = async () => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await axios.delete(`http://localhost:3000/api/services/${service._id}`);
        toast.success("Service deleted successfully!", {
          position: "bottom-right",
          theme: "colored",
        });
        onDelete(service._id); // Call onDelete to remove the service from the UI
      } catch (error) {
        console.error("Error deleting service:", error);
        toast.error("Failed to delete service.");
      }
    }
  };

  return (
    <Card className="max-w-sm">
      <img 
        src={service.image} 
        alt={`${service.serviceName}`} 
        className="h-40 object-cover" 
      />
      <h5 className="text-xl font-bold tracking-tight text-gray-900">
        {service.serviceName}
      </h5>
      <p className="text-gray-500">
        Price: ${service.price}
      </p>
      <p className="text-gray-700">
        {service.description}
      </p>
      <div className="button-container flex justify-between mt-4">
        <Button
          onClick={handleEditClick}
          color="blue"
          className="flex-1 mr-2"
        >
          Edit
        </Button>
        <Button
          onClick={handleDeleteClick}
          color="red"
          className="flex-1 ml-2"
        >
          Delete
        </Button>
      </div>
    </Card>
  );
};

// PropTypes validation
ServiceCard.propTypes = {
  service: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    serviceName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onDelete: PropTypes.func, // onDelete should be a function
};

export default ServiceCard;
