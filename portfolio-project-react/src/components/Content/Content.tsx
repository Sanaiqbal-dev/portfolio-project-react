import React from "react";
import Details from "../Details/Details.tsx";
import Picture from "../Picture/Picture.tsx";
import styles from "./Content.module.css";

interface SizeProp {
  width: string;
  height: string;
}
const Content = () => {
  const size: SizeProp = { width: "250px", height: "250px" };

  return (
    <main className={styles.main}>
      <Details />
      <Picture size={size} />
    </main>
  );
};
export default Content;
