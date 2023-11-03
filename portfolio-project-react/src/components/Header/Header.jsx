import { LOGIN } from "./constants";
import styles from "./Header.module.css";
const Header = ({ isEdit, changeEditState }) => {
  return (
    <header>
      <a>Login</a>
      {isEdit ? (
        <a
          onClick={() => {
            changeEditState(false);
          }}
        >
          {LOGIN}
        </a>
      ) : (
        <a
          onClick={() => {
            changeEditState(true);
          }}
        >
          Edit
        </a>
      )}
    </header>
  );
};

export default Header;
