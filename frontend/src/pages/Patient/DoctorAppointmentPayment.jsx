import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuthContext } from "../../hooks/useAuthContext";
import Navbar from "../../components/home/Navbar/Navbar";
import PaymentForm from "../../components/patient/PaymentForm";
import CardDetailsForm from "../../components/patient/CardDetailsForm";
import InsuranceDetailsForm from "../../components/patient/InsuranceDetailsForm";
import PaymentSuccessMessage from "../../components/patient/PaymentSuccessMessage";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import logo from "../../images/logo.png";

const DoctorAppointmentPayment = () => {
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
                    setAppointmentDetails(appointmentData);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                    toast.error("Failed to fetch details");
                });
        }
    }, [user]);

    const handleExpirationDateChange = (e) => {
        const value = e.target.value;
        if (/^\d{0,2}\/?\d{0,2}$/.test(value)) {
            if (value.length === 2 && !value.includes("/")) {
                setCardDetails({
                    ...cardDetails,
                    expirationDate: `${value}/`,
                });
            } else {
                setCardDetails({
                    ...cardDetails,
                    expirationDate: value,
                });
            }
        }
    };

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
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                {!paymentSuccessful ? (
                    <PaymentForm
                        paymentAmount={paymentAmount}
                        paymentMethod={paymentMethod}
                        setPaymentMethod={setPaymentMethod}
                    >
                        {paymentMethod === "debit_card" && (
                            <CardDetailsForm
                                cardDetails={cardDetails}
                                setCardDetails={setCardDetails}
                                handleExpirationDateChange={handleExpirationDateChange}
                                handlePaymentSubmit={handlePaymentSubmit}
                            />
                        )}
                        {paymentMethod === "insurance" && (
                            <InsuranceDetailsForm
                                insuranceDetails={insuranceDetails}
                                setInsuranceDetails={setInsuranceDetails}
                                handlePaymentSubmit={handlePaymentSubmit}
                            />
                        )}
                    </PaymentForm>
                ) : (
                    <PaymentSuccessMessage
                        paymentAmount={paymentAmount}
                        handleDownloadReceipt={handleDownloadReceipt}
                    />
                )}
            </div>
        </>
    );
};

export default DoctorAppointmentPayment;