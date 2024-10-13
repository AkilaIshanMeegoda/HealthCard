import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import dayjs from "dayjs";

const Payments = () => {
  const { user } = useAuthContext();
  const [paymentData, setPaymentData] = useState([]);
  const [totalPayments, setTotalPayments] = useState(0);
  const [pendingPayments, setPendingPayments] = useState(0);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/payment/fetch-all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await response.json();

        // Check if data is an array or wrapped in an object
        const paymentsArray = Array.isArray(data) ? data : [];

        const paymentPendingCount = paymentsArray.filter((payment) => payment.paymentStatus === "pending").length;

        if (paymentsArray) {
          setTotalPayments(paymentsArray.length);
          setPaymentData(paymentsArray);
          setPendingPayments(paymentPendingCount);
        }
      } catch (error) {
        console.error("Error fetching payments: ", error)
        console.log("Error fetching payments");
      }
    };

    fetchPayments();
  }, [user]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full">
      {/* Top Summary Section */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
          <h2 className="text-xl font-bold">Total Payment</h2>
          <p className="text-3xl font-bold">{totalPayments}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
          <h2 className="text-xl font-bold">Total Pending Payment</h2>
          <p className="text-3xl font-bold">{pendingPayments}</p>
        </div>
      </div>

      {/* Payment Transaction History Table */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Payment Transaction History</h3>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-200 text-left text-sm font-bold">
                {/* <th className="p-4">ID</th> */}
                {/* <th className="p-4">Patient Name</th> */}
                <th className="p-4">Date of Payment</th>
                <th className="p-4">Payment Method</th>
                <th className="p-4">Payment Amount</th>
                <th className="p-4">Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentData.map((payment, index) => (
                <tr key={index} className="border-t">
                  {/* <td className="p-4">{payment.id}</td> */}
                  {/* <td className="p-4">{payment.appointmentId.userName}</td> */}
                  <td className="p-4">{dayjs(payment.createdAt).format("YYYY-MM-DD, HH:mm:ss")}</td>
                  <td className="p-4">{payment.paymentMethod}</td>
                  <td className="p-4">{payment.amount}</td>
                  <td className={`p-4 ${payment.paymentStatus === "pending" ? "text-red-500" : "text-green-500"}`}>{payment.paymentStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payments;