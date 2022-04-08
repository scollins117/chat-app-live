import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

const pages = ["Dashboard", "Chats"];
const settings = ["Profile", "Account", "Logout"];

const Header = () => {

  const loggedIn = Auth.loggedIn();
  const logout = event => {
    Auth.logout();
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (event) => {
    if (event.target.innerText === "CHATS") {
      if (loggedIn) {
        window.location.assign('/chats');
      } else {
        window.location.assign('/login')
      }
    }
    if (event.target.innerText === "DASHBOARD") {
      if (loggedIn) {
        window.location.assign('/dashboard');
      } else {
        window.location.assign('/login')
      }
    }
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (event) => {
    if (event.target.innerHTML === "Logout") {
      logout();
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            Live Chat
          </Typography>

          <Box sx={{ flexGrow: 1, flexWrap: "nowrap", display: "flex" }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {Auth.loggedIn() ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { md: "flex" } }}
            >
              <Link to="/login">Login</Link>
            </Typography>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
