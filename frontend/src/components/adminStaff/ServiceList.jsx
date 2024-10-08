import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext"; // Ensure this path is correct
import ServiceCard from "./../adminStaff/ServiceCard"; // Adjust the import path as needed
import { Spinner } from "flowbite-react"; // Optional spinner for loading state

const ServiceList = () => {
  const { user, loading: authLoading } = useContext(AuthContext); // Destructure loading state
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        if (authLoading) return; // Don't fetch until the auth is done loading

        if (!user || !user.email) {
          setError("User not authenticated");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `http://localhost:3000/api/services/${user.email}`, // Adjust the URL if needed
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }

        const data = await response.json();
        setServices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [user, authLoading]); // Also depend on authLoading state

  // Reset error message before fetching
  useEffect(() => {
    if (!authLoading && !loading && !error) {
      setError(""); // Reset error when data is fetched
    }
  }, [authLoading, loading, error]);

  if (authLoading || loading) {
    return <Spinner color="info" />; // Spinner while waiting for auth or data
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  // Handle service deletion
  const handleDeleteService = (id) => {
    setServices((prevServices) =>
      prevServices.filter((service) => service._id !== id)
    ); // Remove the deleted service from the state
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {services.map((service) => (
        <ServiceCard
          key={service._id}
          service={service}
          onDelete={handleDeleteService} // Pass the delete handler to ServiceCard
        />
      ))}
    </div>
  );
};

export default ServiceList;
