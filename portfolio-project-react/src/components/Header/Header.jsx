import { LOGIN } from "./constants";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header>
      <a>{LOGIN}</a>
    </header>
  );
};

export default Header;
