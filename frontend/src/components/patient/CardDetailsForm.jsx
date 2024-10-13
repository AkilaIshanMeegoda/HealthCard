import React from "react";

const CardDetailsForm = ({ cardDetails, setCardDetails, handleExpirationDateChange, handlePaymentSubmit }) => {
    return (
        <div>
            <h3 className="text-lg font-medium mb-3">Enter Debit Card Details</h3>
            <div className="space-y-4">
                <label className="block">
                    <span className="text-gray-700">Card Holder Name:</span>
                    <input
                        type="text"
                        value={cardDetails.cardHolderName}
                        onChange={(e) =>
                            setCardDetails({
                                ...cardDetails,
                                cardHolderName: e.target.value,
                            })
                        }
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Card Number:</span>
                    <input
                        type="text"
                        value={cardDetails.cardNumber}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d{0,16}$/.test(value)) {
                                setCardDetails({
                                    ...cardDetails,
                                    cardNumber: value,
                                })
                            }
                        }}
                        maxLength={16}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                </label>
                <div className="flex space-x-4">
                    <label className="block w-1/2">
                        <span className="text-gray-700">Expiration Date:</span>
                        <input
                            type="text"
                            value={cardDetails.expirationDate}
                            onChange={handleExpirationDateChange}
                            placeholder="MM/YY"
                            maxLength={5}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        />
                    </label>
                    <label className="block w-1/2">
                        <span className="text-gray-700">CVV:</span>
                        <input
                            type="number"
                            value={cardDetails.cvv}
                            onChange={(e) => {
                                const value = e.target.value
                                if (/^\d{0,3}$/.test(value)) {
                                    setCardDetails({
                                        ...cardDetails,
                                        cvv: value,
                                    });
                                }
                            }}
                            maxLength={3}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        />
                    </label>
                </div>
                <button
                    onClick={handlePaymentSubmit}
                    className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                >
                    Pay Now
                </button>
            </div>
        </div>
    );
};

export default CardDetailsForm;