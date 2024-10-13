import React from "react";

const PaymentSuccessMessage = ({ paymentAmount, handleDownloadReceipt }) => {
    return (
        <div className="text-center">
            <h1 className="text-3xl font-bold text-green-600">
                Thank you for your payment!
            </h1>
            <p className="mt-4 text-lg text-gray-700">
                Your payment of Rs.{paymentAmount} has been successfully processed.
            </p>
            <button
                onClick={handleDownloadReceipt}
                className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
                Download PDF Receipt
            </button>
        </div>
    );
};

export default PaymentSuccessMessage;