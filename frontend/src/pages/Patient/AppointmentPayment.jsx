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
            cardDetails
        }

        try {
            const response = await fetch("http://localhost:3000/api/payment/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify(payload)
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
            <h1>Payment Amount : {paymentAmount}</h1>

            <div>
                <h2>Select Payment Method</h2>
                <div>
                    <label>
                        <input
                            type="radio"
                            value="debit_card"
                            checked={paymentMethod === "debit_card"}
                            onChange={() => setPaymentMethod("debit_card")}
                        />
                        Debit Card
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="insurance"
                            checked={paymentMethod === "insurance"}
                            onChange={() => setPaymentMethod("insurance")}
                        />
                        Insurance
                    </label>
                </div>

                {paymentMethod === "debit_card" && (
                    <div>
                        <h3>Enter Debit Card Details</h3>
                        <label>
                            Card Holder Name:
                            <input
                                type="text"
                                value={cardDetails.cardHolderName}
                                onChange={(e) =>
                                    setCardDetails({
                                        ...cardDetails,
                                        cardHolderName: e.target.value,
                                    })
                                }
                            />
                        </label>
                        <br />
                        <label>
                            Card Number:
                            <input
                                type="text"
                                value={cardDetails.cardNumber}
                                onChange={(e) =>
                                    setCardDetails({
                                        ...cardDetails,
                                        cardNumber: e.target.value,
                                    })
                                }
                            />
                        </label>
                        <br />
                        <label>
                            Expiration Date:
                            <input
                                type="text"
                                value={cardDetails.expirationDate}
                                onChange={(e) =>
                                    setCardDetails({
                                        ...cardDetails,
                                        expirationDate: e.target.value,
                                    })
                                }
                            />
                        </label>
                        <br />
                        <label>
                            CVV:
                            <input
                                type="text"
                                value={cardDetails.cvv}
                                onChange={(e) =>
                                    setCardDetails({
                                        ...cardDetails,
                                        cvv: e.target.value,
                                    })
                                }
                            />
                        </label>
                        <br />
                        <button onClick={handlePaymentSubmit}>Pay Now</button>
                    </div>
                )}

                {paymentMethod === "insurance" && (
                    <div>
                        <h3>Enter Insurance Details</h3>
                        <label>
                            Provider:
                            <input
                                type="text"
                                value={insuranceDetails.provider}
                                onChange={(e) =>
                                    setInsuranceDetails({
                                        ...insuranceDetails,
                                        provider: e.target.value,
                                    })
                                }
                            />
                        </label>
                        <br />
                        <label>
                            Policy Number:
                            <input
                                type="text"
                                value={insuranceDetails.policyNumber}
                                onChange={(e) =>
                                    setInsuranceDetails({
                                        ...insuranceDetails,
                                        policyNumber: e.target.value,
                                    })
                                }
                            />
                        </label>
                        <br />
                        <button onClick={handlePaymentSubmit}>Submit</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppointmentPayment;