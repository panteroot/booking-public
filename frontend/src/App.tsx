import "./reset.scss";
import "./app.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import SearchPage from "./pages/search/SearchPage";
import Login from "./pages/login/Login";
import LoginAsAdmin from "./pages/admin/login/Login";
import PropertyDetail from "./pages/property-detail/PropertyDetail";
import DashboardPage from "./pages/admin/dashboard/DashboardPage";
import AddPropertyPage from "./pages/admin/property-list/AddPropertyPage";
import EditPropertyPage from "./pages/admin/property-list/EditPropertyPage";
import AddRoomPage from "./pages/admin/room-list/AddRoomPage";
import EditRoomPage from "./pages/admin/room-list/EditRoomPage";
import PropertyListPage from "./pages/admin/property-list/PropertyListPage";
import Test from "./pages/test/Test";
import RoomListPage from "./pages/admin/room-list/RoomListPage";
import BookingDetail from "./pages/booking/BookingDetail";
import Registration from "./pages/registration/Registration";
import SaveBookingSuccess from "@pages/booking/SaveBookingSuccess";
import Payment from "@pages/booking/Payment";

import PrivateRouteForAdmin from "@routes/PrivateRouteForAdmin";
import NotFound from "@pages/not-found/NotFound";
import MyBookings from "@pages/my-bookings/MyBookings";
import SaveBookingFailed from "@pages/booking/SaveBookingFailed";
import BookingErrorPage from "@pages/booking/booking-error-page/BookingErrorPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="test" element={<Test />} />
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/properties/:id" element={<PropertyDetail />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/booking/create" element={<BookingDetail />} />
        <Route path="/booking/pay" element={<Payment />} />
        <Route path="/booking/error" element={<BookingErrorPage />} />
        <Route path="/users/register" element={<Registration />} />

        <Route path="/booking/success" element={<SaveBookingSuccess />} />
        <Route path="/booking/failed/:id" element={<SaveBookingFailed />} />
        <Route path="/admin/login" element={<LoginAsAdmin />} />

        <Route path="/" element={<PrivateRouteForAdmin />}>
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/admin/properties" element={<PropertyListPage />} />
          <Route path="/admin/properties/add" element={<AddPropertyPage />} />
          <Route
            path="/admin/properties/edit/:id"
            element={<EditPropertyPage />}
          />
          <Route path="/admin/rooms" element={<RoomListPage />} />
          <Route path="/admin/rooms/add" element={<AddRoomPage />} />
          <Route path="/admin/rooms/edit/:id" element={<EditRoomPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
