import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { IsEditModeEnabled } from "../../EditModeContext";
import Header from "../Header/Header";
import Content from "../Content/Content";
import Footer from "../Footer/Footer";
import SignUp from "../SignUp/SignUp";
import DataViewPage from "../DataViewPage/DataViewPage";

const Portfolio = () => {
  const [isEditModeEnabled, setIsEditModeEnabled] = useState(false);
  const location = useLocation();
  const [isPortfolioRouteEnabled, setIsPortfolioRouteEnabled] = useState(location.pathname === "/");

  const [isDataViewPageRouteEnabled, setIsDataViewPageRouteEnabled] = useState(location.pathname === "dataviewpage");

  return (
    <IsEditModeEnabled.Provider value={isEditModeEnabled}>
      <Header
        changeEditMode={setIsEditModeEnabled}
        isPortfolioRouteEnabled={isPortfolioRouteEnabled}
        isDataViewPageRouteEnabled={isDataViewPageRouteEnabled}
      />
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="dataviewpage" element={<DataViewPage />} />
      </Routes>
      <Footer />
    </IsEditModeEnabled.Provider>
  );
};

export default Portfolio;
