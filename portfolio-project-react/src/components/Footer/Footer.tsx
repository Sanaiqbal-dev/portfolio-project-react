import React from "react";
import { LINKEDIN_TEXT } from "./constants.tsx";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer>
      <a>{LINKEDIN_TEXT}</a>
    </footer>
  );
};

export default Footer;
