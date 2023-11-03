import "./index.css";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import { useState } from "react";

const App = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  return (
    <div>
      <Header isEdit={isEditMode} changeEditState={setIsEditMode} />
      <Content isEdit={isEditMode} />
      <Footer />
    </div>
  );
};

export default App;
