import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import { useNavigate } from "react-router-dom";



import Standard from "../assets/rooms/standard.jpg";
import Deluxe from "../assets/rooms/deluxe.jpg";
import SuperDeluxe from "../assets/rooms/super-deluxe.jpg";
import Executive from "../assets/rooms/executive.jpg";
import FamilySuite from "../assets/rooms/family-suite.jpg";
import Presidential from "../assets/rooms/presidential-suite.jpg";

export default function RoomDetails() {

    const navigate = useNavigate();

  const { roomId } = useParams();

  const [room, setRoom] = useState(null);
  const [bookings, setBookings] = useState([]);

  const roomImages = {
    Standard: Standard,
    Deluxe: Deluxe,
    "Super Deluxe": SuperDeluxe,
    Executive: Executive,
    "Family Suite": FamilySuite,
    "Presidential Suite": Presidential
  };
  
const getRoom = () => {

  api.get(`/rooms/${roomId}`)
    .then((res) => {

      setRoom(res.data);

    })
    .catch((err) => {

      console.log(err);

    });

};
const getBookings = () => {

  api.get("/bookings")
    .then((res) => {

      console.log(res.data);

      setBookings(res.data);

    })
    .catch((err) => {

      console.log(err);

    });

};


useEffect(() => {
  getRoom();

  getBookings();

}, [roomId]);

const roomBookings = bookings.filter((booking) => {

    console.log("Booking RoomId :", booking.room.roomId);

    console.log("Current RoomId :", room.roomId);

    return booking.room.roomId === room.roomId;

});

  if (!room) {
    return (
      <div className="container-fluid p-5">
        <h3>Loading...</h3>
      </div>
    );
  }



  return (

    <div className="container-fluid p-4">
<button
  className="btn btn-dark mb-4"
  onClick={() => navigate(-1)}
>
  ← Back
</button>

      <div className="card shadow border-0">

        <div className="row">

          <div className="col-lg-6">

            <img
              src={roomImages[room.roomType.typeName]}
              alt=""
              className="img-fluid w-100"
              style={{
                height: "500px",
                objectFit: "cover"
              }}
            />

          </div>

          <div className="col-lg-6 p-5">

            <h1 className="fw-bold">

              Room {room.roomNumber}

            </h1>

            <h3 className="text-primary">

              {room.roomType.typeName}

            </h3>

            <p className="text-muted">

              {room.roomType.description}

            </p>

            <hr />

            <h5 className="mb-3">

              👥 Capacity :
              <span className="text-primary">
                {" "}
                {room.roomType.maxCapacity} Guests
              </span>

            </h5>

            <h5 className="mb-3">

              💰 Price :
              <span className="text-success">
                {" "}
                ₹ {room.roomType.basePrice}
              </span>

            </h5>

            <h5 className="mb-3">

              📍 Floor :
              <span className="text-dark">
                {" "}
                {room.floorNo}
              </span>

            </h5>

            <h5 className="mb-4">

              Status :

              <span
                className={
                  room.roomStatus === "AVAILABLE"
                    ? "badge bg-success ms-2"
                    : room.roomStatus === "BOOKED"
                    ? "badge bg-danger ms-2"
                    : "badge bg-warning text-dark ms-2"
                }
              >

                {room.roomStatus}

              </span>

            </h5>
{room.roomStatus === "AVAILABLE" ? (

  <Link
    to={`/book-room/${room.roomId}`}
    className="btn btn-success btn-lg px-5"
  >
    📅 Book Room
  </Link>

) : (

  <button
    className="btn btn-secondary btn-lg px-5"
    disabled
  >
    ❌ Room Already Booked
  </button>

)}

          </div>



<div className="card shadow border-0 mt-4">

  <div className="card-body">

    <h3 className="mb-4">
      📖 Booking History
    </h3>

    {roomBookings.length === 0 ? (

      <p className="text-muted">
        No Booking Found
      </p>

    ) : (

      <table className="table table-bordered table-hover">

        <thead className="table-dark">

          <tr>

            <th>Customer</th>

            <th>Check In</th>

            <th>Check Out</th>

            <th>Days</th>

            <th>Amount</th>

            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {roomBookings.map((booking) => (

            <tr key={booking.bookingId}>

              <td>
                {booking.customer.firstName} {booking.customer.lastName}
              </td>

              <td>{booking.checkInDate}</td>

              <td>{booking.checkOutDate}</td>

              <td>{booking.totalDays}</td>

              <td>₹ {booking.totalAmount}</td>

              <td>

                <span className="badge bg-success">

                  {booking.bookingStatus}

                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    )}

  </div>

</div>








        </div>

      </div>

    </div>

  );

}
