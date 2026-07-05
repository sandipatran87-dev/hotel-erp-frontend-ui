import { useEffect, useState } from "react";
import api from "../services/api";

export default function Bookings() {

    const [bookings, setBookings] = useState([]);

    const getBookings = () => {

        api.get("/bookings")
            .then((res) => {

                setBookings(res.data);

            })
            .catch((err) => {

                console.log(err);

            });

    };

    const deleteBooking = (bookingId) => {

    if (!window.confirm("Delete this booking?")) {
        return;
    }

    api.delete(`/bookings/${bookingId}`)
        .then(() => {

            alert("Booking Deleted Successfully");

            getBookings();

        })
        .catch((err) => {

            console.log(err);

        });

};

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

                </tr>

            </thead>

            <tbody>

                {bookings.map((booking) => (

                    <tr key={booking.bookingId}>

                        <td>

                            {booking.customer.firstName}{" "}
                            {booking.customer.lastName}

                        </td>

                        <td>

                            {booking.room.roomNumber}

                        </td>

                        <td>

                            {booking.checkInDate}

                        </td>

                        <td>

                            {booking.checkOutDate}

                        </td>

                        <td>

                            {booking.totalDays}

                        </td>

                        <td>

                            ₹ {booking.totalAmount}

                      </td>

                        <td>

                            <span className="badge bg-success">

                                {booking.bookingStatus}

                            </span>

                            
                            <button className="btn btn-danger btn-sm ms-3"
                             onClick={() => deleteBooking(booking.bookingId)}
                            >
                               🗑 Delete
                            </button>

                        </td>

                    </tr>

                ))}


            </tbody>

 

        </table>



    </div>

   



</div>

        </div>

    );

}