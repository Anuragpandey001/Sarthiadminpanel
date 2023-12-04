import logo from './logo.svg';
import './App.css';
import Sidebaar from './Component/Sidebaar';
import Country from './Pages/Country';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CountryHotelPage from './Pages/CountryHotelPage';
import DetialPage from './Pages/DetialPage';
import Login from './Pages/Login';
import HotelListpage from './Pages/HotelListpage';
import ReviewPage from './Pages/ReviewPage';
import CouponPage from './Pages/CouponPage';
import Blog from './Pages/Blog';
import Booking from './Pages/Booking';
import Visa from './Pages/Visa';


function App() {
  return (
    <>
      {/* <Sidebaar /> */}
      {/* <Country /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/country" element={<Country />} />
          <Route path="/countryhotel" element={<CountryHotelPage />} />

          <Route path="/countryhotel">
            <Route path=":id" element={<CountryHotelPage />} />
          </Route>
          <Route path="/hotellist" element={<HotelListpage />} />
          <Route path="/detail" element={<DetialPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/coupon" element={<CouponPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/visa" element={<Visa />} />

        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
