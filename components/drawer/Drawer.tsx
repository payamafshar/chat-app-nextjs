import * as React from "react";
import Drawer from "@mui/material/Drawer";
import CoversationSideBar from "../conversation/ConversationSideBar";


type Anchor = 'top' | 'left' | 'bottom' | 'right';
export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left:false,
    right: false,
  });

  const toggleDrawer = (anchor:Anchor, open:boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor:Anchor) => (
    <div className="flex flex-col justify-between items-start h-full w-[300px] dark:bg-whitedark ">
      <CoversationSideBar />
     </div>
  );

  return (
    <div className="h-full ">
      <button className="px-2 py-2" onClick={toggleDrawer("left", true)}>
        <div className="w-6 h-0.5 bg-white m-1"></div>
        <div className="w-6 h-0.5 bg-white m-1"></div>
        <div className="w-6 h-0.5 bg-white m-1"></div>
      </button>
      <Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </div>
  );
}
