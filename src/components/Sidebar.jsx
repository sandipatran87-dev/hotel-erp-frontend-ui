import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      className="bg-dark text-white p-3 shadow"
      style={{
        width: "260px",
        minHeight: "100vh"
      }}
    >

      <h3 className="text-center mb-4">
         Horizon Hotel
      </h3>

      <ul className="nav flex-column">

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/dashboard">
            📊 Dashboard
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/customers">
            👤 Customers
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/room-types">
            🏷 Room Types
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/bookings">
           📖 Bookings
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/restaurant-tables">
            🍽 Restaurant
          </Link>
        </li>



      </ul>

    </div>
  );
}