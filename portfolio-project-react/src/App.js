import { useState } from "react";
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";
import { IsEditModeEnabled, isEditModeEnabled } from "./EditMode";
import "./index.css";

const App = () => {
  const [isEditModeEnabled, setIsEditModeEnabled] = useState(false);
  return (
    <>
      <IsEditModeEnabled.Provider value={isEditModeEnabled}>
        <Header changeEditMode={setIsEditModeEnabled} />
        <Content />
        <Footer />
      </IsEditModeEnabled.Provider>
    </>
  );
};

export default App;
