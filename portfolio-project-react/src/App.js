import { useState } from "react";
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";
import { IsEditMode } from "./IsEditMode";
import "./index.css";

const App = () => {
  const [isEditModeEnabled, setIsEditModeEnabled] = useState(false);
  return (
    <>
      <IsEditMode.Provider value={isEditModeEnabled}>
        <Header changeEditMode={setIsEditModeEnabled} />
        <Content />
        <Footer />
      </IsEditMode.Provider>
    </>
  );
};

export default App;
