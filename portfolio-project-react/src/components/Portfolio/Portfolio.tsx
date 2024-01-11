import React, { useState, useMemo } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { IsEditModeEnabled } from "../../EditModeContext.tsx";
import Header from "../Header/Header.tsx";
import Content from "../Content/Content.tsx";
import Footer from "../Footer/Footer.tsx";
import SignUp from "../SignUp/SignUp.tsx";
import DataViewPage from "../DataViewPage/DataViewPage.tsx";

const Portfolio = () => {
  const [isEditModeEnabled, setIsEditModeEnabled] = useState(false);
  const location = useLocation();
  const isPortfolioRouteEnabled = useMemo(
    () => location.pathname === "/",
    [location]
  );

  const isDataViewPageRouteEnabled = useMemo(
    () => location.pathname === "dataviewpage",
    [location]
  );

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
