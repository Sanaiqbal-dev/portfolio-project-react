import { useContext } from "react";
import { IsEditMode } from "../../IsEditMode";
import { EDIT, LOGIN, SAVE } from "./constants";
import styles from "./Header.module.css";
const Header = ({ changeEditMode }) => {
  const isEditMode = useContext(IsEditMode);

  return (
    <header>
      <a>{LOGIN}</a>
      {isEditMode ? (
        <a
          onClick={() => {
            changeEditMode(false);
          }}
        >
          {SAVE}
        </a>
      ) : (
        <a
          onClick={() => {
            changeEditMode(true);
          }}
        >
          {EDIT}
        </a>
      )}
    </header>
  );
};

export default Header;
