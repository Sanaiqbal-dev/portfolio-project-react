const Header = ({isEdit,changeEditState}) => {

  return (
    <header>
      <a>Login</a>
      {isEdit ? (
        <a
          onClick={() => {
            changeEditState(false);
          }}
        >
          Save
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
