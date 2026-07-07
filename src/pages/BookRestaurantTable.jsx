import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

export default function BookRestaurantTable() {

    const navigate = useNavigate();

    const { tableId } = useParams();

    const [table, setTable] = useState(null);

    const [customers, setCustomers] = useState([]);

    const [formData, setFormData] = useState({

        customerId: "",

        bookingDate: "",

        bookingTime: "",

        guests: ""

    });

    // =============================
    // Load Table
    // =============================

    const getTable = () => {

        api.get(`/restaurant-tables/${tableId}`)

            .then((res) => {

                setTable(res.data);

            })

            .catch((err) => {

                console.log(err);

            });

    };

    // =============================
    // Load Customers
    // =============================

    const getCustomers = () => {

        api.get("/customers")

            .then((res) => {

                setCustomers(res.data);

            })

            .catch((err) => {

                console.log(err);

            });

    };

    useEffect(() => {

        getTable();

        getCustomers();

    }, []);

    // =============================
    // Handle Change
    // =============================

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };



    // =============================
// Save Booking
// =============================

const saveBooking = () => {

    const booking = {

        customer: {

            customerId: formData.customerId

        },

        restaurantTable: {

            tableId: table.tableId

        },

        bookingDate: formData.bookingDate,

        bookingTime: formData.bookingTime,

        guests: formData.guests

    };

    api.post("/restaurant-bookings", booking)

        .then(() => {

            alert("Restaurant Table Booked Successfully.");

            navigate("/restaurant-tables");

        })

        .catch((err) => {

            console.log(err);

            alert("Booking Failed");

        });

};


    // =============================
// Loading
// =============================

if (!table) {

    return (
        <div className="container p-5">
            <h3>Loading...</h3>
        </div>
    );

}

return (

<div className="container py-4">

    <button
        className="btn btn-dark mb-4"
        onClick={() => navigate(-1)}
    >
        ← Back
    </button>

    <div className="card shadow border-0">

        <div className="card-header bg-primary text-white">

            <h3 className="mb-0">
                🍽 Book Restaurant Table
            </h3>

        </div>

        <div className="card-body">

            <div className="row">

                {/* Table Information */}

                <div className="col-md-5">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body">

                            <h3 className="text-primary fw-bold">

                                {table.tableNumber}

                            </h3>

                            <hr />

                            <h5>

                                👥 Capacity :
                                <span className="text-primary">

                                    {" "}{table.capacity} Seats

                                </span>

                            </h5>

                            <h5 className="mt-3">

                                Status :

                                <span
                                    className={
                                        table.tableStatus === "AVAILABLE"
                                            ? "badge bg-success ms-2"
                                            : table.tableStatus === "RESERVED"
                                            ? "badge bg-warning text-dark ms-2"
                                            : "badge bg-danger ms-2"
                                    }
                                >

                                    {table.tableStatus}

                                </span>

                            </h5>

                        </div>

                    </div>

                </div>

                {/* Booking Form */}

                <div className="col-md-7">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body">

                            <h4 className="mb-4">

                                Customer Information

                            </h4>

                            {/* Customer */}

                            <div className="mb-3">

                                <label className="form-label">

                                    Customer

                                </label>

                                <select
                                    className="form-select"
                                    name="customerId"
                                    value={formData.customerId}
                                    onChange={handleChange}
                                >

                                    <option value="">

                                        Select Customer

                                    </option>

                                    {

                                        customers.map((customer) => (

                                            <option
                                                key={customer.customerId}
                                                value={customer.customerId}
                                            >

                                                {customer.firstName} {customer.lastName}

                                            </option>

                                        ))

                                    }

                                </select>

                            </div>

                            {/* Booking Date */}

                            <div className="mb-3">

                                <label className="form-label">

                                    Booking Date

                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="bookingDate"
                                    value={formData.bookingDate}
                                    onChange={handleChange}
                                />

                            </div>

                            {/* Booking Time */}

                            <div className="mb-3">

                                <label className="form-label">

                                    Booking Time

                                </label>

                                <input
                                    type="time"
                                    className="form-control"
                                    name="bookingTime"
                                    value={formData.bookingTime}
                                    onChange={handleChange}
                                />

                            </div>

                            {/* Guests */}

                            <div className="mb-4">

                                <label className="form-label">

                                    Number Of Guests

                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="guests"
                                    value={formData.guests}
                                    onChange={handleChange}
                                />

                            </div>
<button
    className="btn btn-success btn-lg w-100"
    onClick={saveBooking}
>
    🍽 Confirm Booking
</button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

</div>

);

}