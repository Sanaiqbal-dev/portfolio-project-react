import { useContext } from "react";
import { IsEditMode } from "../../IsEditMode";
import { EDIT_TEXT, LOGIN_TEXT, SAVE_TEXT } from "./constants";
import styles from "./Header.module.css";
const Header = ({ changeEditMode }) => {
  const isEditModeEnabled = useContext(IsEditMode);

  return (
    <header>
      <a>{LOGIN_TEXT}</a>
      {isEditModeEnabled ? (
        <a
          onClick={() => {
            changeEditMode(false);
          }}
        >
          {SAVE_TEXT}
        </a>
      ) : (
        <a
          onClick={() => {
            changeEditMode(true);
          }}
        >
          {EDIT_TEXT}
        </a>
      )}
    </header>
  );
};

export default Header;
