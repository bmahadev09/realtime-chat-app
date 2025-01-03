import {
  AppBar,
  Backdrop,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { orange } from "../../constants/color";
import {
  Add,
  Group,
  Logout,
  Menu as MenuIcon,
  Notifications,
  Search as SearchIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { lazy, Suspense, useState } from "react";

const Search = lazy(() => import("../specific/Search"));
const NotificationDialog = lazy(() => import("../specific/Notification"));
const NewGroup = lazy(() => import("../specific/NewGroup"));

const Header = () => {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  const handleMobileMenu = () => {
    console.log("Mobile Menu Clicked");
    setIsMobile((prev) => !prev);
  };

  const openSearch = () => {
    console.log("Search Dialog Opened");
    setIsSearch((prev) => !prev);
  };

  const openNewGroup = () => {
    console.log("New Group Dialog Opened");
    setIsNewGroup((prev) => !prev);
  };

  const navigateToGroups = () => {
    navigate("/groups");
  };

  const openNotification = () => {
    console.log("Notification Opened");
    setIsNotification((prev) => !prev);
  };

  const logoutHandler = () => {
    console.log("Logout Clicked");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar
          position="static"
          sx={{
            bgcolor: orange,
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", display: { xs: "none", sm: "block" } }}
            >
              Chatting App
            </Typography>

            <Box
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              <IconButton color="inherit" onClick={handleMobileMenu}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <IconBtn
                title={"Search"}
                icon={<SearchIcon />}
                onClick={openSearch}
              />
              <IconBtn
                title={"New Group"}
                icon={<Add />}
                onClick={openNewGroup}
              />
              <IconBtn
                title={"Manage Groups"}
                icon={<Group />}
                onClick={navigateToGroups}
              />
              <IconBtn
                title={"Notifications"}
                icon={<Notifications />}
                onClick={openNotification}
              />
              <IconBtn
                title={"Logout"}
                icon={<Logout />}
                onClick={logoutHandler}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open={true} />}>
          <Search />
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<Backdrop open={true} />}>
          <NotificationDialog />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open={true} />}>
          <NewGroup />
        </Suspense>
      )}
    </>
  );
};

const IconBtn = ({ icon, onClick, title }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
