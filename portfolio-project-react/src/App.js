import { useState } from "react";
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";
import "./index.css";
import { IsEditMode } from "./IsEditMode";

const App = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  return (
    <>
      <IsEditMode.Provider value={isEditMode}>
        <Header changeEditMode={setIsEditMode} />
        <Content />
        <Footer />
      </IsEditMode.Provider>
    </>
  );
};

export default App;
