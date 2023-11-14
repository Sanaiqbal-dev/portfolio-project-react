import { EDIT_TEXT, LOGIN_TEXT, SAVE_TEXT } from "./constants";
import styles from "./Header.module.css";
const Header = ({ isEditModeEnabled, changeEditModeEnabledState }) => {
  return (
    <header>
      <a>{LOGIN_TEXT}</a>
      {isEditModeEnabled ? (
        <a
          onClick={() => {
            changeEditModeEnabledState(false);
          }}
        >
          {SAVE_TEXT}
        </a>
      ) : (
        <a
          onClick={() => {
            changeEditModeEnabledState(true);
          }}
        >
          {EDIT_TEXT}
        </a>
      )}
    </header>
  );
};

export default Header;
