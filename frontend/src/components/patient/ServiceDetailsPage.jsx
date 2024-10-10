import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ServiceDetailsPage = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/services/service/${serviceId}`);
        setService(response.data);
        console.log('Service Details:', response.data);
      } catch (error) {
        console.error('Error fetching service details:', error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [serviceId]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen"><p className="text-xl">Loading...</p></div>;
  }

  if (!service) {
    return <div className="flex justify-center items-center min-h-screen"><p className="text-xl">No service details available.</p></div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex items-center p-6">
          {service.image && (
            <img 
              src={service.image} 
              alt={service.serviceName} 
              className="w-24 h-24 object-cover rounded-full border-2 border-gray-300 mr-6" 
            />
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{service.serviceName}</h1>
            {service.price && <p className="text-gray-600">Price: ${service.price}</p>}
            {service.category && <p className="text-lg font-semibold text-green-600">Category: {service.category}</p>}
          </div>
        </div>
        <div className="px-6 pb-6">
          <h2 className="text-xl font-bold mt-4 mb-2">Description</h2>
          <p className="text-gray-600">{service.description || 'No description available.'}</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsPage;
