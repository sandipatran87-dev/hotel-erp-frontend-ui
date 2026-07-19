import { useEffect, useState } from "react";
import api from "../services/api";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

export default function Dashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [reservationData, setReservationData] = useState([]);
    const [allBookings, setAllBookings] = useState([]);
    const [chartFilter, setChartFilter] = useState("weekly");
    const [restaurantBookings, setRestaurantBookings] = useState([]);

    const [todayRevenue, setTodayRevenue] = useState(0);
    const [monthlyRevenue, setMonthlyRevenue] = useState(0);

    const [payments, setPayments] = useState([]);
    const [bills, setBills] = useState([]);
    const [customers, setCustomers] = useState([]);

    const navigate = useNavigate();

    const [rooms, setRooms] = useState([]);

    // FIRST useEffect
   useEffect(() => {

    api.get("/dashboard")
        .then((res) => {
            setDashboard(res.data);
        })
        .catch((err) => {
            console.log("Dashboard error:", err);
        });

    api.get("/reports/room-bookings")
        .then((res) => {
            setAllBookings(res.data);
        })
        .catch((err) => {
            console.log("Booking report error:", err);
        });

}, []);



    // third 

    api.get("/reports/restaurant-bookings")
    .then((res) => {
        setRestaurantBookings(res.data);
    })
    .catch((err) => {
        console.log("Restaurant booking error:", err);
    });



// fourth 

api.get("/reports/revenue/today")
    .then((res) => {
        setTodayRevenue(res.data || 0);
    })
    .catch((err) => {
        console.log("Today revenue error:", err);
    });

api.get("/reports/revenue/monthly")
    .then((res) => {
        setMonthlyRevenue(res.data || 0);
    })
    .catch((err) => {
        console.log("Monthly revenue error:", err);
    });


    // fift 

    api.get("/reports/payments")
    .then((res) => {
        setPayments(res.data);
    })
    .catch((err) => {
        console.log("Payments report error:", err);
    });


    // six 
    api.get("/reports/bills")
    .then((res) => {
        setBills(res.data);
    })
    .catch((err) => {
        console.log("Bills report error:", err);
    });


    // seven 

    api.get("/reports/customers")
    .then((res) => {
        setCustomers(res.data);
    })
    .catch((err) => {
        console.log("Customer report error:", err);
    });



    // SECOND useEffect
    useEffect(() => {

        if (allBookings.length === 0) {
            setReservationData([]);
            return;
        }

        const groupedData = {};

        if (chartFilter === "weekly") {

            allBookings.forEach((booking) => {

                const date = booking.checkInDate;

                if (groupedData[date]) {
                    groupedData[date] += 1;
                } else {
                    groupedData[date] = 1;
                }

            });

            const chartData = Object.keys(groupedData)
                .sort()
                .map((date) => ({
                    day: date,
                    bookings: groupedData[date]
                }));

            setReservationData(chartData);

        } else {

            allBookings.forEach((booking) => {

                const date = new Date(
                    booking.checkInDate + "T00:00:00"
                );

                const month = date.toLocaleDateString(
                    "en-IN",
                    {
                        month: "short",
                        year: "numeric"
                    }
                );

                if (groupedData[month]) {
                    groupedData[month] += 1;
                } else {
                    groupedData[month] = 1;
                }

            });

            const chartData = Object.keys(groupedData)
                .map((month) => ({
                    day: month,
                    bookings: groupedData[month]
                }));

            setReservationData(chartData);
        }

    }, [chartFilter, allBookings]);



// table 
const [restaurantTables, setRestaurantTables] = useState([]);

useEffect(() => {

    api.get("/restaurant-tables")

        .then(res => setRestaurantTables(res.data));

}, []);

// room

useEffect(() => {

    api.get("/rooms")
        .then((res) => {
            setRooms(res.data);
        })
        .catch((err) => {
            console.log(err);
        });

}, []);


    // count pay 

    const cashPayments = payments.filter(
    (payment) => payment.paymentMethod === "CASH"
);

const upiPayments = payments.filter(
    (payment) => payment.paymentMethod === "UPI"
);

const cashAmount = cashPayments.reduce(
    (total, payment) => total + Number(payment.amount || 0),
    0
);

const upiAmount = upiPayments.reduce(
    (total, payment) => total + Number(payment.amount || 0),
    0
);

   //-----------

   const paidBills = bills.filter(
    (bill) => bill.billStatus === "PAID"
);

const unpaidBills = bills.filter(
    (bill) => bill.billStatus === "UNPAID"
);

const totalBillAmount = bills.reduce(
    (total, bill) => total + Number(bill.grandTotal || 0),
    0
);



//-------

