import React from "react";

const PaymentForm = ({ paymentAmount, paymentMethod, setPaymentMethod, children }) => {
    return (
        <>
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
                Payment Amount: <span className="text-green-600">Rs.{paymentAmount}</span>
            </h1>
            <div className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>
                <div className="flex justify-between mb-4">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="debit_card"
                            checked={paymentMethod === "debit_card"}
                            onChange={() => setPaymentMethod("debit_card")}
                            className="mr-2 text-green-600 focus:ring-green-500"
                        />
                        Debit Card
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="insurance"
                            checked={paymentMethod === "insurance"}
                            onChange={() => setPaymentMethod("insurance")}
                            className="mr-2 text-green-600 focus:ring-green-500"
                        />
                        Insurance
                    </label>
                </div>
                {children}
            </div>
        </>
    );
};

export default PaymentForm;