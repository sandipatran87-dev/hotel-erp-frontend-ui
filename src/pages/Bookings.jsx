import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Bookings() {

    const [bookings, setBookings] = useState([]);

    const navigate = useNavigate();


    // =========================
    // GET ALL BOOKINGS
    // =========================
    const getBookings = () => {

        api.get("/bookings")
            .then((res) => {

                setBookings(res.data);

            })
            .catch((err) => {

                console.log(
                    "Get Bookings Error:",
                    err
                );

            });

    };


    // =========================
    // DELETE BOOKING
    // =========================
    const deleteBooking = (bookingId) => {

        if (!window.confirm("Delete this booking?")) {
            return;
        }

        api.delete(`/bookings/${bookingId}`)
            .then(() => {

                alert(
                    "Booking Deleted Successfully"
                );

                getBookings();

            })
            .catch((err) => {

                console.log(
                    "Delete Booking Error:",
                    err
                );

                alert(
                    "Failed to delete booking"
                );

            });

    };


    // =========================
    // GENERATE ROOM BILL
    // =========================
    const generateRoomBill = async (bookingId) => {

        try {

            const res = await api.post(
                `/bills/room/${bookingId}`
            );

            console.log(
                "Room Bill Created:",
                res.data
            );

            const billId = res.data.billId;

            // Go to existing Payment page
            navigate(`/payment/${billId}`);

        } catch (error) {

            console.log(
                "Room Bill Generation Error:",
                error
            );

            alert(
                "Failed to generate room bill"
            );

        }

    };


    // =========================
    // LOAD BOOKINGS
    // =========================
    useEffect(() => {

        getBookings();

    }, []);


    return (

        <div className="container-fluid p-4">

            <h2 className="mb-4">
                📖 Booking Management
            </h2>


            <div className="card shadow">

                <div className="card-body">

                    <div className="table-responsive">

                        <table className="table table-bordered table-hover">

                            <thead className="table-dark">

                                <tr>

                                    <th>Customer</th>

                                    <th>Room</th>

                                    <th>Check In</th>

                                    <th>Check Out</th>

                                    <th>Days</th>

                                    <th>Amount</th>

                                    <th>Status</th>

                                    <th>Action</th>

                                </tr>

                            </thead>


                            <tbody>

                                {bookings.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="8"
                                            className="text-center"
                                        >
                                            No Bookings Found
                                        </td>

                                    </tr>

                                ) : (

                                    bookings.map((booking) => (

                                        <tr
                                            key={booking.bookingId}
                                        >

                                            {/* CUSTOMER */}

                                            <td>

                                                {booking.customer?.firstName}{" "}
                                                {booking.customer?.lastName}

                                            </td>


                                            {/* ROOM */}

                                            <td>

                                                {booking.room?.roomNumber}

                                            </td>


                                            {/* CHECK IN */}

                                            <td>

                                                {booking.checkInDate}

                                            </td>


                                            {/* CHECK OUT */}

                                            <td>

                                                {booking.checkOutDate}

                                            </td>


                                            {/* TOTAL DAYS */}

                                            <td>

                                                {booking.totalDays}

                                            </td>


                                            {/* TOTAL AMOUNT */}

                                            <td>

                                                ₹ {Number(
                                                    booking.totalAmount || 0
                                                ).toLocaleString(
                                                    "en-IN"
                                                )}

                                            </td>


                                            {/* BOOKING STATUS */}

                                            <td>

                                                <span
                                                    className={
                                                        booking.bookingStatus === "COMPLETED"
                                                            ? "badge bg-secondary"
                                                            : "badge bg-success"
                                                    }
                                                >

                                                    {booking.bookingStatus}

                                                </span>

                                            </td>


                                            {/* ACTION */}
<td>

    {booking.bookingStatus === "BOOKED" ? (

        <button
            className="btn btn-success btn-sm me-2"
            onClick={() => generateRoomBill(booking.bookingId)}
        >
            💳 Checkout & Pay
        </button>

    ) : (

        <button
            className="btn btn-secondary btn-sm me-2"
            disabled
        >
            ✅ Paid
        </button>

    )}

    <button
        className="btn btn-danger btn-sm"
        onClick={() => deleteBooking(booking.bookingId)}
    >
        🗑 Delete
    </button>

</td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    );

}