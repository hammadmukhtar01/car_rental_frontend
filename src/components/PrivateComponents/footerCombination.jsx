import React from "react";
import HomePageBottomBar from "../Pages/navbar/homePageBottomBar";
import FixedNumLocButtons from "../Pages/navbar/locationNumberIcons";
import Footer from "../Pages/footer/footer";

const FooterCombination = () => {
  return (
    <div>
      <Footer />
      <HomePageBottomBar />
      <FixedNumLocButtons />
    </div>
  );
};

export default FooterCombination;
