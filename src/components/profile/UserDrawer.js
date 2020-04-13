import React from "react";
// MUI Stuff
import Drawer from "@material-ui/core/Drawer";
// Icons
import MyButton from "../../util/MyButton";
import UserProfile from "../profile/UserProfile";
// Icons
import PersonIcon from "@material-ui/icons/Person";
import CloseIcon from "@material-ui/icons/Close";

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (side, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  const sideList = (side) => (
    <div style={{ width: 300 }} role='presentation'>
      <MyButton
        tip='Close'
        onClick={toggleDrawer(side, false)}
        onKeyDown={toggleDrawer(side, false)}
        tipClassName='closeDrawer'
      >
        <CloseIcon />
      </MyButton>
      <UserProfile />
    </div>
  );

  return (
    <div>
      <MyButton tip='My Profile' onClick={toggleDrawer("right", true)}>
        <PersonIcon />
      </MyButton>

      <Drawer
        anchor='right'
        open={state.right}
        onClose={toggleDrawer("right", false)}
      >
        {sideList("right")}
      </Drawer>
    </div>
  );
}
