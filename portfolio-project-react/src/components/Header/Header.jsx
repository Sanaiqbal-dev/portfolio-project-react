import { useContext } from "react";
import { IsEditMode } from "../../IsEditMode";
import { EDIT_TEXT, LOGIN_TEXT, SAVE_TEXT } from "./constants";
import styles from "./Header.module.css";
const Header = ({ changeEditModeEnabledMode }) => {
  const isEditModeEnabledMode = useContext(IsEditMode);

  return (
    <header>
      <a>{LOGIN_TEXT}</a>
      {isEditModeEnabledMode ? (
        <a
          onClick={() => {
            changeEditModeEnabledMode(false);
          }}
        >
          {SAVE_TEXT}
        </a>
      ) : (
        <a
          onClick={() => {
            changeEditModeEnabledMode(true);
          }}
        >
          {EDIT_TEXT}
        </a>
      )}
    </header>
  );
};

export default Header;
