import { BrowserRouter, Routes, Route } from "react-router-dom";


import Home from "./Home";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Customer from "./pages/Customer";
import RoomType from "./pages/RoomType";
import Room from "./pages/Room";
import RoomDetails from "./pages/RoomDetails";
import BookRoom from "./pages/BookRoom";
import Bookings from "./pages/Bookings";
import RestaurantTables from "./pages/RestaurantTables";
import RestaurantTableDetails from "./pages/RestaurantTableDetails";
import BookRestaurantTable from "./pages/BookRestaurantTable";
import MenuItems from "./pages/MenuItems";

function Layout() {
  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1 p-4 bg-light">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customers" element={<Customer />} />
         <Route path="/room-types" element={<RoomType />} />
         <Route path="/rooms/type/:roomTypeId" element={<Room />}/>
          <Route path="/room/:roomId" element={<RoomDetails />}/>
          <Route path="/rooms" element={<Room />} />
          <Route path="/book-room/:roomId" element={<BookRoom />}/>
          <Route path="/bookings" element={<Bookings />}/>
          <Route path="/restaurant-tables" element={<RestaurantTables />}/>
          <Route path="/restaurant-table/:tableId" element={<RestaurantTableDetails />}/>
          <Route path="/book-table/:tableId" element={<BookRestaurantTable />}/>
          <Route path="/menu-items" element={<MenuItems />}/>
        
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/*"
          element={<Layout />}
        />

      </Routes>

    </BrowserRouter>
  );
}