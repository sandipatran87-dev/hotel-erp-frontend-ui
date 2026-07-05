import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { Link } from "react-router-dom";


import Standard from "../assets/rooms/standard.jpg";
import Deluxe from "../assets/rooms/deluxe.jpg";
import SuperDeluxe from "../assets/rooms/super-deluxe.jpg";
import Executive from "../assets/rooms/executive.jpg";
import FamilySuite from "../assets/rooms/family-suite.jpg";
import Presidential from "../assets/rooms/presidential-suite.jpg";

export default function Room() {

const [search, setSearch] = useState("");

const [statusFilter, setStatusFilter] = useState("ALL");

  const { roomTypeId } = useParams();

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getRooms();
  }, []);

  const roomImages = {
  Standard: Standard,
  Deluxe: Deluxe,
  "Super Deluxe": SuperDeluxe,
  Executive: Executive,
  "Family Suite": FamilySuite,
  "Presidential Suite": Presidential
};




const getRooms = () => {

  if (roomTypeId) {

    api.get(`/rooms/type/${roomTypeId}`)
      .then((res) => {
        setRooms(res.data);
      })
      .catch((err) => console.log(err));

  } else {

    api.get("/rooms")
      .then((res) => {
        setRooms(res.data);
      })
      .catch((err) => console.log(err));

  }

};

  const filteredRooms = rooms.filter((room) => {

  const matchSearch =
    room.roomNumber
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchStatus =
    statusFilter === "ALL"
      ? true
      : room.roomStatus === statusFilter;

  return matchSearch && matchStatus;

});







  return (

    <div className="container-fluid p-4">

      <h2 className="fw-bold">
        Rooms
      </h2>
      <div className="row mb-4">

  <div className="col-md-3">

    <div className="card shadow border-0">

      <div className="card-body">

        <h6>Total Rooms</h6>

        <h2>{rooms.length}</h2>

      </div>

    </div>

  </div>

  <div className="col-md-3">

    <div className="card shadow border-0">

      <div className="card-body">

        <h6>Available</h6>

        <h2 className="text-success">

          {
            rooms.filter(
              r => r.roomStatus === "AVAILABLE"
            ).length
          }

        </h2>

      </div>

    </div>

  </div>

  <div className="col-md-3">

    <div className="card shadow border-0">

      <div className="card-body">

        <h6>Booked</h6>

        <h2 className="text-danger">

          {
            rooms.filter(
              r => r.roomStatus === "BOOKED"
            ).length
          }

        </h2>

      </div>

    </div>

  </div>

  <div className="col-md-3">

    <div className="card shadow border-0">

      <div className="card-body">

        <h6>Maintenance</h6>

        <h2 className="text-warning">

          {
            rooms.filter(
              r => r.roomStatus === "MAINTENANCE"
            ).length
          }

        </h2>

      </div>

    </div>

  </div>

</div>

      <hr />
      <div className="card shadow border-0 mb-4">

  <div className="card-body">

    <div className="row">

      <div className="col-md-5">

        <input
          type="text"
          className="form-control"
          placeholder="🔍 Search Room Number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="col-md-3">

        <select
          className="form-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >

          <option value="ALL">All Status</option>
          <option value="AVAILABLE">Available</option>
          <option value="BOOKED">Booked</option>
          <option value="MAINTENANCE">Maintenance</option>

        </select>

      </div>

      <div className="col-md-4 text-end">

        <button className="btn btn-dark">

          + Add Room

        </button>

      </div>

    </div>

  </div>

</div>








<div className="row mt-4">

  {filteredRooms.map((room) => (

    <div
      className="col-lg-4 col-md-6 mb-4"
      key={room.roomId}
    >

      <div
        className="card shadow border-0 h-100"
        style={{
          borderRadius: "18px",
          overflow: "hidden"
        }}
      >

        <img
          src={roomImages[room.roomType.typeName]}
          alt={room.roomType.typeName}
          style={{
            height: "230px",
            width: "100%",
            objectFit: "cover"
          }}
        />

        <div className="card-body">

          <h4 className="fw-bold">
            Room {room.roomNumber}
          </h4>

          <h5 className="text-primary">
            {room.roomType.typeName}
          </h5>

          <p className="text-muted">
            {room.roomType.description}
          </p>

          <hr />

          <div className="d-flex justify-content-between">
            <span>👥 Capacity</span>
            <strong>
              {room.roomType.maxCapacity} Guests
            </strong>
          </div>

          <div className="d-flex justify-content-between mt-2">
            <span>💰 Price</span>
            <strong className="text-success">
              ₹ {room.roomType.basePrice}
            </strong>
          </div>

          <div className="d-flex justify-content-between mt-2">
            <span>📍 Floor</span>
            <strong>{room.floorNo}</strong>
          </div>

        </div>

        <div className="card-footer bg-white border-0">

          <div className="d-flex justify-content-between">

            <button className="btn btn-warning btn-sm">
              ✏️ Edit
            </button>

            <button className="btn btn-danger btn-sm">
              🗑 Delete
            </button>

            <Link
              to={`/room/${room.roomId}`}
              className="btn btn-primary btn-sm"
            >
              👁 View
            </Link>

          </div>

        </div>

      </div>

    </div>

  ))}


 </div>   {/* row end */}

    </div>    

   

  );

}

