
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";


export default function BookRoom() {
  const [totalDays, setTotalDays] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const [room, setRoom] = useState(null);
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

const [booking, setBooking] = useState({
  customerId: "",
  checkInDate: "",
  checkOutDate: ""
});


useEffect(() => {

  api.get(`/rooms/${roomId}`)
    .then(res => setRoom(res.data));

  api.get("/customers")
    .then(res => setCustomers(res.data));

}, [roomId]);


useEffect(() => {

  if (
    booking.checkInDate &&
    booking.checkOutDate &&
    room
  ) {

    const checkIn = new Date(booking.checkInDate);
    const checkOut = new Date(booking.checkOutDate);

    const diff =
      (checkOut - checkIn) /
      (1000 * 60 * 60 * 24);

    if (diff > 0) {

      setTotalDays(diff);

      setTotalAmount(
        diff * room.roomType.basePrice
      );

    } else {

      setTotalDays(0);

      setTotalAmount(0);

    }

  }

}, [
  booking.checkInDate,
  booking.checkOutDate,
  room
]);


  if (!room) {
    return (
      <div className="container-fluid p-5">
        <h3>Loading...</h3>
      </div>
    );
  }

const saveBooking = () => {

  const bookingData = {

    customer: {
      customerId: booking.customerId
    },

    room: {
      roomId: room.roomId
    },

    checkInDate: booking.checkInDate,

    checkOutDate: booking.checkOutDate,

    totalDays: totalDays,

    totalAmount: totalAmount

  };

  api.post("/bookings", bookingData)

    .then((res) => {

      setShowSuccess(true);
      console.log(res.data);
       navigate(`/room/${room.roomId}`);

    })

    .catch((err) => {

      console.log(err);

      alert("❌ Booking Failed");

    });

};



  return (
    <div className="container-fluid p-4">

      <h2>Room {room.roomNumber}</h2>

      <h4>{room.roomType.typeName}</h4>

      <p>{room.roomType.description}</p>


      <hr />

<div className="card shadow-sm p-4 mt-4">

  <h4 className="mb-4">
    Booking Details
  </h4>

  {/* Customer */}

  <div className="mb-3">

    <label className="form-label fw-bold">
      Customer
    </label>

    <select
      className="form-select"
      value={booking.customerId}
      onChange={(e) =>
        setBooking({
          ...booking,
          customerId: e.target.value
        })
      }
    >

      <option value="">
        Select Customer
      </option>

      {customers.map((customer) => (

        <option
          key={customer.customerId}
          value={customer.customerId}
        >
          {customer.firstName} {customer.lastName}
        </option>

      ))}

    </select>

  </div>

  {/* Check In */}

  <div className="mb-3">

    <label className="form-label fw-bold">
      Check In
    </label>

    <input
      type="date"
      className="form-control"
      value={booking.checkInDate}
      onChange={(e) =>
        setBooking({
          ...booking,
          checkInDate: e.target.value
        })
      }
    />

  </div>

  {/* Check Out */}

  <div className="mb-4">

    <label className="form-label fw-bold">
      Check Out
    </label>

    <input
      type="date"
      className="form-control"
      value={booking.checkOutDate}
      onChange={(e) =>
        setBooking({
          ...booking,
          checkOutDate: e.target.value
        })
      }
    />

  </div>


<hr />

<div className="row mb-4">

  <div className="col-md-6">

    <h5>
      Total Days :
      <span className="text-primary">
        {" "}
        {totalDays}
      </span>
    </h5>

  </div>

  <div className="col-md-6 text-end">

    <h5>
      Total Amount :
      <span className="text-success">
        {" "}
        ₹ {totalAmount}
      </span>
    </h5>

  </div>

</div>

{room.roomStatus === "AVAILABLE" ? (
  <button
        className="btn btn-success btn-lg w-100"
        onClick={saveBooking}
    >
        📅 Confirm Booking
    </button>

) : (

     <button
        className="btn btn-secondary btn-lg w-100"
        disabled
    >
        ❌ Room Already Booked
    </button>

)}



{showSuccess && (

  <div
    className="modal d-block"
    tabIndex="-1"
  >

    <div className="modal-dialog">

      <div className="modal-content">

        <div className="modal-header">

          <h4>
            ✅ Booking Confirmed
          </h4>

        </div>

        <div className="modal-body">

          <p>
            Room <b>{room.roomNumber}</b>
          </p>

          <p>
            Amount <b>₹ {totalAmount}</b>
          </p>

        </div>

        <div className="modal-footer">

          <button
            className="btn btn-primary"
            onClick={() => navigate(`/room/${room.roomId}`)}
          >
            Go To Room
          </button>

        </div>

      </div>

    </div>

  </div>

)}



</div>

    </div>

   
  );
}

