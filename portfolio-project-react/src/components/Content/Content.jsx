import Details from "../Details/Details";
import Picture from "../Picture/Picture";
import styles from "./Content.module.css"
import logo from "../Picture/assets/ic-profile.png";


const Content = ({ isEdit }) => {
  return (
    <main>
      <Details isEdit={isEdit} />
      <Picture isEdit={isEdit} url={logo} size={"250px"} />
    </main>
  );
};
export default Content;
