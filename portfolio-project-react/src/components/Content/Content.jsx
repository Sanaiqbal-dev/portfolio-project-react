import Details from "../Details/Details";
import Picture from "../Picture/Picture";
import logo from "../Picture/assets/ic-profile.png"
import styles from "./Content.module.css"

const Content = () => {
  return (
    <main>
      <Details />
      <Picture url={logo} size={"250px"} />
    </main>
  );
};

export default Content;
