import Details from "../Details/Details";
import Picture from "../Picture/Picture";
import styles from "./Content.module.css";
import logo from "../Picture/assets/ic-profile.png";

const Content = () => {
  const size = { width: "250px", height: "250px" };

  return (
    <main>
      <Details />
      <Picture url={logo} size={size} />
    </main>
  );
};
export default Content;
