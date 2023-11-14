import Details from "../Details/Details";
import Picture from "../Picture/Picture";
import styles from "./Content.module.css"
import logo from "../Picture/assets/ic-profile.png";


const Content = ({ isEditModeEnabled }) => {
  return (
    <main>
      <Details isEditModeEnabled={isEditModeEnabled} />
      <Picture isEditModeEnabled={isEditModeEnabled} url={logo} size={"250px"} />
    </main>
  );
};
export default Content;
