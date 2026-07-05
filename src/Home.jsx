import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";

 

export default function Home() {
  return (
    <div>

    <div className="d-flex justify-content-between align-items-center px-4 py-3">

  <div>
    <h1 className="display-3 fw-bold text-dark">
       Horizon Grand Hotel
    </h1>

    <p className="fs-4 text-secondary">
      Smart Hotel Management Solution for Rooms,
      Bookings, Billing, Payments and Restaurant Operations
    </p>
  </div>

  <Link to="/dashboard">
    <button
      className="btn btn-warning btn-lg px-5 shadow fw-bold"
      style={{
        height: "60px",
        borderRadius: "30px"
      }}
    >
      Enter ERP →
    </button>
  </Link>

</div>
 


      {/* Hotel Image */}
      <div>

       <div className="container-fluid p-0">
         
       <Carousel fade>
     <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
      style={{ height: "600px", objectFit: "cover" }}
    />
  </Carousel.Item>

  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa"
      style={{ height: "600px", objectFit: "cover" }}
    />
  </Carousel.Item>

  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c"
      style={{ height: "600px", objectFit: "cover" }}
    />
  </Carousel.Item>
</Carousel>

      </div>

</div>


      {/* About Hotel */}
     <div className="container py-5">

  <div className="row align-items-center">

    <div className="col-md-6">
      <img
        src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461"
        alt="Luxury Hotel"
        className="img-fluid rounded shadow"
      />
    </div>

    <div className="col-md-6">

      <h5 className="text-warning fw-bold">
        ABOUT US
      </h5>

      <h2 className="fw-bold mb-4">
        Experience Luxury & Comfort
      </h2>

      <p className="text-muted">
        Grand Hotel Management System is designed to provide
        world-class hospitality services with modern room management,
        seamless booking operations, secure billing, digital payments,
        and premium customer experiences.
      </p>

      <p className="text-muted">
        Our hotel combines luxury accommodation, exceptional dining,
        and professional guest services to ensure a memorable stay
        for every visitor.
      </p>

      <div className="row mt-4">

        <div className="col-6">
          <h3 className="text-primary">20+</h3>
          <p>Luxury Rooms</p>
        </div>

        <div className="col-6">
          <h3 className="text-success">500+</h3>
          <p>Happy Guests</p>
        </div>

        <div className="col-6">
          <h3 className="text-danger">24/7</h3>
          <p>Customer Support</p>
        </div>

        <div className="col-6">
          <h3 className="text-warning">5★</h3>
          <p>Premium Service</p>
        </div>

      </div>

    </div>

  </div>

</div>




      {/* Modules */}
      <div className="container mt-5">
        <h2 className="text-center mb-4">Quick Access</h2>

         

        <div className="row g-4">

          <div className="col-md-4">
            <Link to="/rooms" className="text-decoration-none">
              <div className="card shadow text-center p-4">
                <h3>🛏 Rooms</h3>
              </div>
            </Link>
          </div>

          <div className="col-md-4">
            <Link to="/customers" className="text-decoration-none">
              <div className="card shadow text-center p-4">
                <h3>👤 Customers</h3>
              </div>
            </Link>
          </div>

          <div className="col-md-4">
            <Link to="/bookings" className="text-decoration-none">
              <div className="card shadow text-center p-4">
                <h3>📅 Bookings</h3>
              </div>
            </Link>
          </div>

          <div className="col-md-4">
            <Link to="/bills" className="text-decoration-none">
              <div className="card shadow text-center p-4">
                <h3>🧾 Bills</h3>
              </div>
            </Link>
          </div>

          <div className="col-md-4">
            <Link to="/payments" className="text-decoration-none">
              <div className="card shadow text-center p-4">
                <h3>💳 Payments</h3>
              </div>
            </Link>
          </div>

          <div className="col-md-4">
            <Link to="/food-orders" className="text-decoration-none">
              <div className="card shadow text-center p-4">
                <h3>🍔 Food Orders</h3>
              </div>
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}