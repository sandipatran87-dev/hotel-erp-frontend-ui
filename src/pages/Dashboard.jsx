import { useEffect, useState } from "react";
import api from "../services/api";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
 
    const [dashboard, setDashboard] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        api.get("/dashboard")

            .then((res) => {

                setDashboard(res.data);

            })

            .catch((err) => {

                console.log(err);

            });

    }, []);

    if (!dashboard) {

        return (

            <div className="container mt-5 text-center">

                <h3>Loading Dashboard...</h3>

            </div>

        );

    }

    return (

        <div className="container-fluid py-4">

           <div className="card shadow-sm border-0 mb-4">

    <div className="card-body">

        <div className="d-flex justify-content-between align-items-center">

            <div>

                <h2 className="fw-bold mb-1">

                    👋 Welcome, Admin

                </h2>

                <p className="text-muted mb-0">

                    Horizon Hotel ERP Dashboard

                </p>

            </div>

            <div className="text-end">

                <h5>

                    📅 {new Date().toLocaleDateString()}

                </h5>

            </div>

        </div>

    </div>

</div>

<div className="card shadow-sm border-0 mb-4">

    <div className="card-body">

        <h4 className="mb-3">

            ⚡ Quick Actions

        </h4>

        <div className="row g-3">

            {/* Customers */}

            <div className="col-md-2">

                <button
                    className="btn btn-primary w-100 py-3"
                    onClick={() => navigate("/customers")}
                >
                    👤 <br />
                    Customers
                </button>

            </div>

            {/* Book Room */}

            <div className="col-md-2">

                <button
                    className="btn btn-success w-100 py-3"
                    onClick={() => navigate("/book-room")}
                >
                    🛏 <br />
                    Book Room
                </button>

            </div>

            {/* Restaurant */}

            <div className="col-md-2">

                <button
                    className="btn btn-warning w-100 py-3"
                    onClick={() => navigate("/restaurant-tables")}
                >
                    🍽 <br />
                    Restaurant
                </button>

            </div>

            {/* Menu */}

            <div className="col-md-2">

                <button
                    className="btn btn-secondary w-100 py-3"
                    onClick={() => navigate("/menu-items")}
                >
                    🍜 <br />
                    Menu Items
                </button>

            </div>

            {/* Bills */}

            <div className="col-md-2">

                <button
                    className="btn btn-dark w-100 py-3"
                    onClick={() => navigate("/bills")}
                >
                    🧾 <br />
                    Bills
                </button>

            </div>

            {/* Payments */}

            <div className="col-md-2">

                <button
                    className="btn btn-info w-100 py-3 text-white"
                    onClick={() => navigate("/payments")}
                >
                    💳 <br />
                    Payments
                </button>

            </div>

        </div>

    </div>

</div>
            <div className="row g-4">

                {/* Available Rooms */}

                <div className="col-md-4">

                    <div className="card dashboard-card bg-primary text-white">

                        <div className="card-body text-center">

                            <h5>🛏 Available Rooms</h5>

                            <h2>{dashboard.availableRooms}</h2>

                        </div>

                    </div>

                </div>

                {/* Booked Rooms */}

                <div className="col-md-4">

                    <div className="card dashboard-card bg-success text-white">

                        <div className="card-body text-center">

                            <h5>🏨 Booked Rooms</h5>

                            <h2>{dashboard.bookedRooms}</h2>

                        </div>

                    </div>

                </div>

                {/* Available Tables */}

                <div className="col-md-4">

                    <div className="card dashboard-card bg-warning text-dark">

                        <div className="card-body text-center">

                            <h5>🍽 Available Tables</h5>

                            <h2>{dashboard.availableTables}</h2>

                        </div>

                    </div>

                </div>

                {/* Pending Bills */}

                <div className="col-md-4">

                    <div className="card dashboard-card bg-danger text-white">

                        <div className="card-body text-center">

                            <h5>🧾 Pending Bills</h5>

                            <h2>{dashboard.pendingBills}</h2>

                        </div>

                    </div>

                </div>

                {/* Paid Bills */}

                <div className="col-md-4">

                    <div className="card dashboard-card bg-info text-white">

                        <div className="card-body text-center">

                            <h5>💳 Paid Bills</h5>

                            <h2>{dashboard.paidBills}</h2>

                        </div>

                    </div>

                </div>

                {/* Revenue */}

                <div className="col-md-4">

                    <div className="card dashboard-card bg-dark text-white">

                        <div className="card-body text-center">

                            <h5>💰 Total Revenue</h5>

                            <h2>

                                ₹ {Number(dashboard.totalRevenue).toLocaleString("en-IN", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}

                            </h2>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}