import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuthContext } from "../../hooks/useAuthContext";
import Navbar from "../../components/home/Navbar/Navbar";
import { toast } from "react-toastify";

const AppointmentPayment = () => {
    const { id } = useParams();
    const { user } = useAuthContext();

    const [paymentAmount, setPaymentAmount] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [cardDetails, setCardDetails] = useState({
        cardHolderName: "",
        cardNumber: "",
        expirationDate: "",
        cvv: "",
    });
    const [insuranceDetails, setInsuranceDetails] = useState({
        provider: "",
        policyNumber: "",
    });

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:3000/appointment/hospital-appointment/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(`Error: ${res.status} ${res.statusText}`);
                    }
                    return res.text();
                })
                .then((data) => {
                    console.log("Fetched raw data:", data);
                    const appointmentData = JSON.parse(data);

                    setPaymentAmount(appointmentData.paymentAmount || "");
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                    toast.error("Failed to fetch details");
                });
        }
    }, [user]);

    const handlePaymentSubmit = async () => {
        const payload = {
            appointmentId: id,
            paymentMethod,
            insuranceDetails,
            cardDetails,
        };

        try {
            const response = await fetch("http://localhost:3000/api/payment/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            setInsuranceDetails({
                provider: "",
                policyNumber: "",
            });
            setCardDetails({
                cardHolderName: "",
                cardNumber: "",
                expirationDate: "",
                cvv: "",
            });

            const responseData = await response.json();
            console.log("Payment submitted successfully:", responseData);
            toast.success("Payment submitted successfully!");
        } catch (error) {
            console.error("Error submitting payment:", error);
            toast.error("Failed to submit payment.");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-6">
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

                    {paymentMethod === "debit_card" && (
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
                                        onChange={(e) =>
                                            setCardDetails({
                                                ...cardDetails,
                                                cardNumber: e.target.value,
                                            })
                                        }
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                    />
                                </label>
                                <div className="flex space-x-4">
                                    <label className="block w-1/2">
                                        <span className="text-gray-700">Expiration Date:</span>
                                        <input
                                            type="text"
                                            value={cardDetails.expirationDate}
                                            onChange={(e) =>
                                                setCardDetails({
                                                    ...cardDetails,
                                                    expirationDate: e.target.value,
                                                })
                                            }
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                        />
                                    </label>
                                    <label className="block w-1/2">
                                        <span className="text-gray-700">CVV:</span>
                                        <input
                                            type="text"
                                            value={cardDetails.cvv}
                                            onChange={(e) =>
                                                setCardDetails({
                                                    ...cardDetails,
                                                    cvv: e.target.value,
                                                })
                                            }
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
                    )}

                    {paymentMethod === "insurance" && (
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
                    )}
                </div>
            </div>
        </div>
    );
};

export default AppointmentPayment;
