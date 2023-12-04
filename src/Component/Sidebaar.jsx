import React, { useState, useEffect } from "react";
import globe from "../Image/globe.png";
import { Link, NavLink } from "react-router-dom";
import hotel from "../Image/hotel.png";
import list from "../Image/list.png";
import hotellist from "../Image/hotellist.png";
import rating from "../Image/rating.png";
import coupon from "../Image/coupon.png";
import blog from "../Image/blog.jpg";
import booking from "../Image/booking.png";

import visa from "../Image/visa.png";

import logo from "../Image/logo.avif";
const Sidebaar = ({ content }) => {
  const [isCollapsed, setIsCollapsed] = useState(
    localStorage.getItem("isCollapsed") === "true"
  );

  const handleToggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    localStorage.setItem("isCollapsed", isCollapsed ? "false" : "true");
  };

  useEffect(() => {
    checkCollapse();
  }, []);

  const checkCollapse = () => {
    if (localStorage.getItem("isCollapsed") === "true") {
      setIsCollapsed(true);
    }
  };

  return (
    <div className="w-100 d-flex">
      <div className={`sidebarContainer ${isCollapsed ? "collapsed" : ""}`}>
        <div className="w-100 h-100 position-relative">
          <div className="sidebar-header text-center">
            <a
              href="#"
              className="btn text-dark bg-white"
              id="closeSidebar"
              onClick={handleToggleSidebar}
            >
              {isCollapsed ? (
                <i class="fa-solid fa-xmark fs-5"></i>
              ) : (
                <i class="fa-solid fa-bars fs-5"></i>
              )}
            </a>
            <a href="#" className="d-md-none d-block desktoplogo">
              <img
                src={logo}
                className="img-fluid mobile_fullname_logo"
                alt=""
              />
            </a>
            <a href="#" className="d-none d-md-block">
              <img src={logo} alt="" className="img-fluid talbotiq_Logo" />
              <img src={logo} className="img-fluid fullname_logo" alt="" />
            </a>
          </div>
          <div className="sidebar-content" id="Sidebar_nav">
            <ul className="list-unstyled">
              <li>
                <NavLink
                  to={"/booking"}
                  className="d-flex align-items-center gap-2 Sidebar_link"
                >
                  <span className="icon">
                    <img src={booking} alt="" className="img-fluid" />
                  </span>
                  <p
                    className={`tool-tip ${!isCollapsed ? "" : "nonetooltip"}`}
                  >
                    Booking
                  </p>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/country"}
                  className="d-flex  align-items-center gap-2 Sidebar_link"
                >
                  <span className="icon">
                    <img src={globe} alt="" className="img-fluid" />
                  </span>
                  <p
                    className={`tool-tip ${!isCollapsed ? "" : "nonetooltip"}`}
                  >
                    Country
                  </p>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/countryhotel"}
                  className="d-flex align-items-center gap-2 Sidebar_link"
                >
                  <span className="icon">
                    <img src={hotel} alt="" className="img-fluid" />
                  </span>
                  <p
                    className={`tool-tip ${!isCollapsed ? "" : "nonetooltip"}`}
                  >
                    Country Hotels
                  </p>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/hotellist"}
                  className="d-flex align-items-center gap-2 Sidebar_link"
                >
                  <span className="icon">
                    <img src={hotellist} alt="" className="img-fluid" />
                  </span>
                  <p
                    className={`tool-tip ${!isCollapsed ? "" : "nonetooltip"}`}
                  >
                    Hotel List
                  </p>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/detail"}
                  className="d-flex align-items-center gap-2 Sidebar_link"
                >
                  <span className="icon">
                    <img src={list} alt="" className="img-fluid" />
                  </span>
                  <p
                    className={`tool-tip ${!isCollapsed ? "" : "nonetooltip"}`}
                  >
                    Hotels Detail
                  </p>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/review"}
                  className="d-flex align-items-center gap-2 Sidebar_link"
                >
                  <span className="icon">
                    <img src={rating} alt="" className="img-fluid" />
                  </span>
                  <p
                    className={`tool-tip ${!isCollapsed ? "" : "nonetooltip"}`}
                  >
                    Review
                  </p>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/coupon"}
                  className="d-flex align-items-center gap-2 Sidebar_link"
                >
                  <span className="icon">
                    <img src={coupon} alt="" className="img-fluid" />
                  </span>
                  <p
                    className={`tool-tip ${!isCollapsed ? "" : "nonetooltip"}`}
                  >
                    Coupon And Offers
                  </p>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/blog"}
                  className="d-flex align-items-center gap-2 Sidebar_link"
                >
                  <span className="icon">
                    <img src={blog} alt="" className="img-fluid" />
                  </span>
                  <p
                    className={`tool-tip ${!isCollapsed ? "" : "nonetooltip"}`}
                  >
                    Blog
                  </p>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={"/visa"}
                  className="d-flex align-items-center gap-2 Sidebar_link"
                >
                  <span className="icon">
                    <img src={visa} alt="" className="img-fluid" />
                  </span>
                  <p
                    className={`tool-tip ${!isCollapsed ? "" : "nonetooltip"}`}
                  >
                    Visa
                  </p>
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="sidebar-footer ">{/* Sidebar footer */}</div>
        </div>
      </div>
      <div className={`mainContainer ${isCollapsed ? "collapsed" : ""}`}>
        <div className="w-100 h-100">
          <div className="w-100 sticky-top">
            <nav className="w-100 topbarNav nav-bg">
              <div className="container-fluid">
                <div className="row align-items-center">
                  <div className="col-md-12 col-4">
                    <a
                      href="#"
                      className="btn border-0 shadow-none makeExtend bg-white"
                      onClick={handleToggleSidebar}
                    >
                      {isCollapsed ? (
                        <i class="fa-solid fa-xmark fs-5"></i>
                      ) : (
                        <i class="fa-solid fa-bars fs-5"></i>
                      )}
                    </a>
                    <div className="mobilelogo">
                      <a href="#" className="d-md-none d-block">
                        <img
                          src={logo}
                          className="img-fluid mobile_fullname_logo"
                          alt=""
                        />
                      </a>
                      <a href="#" className="d-none d-md-block">
                        <img
                          src={logo}
                          alt=""
                          className="img-fluid talbotiq_Logo"
                        />
                        <img
                          src={logo}
                          className="img-fluid fullname_logo"
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
            <div className="container-fluid">
              <div className="row">{content}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebaar;
