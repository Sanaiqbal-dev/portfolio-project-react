import React from "react";
import Details from "./Details";
import Picture from "./Picture";
import logo from '../assets/ic-profile.png'


const Content = () => {
  return (
    <main>
      <Details />
      <Picture url={logo} size={"250px"}/>
    </main>
  );
};

export default Content;
