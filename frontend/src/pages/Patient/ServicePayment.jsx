import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuthContext } from "../../hooks/useAuthContext";
import Navbar from "../../components/home/Navbar/Navbar";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import logo from "../../images/logo.png";

const ServicePayment = () => {
    const { id } = useParams();
    const { user } = useAuthContext();

    const [paymentAmount, setPaymentAmount] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [paymentSuccessful, setPaymentSuccessful] = useState(false);
    const [appointmentDetails, setAppointmentDetails] = useState({});
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
            fetch(`http://localhost:3000/labappointment/hospital-appointment/${id}`, {
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
                    const serviceData = JSON.parse(data);
                    setPaymentAmount(serviceData.paymentAmount || "");
                    setAppointmentDetails(serviceData);
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
            const response = await fetch("http://localhost:3000/api/payment/add-service", {
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

            // Set paymentSuccessful to true when payment is completed
            setPaymentSuccessful(true);
        } catch (error) {
            console.error("Error submitting payment:", error);
            toast.error("Failed to submit payment.");
        }
    };

    const handleDownloadReceipt = async () => {
        const doc = new jsPDF();

        const loadImage = (src) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = src;
                img.onload = () => resolve(img);
                img.onerror = reject;
            });
        };

        // Get the current date
        const currentDate = new Date().toLocaleDateString();

        try {
            const logoImage = await loadImage(logo);

            // Add system logo to the PDF
            doc.addImage(logoImage, "PNG", 15, 10, 50, 50);

            doc.setFontSize(26);
            doc.text("Payment Receipt", 80, 30);

            const username = appointmentDetails.userName || "N/A";
            const doctorName = appointmentDetails.doctorName || "N/A";
            const appointmentDate = appointmentDetails.date || "N/A";
            const paymentAmount = appointmentDetails.paymentAmount || "N/A";
            const payMethod = paymentMethod || "N/A";

            // Bold text for labels
            doc.setFont("helvetica", "bold");
            doc.setFontSize(16);
            doc.text("Appointment ID:", 15, 80);
            doc.text("Patient Name:", 15, 90);
            doc.text("Doctor Name:", 15, 100);
            doc.text("Appointment Date:", 15, 110);
            doc.text("Amount Paid:", 15, 120);
            doc.text("Payment Method:", 15, 130);

            // Normal text for the values
            doc.setFont("helvetica", "normal");
            doc.setFontSize(16);
            doc.text(`${id}`, 60, 80);
            doc.text(`${username}`, 55, 90);
            doc.text(`${doctorName}`, 55, 100);
            doc.text(`${appointmentDate}`, 70, 110);
            doc.text(`${paymentAmount}`, 55, 120);
            doc.text(`${payMethod}`, 65, 130);
            
            doc.text("Thank you for your appointment and payment.", 15, 150);

            doc.setFontSize(11);
            doc.text(`Receipt Generated Date: ${currentDate}`, 15, 170);

            doc.save(`payment_receipt_${id}.pdf`);
        } catch (error) {
            console.error("Error generating PDF or loading image: ", error);
            console.log("Error generating PDF or loading image");
        }
    }

    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-6">
                {paymentSuccessful ? (
                    // Display the Thank you message when payment is successful
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
                ) : (
                    // Show payment form if paymentSuccessful is false
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
                    </>
                )}
            </div>
        </div>
    );
};

export default ServicePayment;