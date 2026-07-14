import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

export default function Payment() {

    const { billId } = useParams();
    const navigate = useNavigate();

    const [bill, setBill] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("CASH");
    const [loading, setLoading] = useState(false);

    // ==========================
    // Load Bill
    // ==========================

    useEffect(() => {

        api.get(`/bills/${billId}`)
            .then((res) => {

                setBill(res.data);

            })
            .catch((err) => {

                console.log(err);

            });

    }, [billId]);

    // ==========================
    // Make Payment
    // ==========================

    const makePayment = () => {

        if (!bill) return;

        setLoading(true);

        const body = {

            bill: {
                billId: bill.billId
            },

            amount: bill.grandTotal,

            paymentMethod: paymentMethod

        };

        api.post("/payments", body)

            .then(() => {

                alert("✅ Payment Successful");

                navigate(`/bill/${bill.billId}`);

            })

            .catch((err) => {

                console.log(err);

                alert("Payment Failed");

            })

            .finally(() => {

                setLoading(false);

            });

    };

    if (!bill) {

        return (

            <div className="container mt-5 text-center">

                <h4>Loading Payment...</h4>

            </div>

        );

    }

    return (

        <div className="container py-4">

            <button
                className="btn btn-dark mb-3"
                onClick={() => navigate(-1)}
            >
                ← Back
            </button>

            <div className="card shadow-lg">

                <div className="card-header bg-success text-white">

                    <h3 className="mb-0">

                        💳 Payment

                    </h3>

                </div>

                <div className="card-body">

                    <div className="mb-3">

                        <label className="form-label fw-bold">

                            Invoice No

                        </label>

                        <input
                            className="form-control"
                            value={bill.billId}
                            readOnly
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label fw-bold">

                            Bill Type

                        </label>

                        <input
                            className="form-control"
                            value={bill.billType}
                            readOnly
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label fw-bold">

                            Amount

                        </label>

                        <input
                            className="form-control"
                            value={`₹ ${Number(bill.grandTotal).toFixed(2)}`}
                            readOnly
                        />

                    </div>

                    <div className="mb-4">

                        <label className="form-label fw-bold">

                            Payment Method

                        </label>

                        <select
                            className="form-select"
                            value={paymentMethod}
                            onChange={(e) =>
                                setPaymentMethod(e.target.value)
                            }
                        >

                            <option value="CASH">CASH</option>

                            <option value="CARD">CARD</option>

                            <option value="UPI">UPI</option>

                            <option value="NET_BANKING">
                                NET BANKING
                            </option>

                        </select>

                    </div>

                    <button

                        className="btn btn-success btn-lg w-100"

                        onClick={makePayment}

                        disabled={loading}

                    >

                        {

                            loading

                                ? "Processing..."

                                : "💳 Make Payment"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

}