import React from "react";
import Details from "../Details/Details.tsx";
import Picture from "../Picture/Picture.tsx";
import styles from "./Content.module.css";
import { PictureSize } from "../../interface.tsx";

const Content = () => {
  const size: PictureSize = { width: "250px", height: "250px" };

  return (
    <main className={styles.main}>
      <Details />
      <Picture size={size} />
    </main>
  );
};
export default Content;
