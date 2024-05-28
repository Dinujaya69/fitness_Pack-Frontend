import React, { useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Popover from "@mui/material/Popover";
import MenuIcon from "@mui/icons-material/Menu";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import DashboardIcon from "@mui/icons-material/Dashboard";



import AssignmentIcon from "@mui/icons-material/Assignment";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import LogoutIcon from "@mui/icons-material/Logout";

const MSideBar = () => {
  const [state, setState] = useState({ left: false });
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "profile-menu" : undefined;

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* Button to open the sidebar */}
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer("left", true)}
      >
        <MenuIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      ></Popover>

      {/* Sidebar Drawer */}
      <Drawer
        anchor="left"
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
        sx={{ width: "250px" }}
      >
        <Box
          role="presentation"
          onClick={toggleDrawer("left", false)}
          onKeyDown={toggleDrawer("left", false)}
          sx={{ backgroundColor: "#121212", color: "white", height: "100%" }} // Apply background color and text color
        >
          <List>
            {[
              {
                text: "Dashboard",
                icon: <DashboardIcon sx={{ color: "white" }} />,
                link: "/member/mdashboard",
              },
              {
                text: "My Health",
                icon: <HealthAndSafetyIcon sx={{ color: "white" }} />,
                link: "/member/healthStatus",
              },
              {
                text: "My Plan",
                icon: <AssignmentIcon sx={{ color: "white" }} />,
                link: "/member/myPlan",
              },
              {
                text: "My Profile",
                icon: <AccountCircleIcon sx={{ color: "white" }} />,
                link: "/member/updateProfile",
              },
             
            ].map((item) => (
              <ListItem
                key={item.text}
                disablePadding
                sx={{ "&:hover": { background: "red" } }}
              >
                <ListItemButton
                  component={Link}
                  to={item.link}
                  sx={{ color: "white" }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          ;
          <Divider />
          <List sx={{ marginTop: "auto" }}>
            {["Log Out"].map((text) => (
              <ListItem
                key={text}
                disablePadding
                sx={{ "&:hover": { background: "red" } }}
              >
                <ListItemButton sx={{ color: "white" }}>
                  <ListItemIcon>
                    <LogoutIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default MSideBar;
