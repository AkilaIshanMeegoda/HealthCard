import React from 'react';
import { QRCode } from 'react-qr-code';

const PatientIdentification = ({ email, qrCodeSize = 256, componentSize = 'max-w-lg' }) => {
  // Generate a unique ID from the email
  const uniqueId = email ? btoa(email) : ''; // Example of generating a unique ID

  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${componentSize} ml-40 p-6`}>
      <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Patient QR Code
      </h5>
      <div className="flex justify-center">
        <QRCode value={uniqueId} size={qrCodeSize} /> {/* Display the QR code with specified size */}
      </div>
      <p className="mt-4 font-normal text-gray-700 dark:text-gray-400 text-sm">
        Scan the QR code to identify the patient.
      </p>
    </div>
  );
};

export default PatientIdentification;
