import React from "react";

const InsuranceDetailsForm = ({ insuranceDetails, setInsuranceDetails, handlePaymentSubmit }) => {
    return (
        <div>
            <h3 className="text-lg font-medium mb-3">Enter Insurance Details</h3>
            <div className="space-y-4">
                <label className="block">
                    <span className="text-gray-700">Provider:</span>
                    <input
                        type="text"
                        value={insuranceDetails.provider}
                        onChange={(e) =>
                            setInsuranceDetails({
                                ...insuranceDetails,
                                provider: e.target.value,
                            })
                        }
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Policy Number:</span>
                    <input
                        type="text"
                        value={insuranceDetails.policyNumber}
                        onChange={(e) =>
                            setInsuranceDetails({
                                ...insuranceDetails,
                                policyNumber: e.target.value,
                            })
                        }
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                </label>
                <button
                    onClick={handlePaymentSubmit}
                    className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default InsuranceDetailsForm;