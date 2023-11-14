import "./index.css";
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";

import { useState } from "react";

const App = () => {
  const [editMode, setEditMode] = useState(false);
  return (
    <div>
      <Header
        isEditModeEnabled={editMode}
        changeEditModeEnabledState={setEditMode}
      />
      <Content isEditModeEnabled={editMode} />
      <Footer />
    </div>
  );
};

export default App;