const topCustomers = [...customers]
    .sort((a, b) => {

        const activityA =
            Number(a.totalRoomBookings || 0) +
            Number(a.totalRestaurantBookings || 0);

        const activityB =
            Number(b.totalRoomBookings || 0) +
            Number(b.totalRestaurantBookings || 0);

        return activityB - activityA;

    })
    .slice(0, 5);


    if (!dashboard) {

        return (

            <div className="container mt-5 text-center">

                <h3>Loading Dashboard...</h3>

            </div>

        );

    }


    return (

       <div className="hotel-dashboard">

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

<div className="dashboard-summary-row">

    <div className="summary-card">
        <div className="summary-icon">🛏</div>
        <div>
            <p>AVAILABLE ROOMS</p>
            <h2>{dashboard.availableRooms}</h2>
        </div>
    </div>

    <div className="summary-card">
        <div className="summary-icon">🏨</div>
        <div>
            <p>BOOKED ROOMS</p>
            <h2>{dashboard.bookedRooms}</h2>
        </div>
    </div>

    <div className="summary-card">
        <div className="summary-icon">🍽</div>
        <div>
            <p>AVAILABLE TABLES</p>
            <h2>{dashboard.availableTables}</h2>
        </div>
    </div>

    <div className="summary-card">
        <div className="summary-icon">💰</div>
        <div>
            <p>TOTAL REVENUE</p>
            <h2>
                ₹ {Number(dashboard.totalRevenue || 0).toLocaleString("en-IN")}
            </h2>
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
            
                
<div className="dashboard-middle-row">

    {/* LEFT - Reservation Chart */}
    <div className="dashboard-chart-card">

        <div className="chart-header">
            <div>
                <h5>RESERVATION OVERVIEW</h5>
                <p>
                    {chartFilter === "weekly"
                        ? "Room booking activity by date"
                        : "Monthly room booking activity"}
                </p>
            </div>

            <div className="chart-filter">
                <button
                    className={chartFilter === "weekly" ? "active" : ""}
                    onClick={() => setChartFilter("weekly")}
                >
                    Weekly
                </button>

                <button
                    className={chartFilter === "monthly" ? "active" : ""}
                    onClick={() => setChartFilter("monthly")}
                >
                    Monthly
                </button>
            </div>
        </div>

        <div className="chart-container">
            <ResponsiveContainer width="100%" height={250}>

                <AreaChart data={reservationData}>

                    <defs>
                        <linearGradient
                            id="bookingGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="5%"
                                stopColor="#10b981"
                                stopOpacity={0.7}
                            />

                            <stop
                                offset="95%"
                                stopColor="#10b981"
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>

                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#2a3446"
                    />

                    <XAxis
                        dataKey="day"
                        stroke="#8b95a7"
                    />

                    <YAxis
                        stroke="#8b95a7"
                        allowDecimals={false}
                    />

                    <Tooltip />

                    <Area
                        type="monotone"
                        dataKey="bookings"
                        stroke="#10b981"
                        strokeWidth={3}
                        fill="url(#bookingGradient)"
                    />

                </AreaChart>

            </ResponsiveContainer>



        </div>

       
                {/* ----------------*/}

                <h5 className="text-center mb-3">
    🍽 Table Availability
</h5>

<div className="table-grid">

    {restaurantTables.map((table) => (

        <div
            key={table.tableId}
            className={`table-box ${
                table.tableStatus === "AVAILABLE"
                    ? "free"
                    : "occupied"
            }`}
        >
            {table.tableNumber}
        </div>

    ))}




</div>

<div>
<br></br>
<br></br>

</div>

{/*-------------*/}



    <div className="card-header bg-dark text-white">
        <h4 className="mb-0">🛏 Room Availability</h4>
    </div>
<br></br>
<div className="room-grid">

    {rooms.map((room) => (

        <div
            key={room.roomId}
            className={`room-box ${
                room.roomStatus === "AVAILABLE"
                    ? "available"
                    : room.roomStatus === "BOOKED"
                    ? "booked"
                    : "maintenance"
            }`}
        >
            <div className="room-number">
                {room.roomNumber}
            </div>

            <div className="room-status">
                {room.roomStatus}
            </div>

        </div>

    ))}

</div>

 
    </div>


    {/* RIGHT - Table Availability */}
    <div className="table-availability-card">

        <div className="table-card-header">
            <div>
                <h5>TABLE AVAILABILITY</h5>
                <p>Current restaurant table status</p>
            </div>

            <span className="table-icon">
                🍽
            </span>
        </div>

        <div className="table-status-grid">

            <div className="table-status-box">
                <h2>
                    {dashboard.availableTables}
                </h2>

                <p>Available Tables</p>
            </div>

            <div className="table-status-box">
                <h2>
                    {dashboard.bookedTables}
                </h2>

                <p>Booked Tables</p>
            </div>

        </div>



        {/*---------*/}
        
<div className="revenue-analytics-row">

    <div className="revenue-box">

        <div className="revenue-box-icon">
            💰
        </div>

        <div>
            <p>TODAY'S REVENUE</p>

            <h2>
                ₹ {Number(todayRevenue || 0)
                    .toLocaleString("en-IN")}
            </h2>
        </div>

    </div>


    <div className="revenue-box">

        <div className="revenue-box-icon">
            📈
        </div>

        <div>
            <p>MONTHLY REVENUE</p>

            <h2>
                ₹ {Number(monthlyRevenue || 0)
                    .toLocaleString("en-IN")}
            </h2>
        </div>

    </div>


    <div className="revenue-box">

        <div className="revenue-box-icon">
            💳
        </div>

        <div>
            <p>TOTAL REVENUE</p>

            <h2>
                ₹ {Number(dashboard.totalRevenue || 0)
                    .toLocaleString("en-IN")}
            </h2>
        </div>

    </div>

</div>


  { /*------------*/}




<div className="payment-analytics-card">

    <div className="payment-analytics-header">
        <div>
            <h5>PAYMENT ANALYTICS</h5>
            <p>Revenue by payment method</p>
        </div>

        <span>💳</span>
    </div>

    <div className="payment-method-grid">

        <div className="payment-method-box">
            <div className="payment-method-icon">
                💵
            </div>

            <div>
                <p>CASH PAYMENTS</p>

                <h2>
                    ₹ {cashAmount.toLocaleString("en-IN")}
                </h2>

                <span>
                    {cashPayments.length} Transactions
                </span>
            </div>
        </div>


        <div className="payment-method-box">
            <div className="payment-method-icon">
                📱
            </div>

            <div>
                <p>UPI PAYMENTS</p>

                <h2>
                    ₹ {upiAmount.toLocaleString("en-IN")}
                </h2>

                <span>
                    {upiPayments.length} Transactions
                </span>
            </div>
        </div>

    </div>

</div>




{/*----------*/}



<div className="bills-analytics-card">

    <div className="bills-analytics-header">

        <div>
            <h5>BILLS ANALYTICS</h5>
            <p>Current billing overview</p>
        </div>

        <span>🧾</span>

    </div>

    <div className="bills-stats-grid">

        <div className="bill-stat-box">

            <p>PAID BILLS</p>

            <h2 className="bill-paid">
                {paidBills.length}
            </h2>

        </div>

        <div className="bill-stat-box">

            <p>UNPAID BILLS</p>

            <h2 className="bill-unpaid">
                {unpaidBills.length}
            </h2>

        </div>

        <div className="bill-stat-box">

            <p>TOTAL BILL AMOUNT</p>

            <h2>
                ₹ {totalBillAmount.toLocaleString("en-IN")}
            </h2>

        </div>

    </div>

</div>


        






    </div>

</div>


<div className="dashboard-two-column">

    {/* LEFT SIDE - Restaurant Bookings */}
    <div className="restaurant-booking-card">

        <div className="restaurant-booking-header">
            <div>
                <h5>RECENT RESTAURANT BOOKINGS</h5>
                <p>Latest restaurant table reservations</p>
            </div>

            <button
                onClick={() => navigate("/restaurant-tables")}
                className="view-all-btn"
            >
                View All
            </button>
        </div>

        <div className="table-responsive">

            <table className="restaurant-report-table">

                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Table</th>
                        <th>Date</th>
                        <th>Guests</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>

                    {restaurantBookings
                        .slice(-5)
                        .reverse()
                        .map((booking) => (

                            <tr key={booking.restaurantBookingId}>

                                <td>{booking.customerName}</td>

                                <td>{booking.tableNumber}</td>

                                <td>{booking.bookingDate}</td>

                                <td>{booking.guests}</td>

                                <td>
                                    <span
                                        className={
                                            booking.bookingStatus === "COMPLETED"
                                                ? "status-completed"
                                                : "status-booked"
                                        }
                                    >
                                        {booking.bookingStatus}
                                    </span>
                                </td>

                            </tr>

                        ))}

                </tbody>

            </table>

        </div>

    </div>


    {/* RIGHT SIDE - Top Customers */}
    <div className="customer-activity-card">

        <div className="customer-activity-header">

            <div>
                <h5>TOP CUSTOMERS</h5>
                <p>Most active customers based on bookings</p>
            </div>

            <button
                className="view-all-btn"
                onClick={() => navigate("/customers")}
            >
                View Customers
            </button>

        </div>

        <div className="table-responsive">

            <table className="customer-activity-table">

                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Room</th>
                        <th>Restaurant</th>
                        <th>Bills</th>
                    </tr>
                </thead>

                <tbody>

                    {topCustomers.map((customer) => (

                        <tr key={customer.customerId}>

                            <td>
                                <strong>
                                    {customer.customerName}
                                </strong>
                            </td>

                            <td>
                                {customer.totalRoomBookings}
                            </td>

                            <td>
                                {customer.totalRestaurantBookings}
                            </td>

                            <td>
                                {customer.totalBills}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    </div>

</div>




        </div>

    );

}