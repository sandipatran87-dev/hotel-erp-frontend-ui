import { useEffect, useState } from "react";
import api from "../services/api";

export default function Reports() {

    const [revenue, setRevenue] = useState({
        totalRevenue: 0,
        totalPayments: 0,
        totalBills: 0
    });

    useEffect(() => {

        api.get("/reports/revenue")
            .then((res) => {
                setRevenue(res.data);
            })
            .catch((error) => {
                console.error("Error loading report:", error);
            });

    }, []);

    return (
        <div className="container-fluid">

            <h2 className="fw-bold mb-4">
                📊 Reports Dashboard
            </h2>

            <div className="row g-4">

                <div className="col-md-4">
                    <div className="card shadow border-0">
                        <div className="card-body text-center">
                            <h5>💰 Total Revenue</h5>
                            <h2>
                                ₹ {Number(revenue.totalRevenue || 0).toLocaleString("en-IN")}
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow border-0">
                        <div className="card-body text-center">
                            <h5>💳 Total Payments</h5>
                            <h2>{revenue.totalPayments}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow border-0">
                        <div className="card-body text-center">
                            <h5>🧾 Total Bills</h5>
                            <h2>{revenue.totalBills}</h2>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}