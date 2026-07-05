
import { useEffect, useState } from "react";
import api from "../services/api";


export default function Booking() {

const [customers, setCustomers] = useState([]);
const [rooms, setRooms] = useState([]);
const [bookings, setBookings] = useState([]);

const [formData, setFormData] = useState({
  customerId: "",
  roomId: "",
  checkInDate: "",
  checkOutDate: ""
});

useEffect(() => {
  getCustomers();
  getRooms();
  getBookings();
}, []);


  return (

    <div className="container-fluid p-4">

      <h2 className="fw-bold">
        Booking Management
      </h2>

      <p className="text-muted">
        Manage all hotel bookings.
      </p>

    </div>

  );

}