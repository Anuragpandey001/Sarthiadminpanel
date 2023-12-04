import React from "react";
import Sidebaar from "../Component/Sidebaar";
import CountryHotel from "../Component/CountryHotel";

function CountryHotelPage() {
  return (
    <>
      <Sidebaar content={<CountryHotel />} />
    </>
  );
}

export default CountryHotelPage;
