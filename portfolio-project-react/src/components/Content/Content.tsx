import React from "react";
import Details from "../Details/Details";
import Picture from "../Picture/Picture";
import styles from "./Content.module.css";

const Content = () => {
  const size = { width: "250px", height: "250px" };

  return (
    <main>
      <Details />
      <Picture size={size} />
    </main>
  );
};
export default Content;
