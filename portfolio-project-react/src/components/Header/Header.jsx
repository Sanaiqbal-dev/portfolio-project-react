import { EDIT, LOGIN, SAVE } from "./constants";
import styles from "./Header.module.css";
const Header = ({ isEdit, changeEditState }) => {
  return (
    <header>
      <a>{LOGIN}</a>
      {isEdit ? (
        <a
          onClick={() => {
            changeEditState(false);
          }}
        >
          {SAVE}
        </a>
      ) : (
        <a
          onClick={() => {
            changeEditState(true);
          }}
        >
          {EDIT}
        </a>
      )}
    </header>
  );
};

export default Header;
