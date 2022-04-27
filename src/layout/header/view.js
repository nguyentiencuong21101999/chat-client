import "./style.css";
const HeaderView = (props) => {
  const { handleSignOut } = props;
  return (
    <div className="header">
      <div className="header-span">
        <img
          width="80px"
          alt=""
          src="https://cdn.dribbble.com/users/2454973/screenshots/15145473/media/df8188352f0e1c4b47f9436f895396dd.jpg?compress=1&resize=1200x900&vertical=top"
        />
      </div>
      <div className="header-span">
        <p>Chats</p>
      </div>
      {/* <div className="header-div">
        <span onClick={handleSignOut} className="sign-out">
          Sign out
        </span>
      </div> */}
    </div>
  );
};

export default HeaderView;
