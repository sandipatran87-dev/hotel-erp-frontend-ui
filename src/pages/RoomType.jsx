import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import Standard from "../assets/room-types/standard.jpg";
import Deluxe from "../assets/room-types/deluxe.jpg";
import SuperDeluxe from "../assets/room-types/super-deluxe.jpg";
import Executive from "../assets/room-types/executive.jpg";
import FamilySuite from "../assets/room-types/family-suite.jpg";
import Presidential from "../assets/room-types/presidential-suite.jpg";



export default function RoomType() {

  const [roomTypes, setRoomTypes] = useState([]);
  const [search, setSearch] = useState("");

  //roo-type image
  const roomImages = {
  Standard: Standard,
  Deluxe: Deluxe,
  "Super Deluxe": SuperDeluxe,
  Executive: Executive,
  "Family Suite": FamilySuite,
  "Presidential Suite": Presidential
};
 


 
  useEffect(() => {
    getRoomTypes();
  }, []);

  const getRoomTypes = () => {
    api.get("/room-types")
      .then((res) => setRoomTypes(res.data))
      .catch((err) => console.log(err));
  };

  const filteredRoomTypes = roomTypes.filter((room) =>
    room.typeName.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="container-fluid p-4">

      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold">
            Room Types
          </h2>

          <p className="text-muted">
            Manage all hotel room categories
          </p>

        </div>

        <button className="btn btn-primary px-4 shadow">
  + Add Room Type
</button>

      </div>

      {/* Statistics */}

      <div className="row mb-4">

        <div className="col-md-3">

          <div className="card shadow border-0">

            <div className="card-body">

              <h6 className="text-muted">
                Total Room Types
              </h6>

              <h2 className="fw-bold">
                {roomTypes.length}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card shadow border-0">

            <div className="card-body">

              <h6 className="text-muted">
                Highest Price
              </h6>

              <h2 className="text-success fw-bold">

                ₹
                {
                  roomTypes.length > 0
                    ? Math.max(
                        ...roomTypes.map((r) => r.basePrice)
                      )
                    : 0
                }

              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card shadow border-0">

            <div className="card-body">

              <h6 className="text-muted">
                Max Capacity
              </h6>

              <h2 className="text-primary fw-bold">

                {
                  roomTypes.length > 0
                    ? Math.max(
                        ...roomTypes.map(
                          (r) => r.maxCapacity
                        )
                      )
                    : 0
                }

              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card shadow border-0">

            <div className="card-body">

              <h6 className="text-muted">
                Average Price
              </h6>

              <h2 className="text-danger fw-bold">

                ₹
                {
                  roomTypes.length > 0
                    ? Math.round(
                        roomTypes.reduce(
                          (sum, r) => sum + r.basePrice,
                          0
                        ) / roomTypes.length
                      )
                    : 0
                }

              </h2>

            </div>

          </div>

        </div>

      </div>

      {/* Search */}

      <div className="card shadow border-0 mb-4">

        <div className="card-body">

          <div className="input-group">

  <span className="input-group-text">
    🔍
  </span>

  <input
    type="text"
    className="form-control"
    placeholder="Search Room Type..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

</div>

        </div>

      </div>

      {/* Cards */}

     <div className="row">

  {filteredRoomTypes.map((rt) => (

    <div
      className="col-lg-4 col-md-6 mb-4"
      key={rt.roomTypeId}
    >

<div
  className="card border-0 h-100 room-card"
  style={{
    borderRadius: "20px",
    overflow: "hidden",
    transition: "0.35s ease",
    cursor: "pointer"
  }}


onMouseEnter={(e)=>{

e.currentTarget.style.transform="translateY(-8px)";

}}

onMouseLeave={(e)=>{

e.currentTarget.style.transform="translateY(0px)";

}}
>

        <div style={{ position: "relative" }}>

  <img
    src={roomImages[rt.typeName]}
    alt={rt.typeName}
   style={{
  height: "250px",
  width: "100%",
  objectFit: "cover",
  transition:"0.4s"
}}
  />

  <span
    className="badge bg-success"
    style={{
      position: "absolute",
      top: "15px",
      right: "15px",
      fontSize: "14px",
      padding: "8px 12px"
    }}
  >
    Premium
  </span>

</div>

        <div className="card-body">

          <h4 className="fw-bold text-primary mb-2">
          
            {rt.typeName}
          </h4>

          <p className="text-secondary mb-3">

            {rt.description}

          </p>

        <hr className="my-3" />

        <div className="d-flex justify-content-between">

            <span>

              👥 Capacity

            </span>

            <strong>

             👥 {rt.maxCapacity} Guests

            </strong>

          </div>

       <div className="d-grid gap-2">

            <span>

              💰 Price

            </span>

            <strong
              className="text-success"
            >

            ₹ {rt.basePrice} / Night

            </strong>

          </div>

        </div>

     <div className="card-footer bg-white border-0 pt-2 pb-3">

  <div className="d-flex justify-content-end gap-2">

    <button
      className="btn btn-outline-warning rounded-circle"
      title="Edit"
    >
      ✏️
    </button>

    <button
      className="btn btn-outline-danger rounded-circle"
      title="Delete"
    >
      🗑️
    </button>

    <Link
  to={`/rooms/type/${rt.roomTypeId}`}
  className="btn btn-outline-primary rounded-circle"
  title="View Rooms"
>
  👁️
</Link>

  </div>

</div>


      </div>

    </div>

  ))}

</div>

    </div>

  );
}