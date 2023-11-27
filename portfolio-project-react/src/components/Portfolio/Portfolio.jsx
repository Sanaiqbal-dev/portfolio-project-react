import { Routes, Route, useLocation } from "react-router-dom";

import { IsEditModeEnabled } from "../../EditModeContext";
import Header from "../Header/Header";
import Content from "../Content/Content";
import Footer from "../Footer/Footer";
import SignUp from "../SignUp/SignUp";

import { useState } from "react";

const Portfolio = () => {
  const [isEditModeEnabled, setIsEditModeEnabled] = useState(false);
  const location = useLocation();
  const [isPortfolioRouteEnabled, setIsPortfolioRouteEnabled] = useState(
    location.pathname === "/" ? true : false
  );


  return (
    <IsEditModeEnabled.Provider value={isEditModeEnabled}>
      <Header
        changeEditMode={setIsEditModeEnabled}
        isPortfolioRouteEnabled={isPortfolioRouteEnabled}
      />
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
      <Footer />
    </IsEditModeEnabled.Provider>
  );
};

export default Portfolio;
