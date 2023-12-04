import React from "react";
import Sidebaar from "../Component/Sidebaar";
import HotelList from "../Component/HotelList";

function HotelListpage() {
  return <Sidebaar content={<HotelList />} />;
}

export default HotelListpage;
