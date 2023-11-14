import Details from "../Details/Details";
import Picture from "../Picture/Picture";
import styles from "./Content.module.css";
import logo from "../Picture/assets/ic-profile.png";

const Content = () => {
  return (
    <main>
      <Details />
      <Picture url={logo} size={"250px"} />
    </main>
  );
};
export default Content;
