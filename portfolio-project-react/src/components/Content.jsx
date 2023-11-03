import Details from "./Details";
import Picture from "./Picture";
import logo from "../assets/ic-profile.png";

const Content = ({ isEdit }) => {
  return (
    <main>
      <Details isEdit={isEdit} />
      <Picture isEdit={isEdit} url={logo} size={"250px"} />
    </main>
  );
};

export default Content;
