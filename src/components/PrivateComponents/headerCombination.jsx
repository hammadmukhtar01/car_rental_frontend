import React from "react";
import HomePageTopBar from "../Pages/navbar/homePageTopBar";
import MainNavbar from "../Pages/navbar/mainNavbar";

const HeaderCombination = () => {
  return (
    <div>
        <HomePageTopBar />
        <div className="navbar-div-container">
          <MainNavbar />
        </div>
    </div>
  );
};

export default HeaderCombination;
