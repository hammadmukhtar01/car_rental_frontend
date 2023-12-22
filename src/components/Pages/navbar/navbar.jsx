import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  const user_info = JSON.parse(auth);

  console.log("Auth in local storage is: ", user_info);

  const socialLinks = [
    { iconClass: "fa fa-phone", href: "tel:971544519432" },
    {
      iconClass: "fab fa-whatsapp",
      href: "https://api.whatsapp.com/send?phone=971544519432",
    },
    {
      iconClass: "fab fa-facebook",
      href: "https://www.facebook.com/milelecarrental/",
    },
    {
      iconClass: "fab fa-instagram",
      href: "https://www.instagram.com/milelecarrentals/",
    },
  ];

  const smallScreenMenuItems = [
    { label: "Home", link: "/" },
    { label: "Vehicles", link: "/vehicles" },
    { label: "About Us", link: "/aboutus" },
    { label: "FAQ", link: "/faqs" },
    { label: "Contact Us", link: "/contactus" },
  ];

  const largeScreenMenuItems = [
    { id: "home", label: "Home", link: "/" },
    { id: "vehicle", label: "Vehicles", link: "/vehicles" },
    { id: "about-us", label: "About Us", link: "/aboutus" },
    { id: "faq", label: "FAQ", link: "/faqs" },
    { id: "contact-us", label: "Contact Us", link: "/contactus" },
  ];
  const authMenuItems = [
    { id: "login", label: "Log In", link: "/login" },
    { id: "signup", label: "Sign Up", link: "/signup" },
  ];

  const logoutMenuItems = [
    { id: "logout-menu", label: "Log Out", link: "/" },
    { id: "user-profile", label: "User", link: "#" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate(`/`);
  };

  return (
    <div>
      <div id="header">
        <div className="header-main " style={{ padding: "2px" }}>
          <div className="container">
            <div className="clearfix">
              <div className="logo-main ">
                <img
                  src="images/car_rental_logo.png"
                  className="logo-image"
                  style={{ width: "250px" }}
                  title="Home"
                  alt="Logo"
                />
                <div className="mobile-contacts-trigger visible-sm visible-xs">
                  <i className="stm-icon-phone-o"></i>
                  <i className="stm-icon-close-times"></i>
                </div>
                <div className="mobile-menu-trigger visible-sm visible-xs ">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className="mobile-menu-holder">
                <ul className="header-menu clearfix">
                  {smallScreenMenuItems.map((item, index) => (
                    <li
                      key={index}
                      className={`menu-items menu-item-type-custom menu-item-object-custom `}
                    >
                      <a href={item.link}>
                        <text>{item.label}</text>
                      </a>{" "}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="top-info-wrap">
                <div className="header-top-info">
                  <div className="clearfix">
                    <div className="pull-right">
                      <div className="header-main-socs">
                        <ul className="clearfix">
                          {socialLinks.map((link, index) => (
                            <li key={index}>
                              <a
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i className={link.iconClass}></i>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="pull-right ml-lg-5 mb-md-2 mb-2">
                      <a href="enquires/create.html">
                        <button
                          type="button"
                          className="btn btn-sm "
                          style={{
                            backgroundColor: "#cc6119",
                            boxShadow: "none",
                            marginLeft: "20px",
                          }}
                        >
                          SEND ENQUIRY
                        </button>
                      </a>
                    </div>
                    <div className="pull-right text-right">
                      <div className="header-secondary-phone header-secondary-phone-single">
                        <div className="phone">
                          <i
                            className="stm-icon-phone "
                            style={{ color: "#cc761a" }}
                          ></i>
                          <span className="phone-number heading-font">
                            <a href="tel:971544519432"> +971 544519432 </a>
                          </span>
                        </div>
                        <div className="phone">
                          <i
                            className="stm-icon-mail "
                            style={{ color: "#cc761a" }}
                          ></i>
                          <span className="phone-number heading-font mt-1">
                            <a href="cdn-cgi/l/email-protection.html#224b4c444d624f4b4e474e4741435050474c56434e0c414d4f">
                              {" "}
                              <span
                                className="__cf_email__"
                                data-cfemail="caa3a4aca58aa7a3a6afa6afa9abb8b8afa4beaba6e4a9a5a7"
                              >
                                info@milelecarrental.com
                              </span>
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="header-nav-holder">
          <div
            className=" "
            style={{ padding: "0px 20px" }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <div className="main-menu">
                    <ul
                      className="header-menu clearfix float-left"
                      id="navbar-home"
                    >
                      {largeScreenMenuItems.map((item) => (
                        <li
                          key={item.id}
                          className={`menu-items menu-item-type-custom menu-item-object-custom menu-item-${
                            item.id
                          } ${location.pathname === item.link ? "active" : ""}`}
                          id={item.id}
                        >
                          <a href={item.link}>
                            <text>{item.label}</text>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {auth ? (
                  auth.status === "success" ? (
                    <div className="col-lg-4">
                      <div className="main-menu">
                        <ul
                          className="header-menu clearfix float-right"
                          id="navbar-home"
                        >
                          {authMenuItems.map((item) => (
                            <li
                              key={item.id}
                              className={`menu-items menu-item-type-custom menu-item-object-custom menu-item-${item.id}`}
                              id={item.id}
                            >
                              <a href={item.link}>
                                <text>{item.label}</text>
                              </a>{" "}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="col-lg-4">
                      <div className="main-menu">
                        <ul
                          className="header-menu clearfix float-right"
                          id="navbar-home"
                        >
                          {logoutMenuItems.map((item) => (
                            <li
                              key={item.id}
                              className={`menu-items menu-item-type-custom menu-item-object-custom menu-item-${
                                item.id
                              } ${
                                location.pathname === item.link ? "active" : ""
                              }`}
                              id={item.id}
                              onClick={
                                item.id === "logout-menu" ? handleLogout : null
                              }
                            >
                              <a href={item.link}>
                                <text>{item.label}</text>
                              </a>{" "}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="col-lg-4">
                    <div className="main-menu">
                      <ul
                        className="header-menu clearfix float-right"
                        id="navbar-home"
                      >
                        {authMenuItems.map((item) => (
                          <li
                            key={item.id}
                            className={`menu-items menu-item-type-custom menu-item-object-custom menu-item-${
                              item.id
                            } ${
                              location.pathname === item.link ? "active" : ""
                            }`}
                            id={item.id}
                          >
                            <a href={item.link}>
                              <text>{item.label}</text>
                            </a>{" "}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
