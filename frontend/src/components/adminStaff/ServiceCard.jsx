import React from "react";
import { Card } from "flowbite-react";

const ServiceCard = ({ service }) => {
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
    </Card>
  );
};

export default ServiceCard;
