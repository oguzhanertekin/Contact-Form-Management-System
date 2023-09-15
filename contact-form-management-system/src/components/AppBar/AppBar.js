import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "styled-components";
import cfms from "../../assets/cfms.png";
import cfmsW from "../../assets/cfms-white.png";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logged } from "../../store/slices/logSlice";
import { useNavigate } from "react-router-dom";
import { theme } from "../../store/slices/themeSlice";
import { language } from "../../store/slices/languageSlice";
import LanguageIcon from "@mui/icons-material/Language";
import Switch from "@mui/joy/Switch";
import DarkMode from "@mui/icons-material/DarkMode";
import SettingsIcon from "@mui/icons-material/Settings";
import EmailIcon from "@mui/icons-material/Email";

import Badge from "@mui/material/Badge";

function ResponsiveAppBar(props) {
  const apptheme = useSelector((state) => state.theme.theme);
  const applanguage = useSelector((state) => state.language.language);
  const dispatch = useDispatch();
  const mytheme = useTheme();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.value);

  const pagesAdmin = ["Messages", "Users", "Reports"];
  const pagesAdminTR = ["Mesajlar", "Kullanıcılar", "Raporlar"];

  const [anchorElNav, setAnchorElNav] = useState();
  const [anchorElSettings, setAnchorElSettings] = useState(null);

  const [pages, setPages] = useState([]);
  const userName = user.username;
  const userPhoto = user.base64Photo;
  const userRole = user.role;

  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleMenuClick = (event) => {
    setAnchorElSettings(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorElSettings(null);
  };

  useEffect(() => {
    handlePage();
  }, [applanguage]);

  useEffect(() => {
    const interval = setInterval(() => {
      getMessages();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const getMessages = () => {
    fetch("http://localhost:5165/api/messages", {
      method: "GET",
      headers: {
        token: localStorage.getItem("token"),
        "my-custom-header-key": "my-custom-header-value",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUnreadCount(
          data.data.messages.filter((message) => message.read === "false")
            .length
        );
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    fetch("http://localhost:5165/api/user/logout", {
      method: "POST",
      headers: {
        token: localStorage.getItem("token"),
        "my-custom-header-key": "my-custom-header-value",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        navigate("/login");
      })
      .catch((err) => console.log(err));
    dispatch(logged(false));
  };

  const handlePage = () => {
    if (userRole === "admin") {
      applanguage === "TR" ? setPages(pagesAdminTR) : setPages(pagesAdmin);
    } else if (userRole === "reader") {
      applanguage === "TR"
        ? setPages([pagesAdminTR[0]])
        : setPages([pagesAdmin[0]]);
    }
  };

  const navigation = (page) => () => {
    if (page === "profile") {
      navigate("/account/profile");
    } else {
      console.log(page);
      page =
        applanguage === "TR" ? pagesAdmin[pagesAdminTR.indexOf(page)] : page;
      navigate(`/account/${page}`);
    }
  };

  const themeHandler = () => {
    if (apptheme === "light") {
      dispatch(theme("dark"));
    }
    if (apptheme === "dark") {
      dispatch(theme("light"));
    }
  };
  const languageHandler = () => {
    if (applanguage === "TR") {
      dispatch(language("EN"));
    }
    if (applanguage === "EN") {
      dispatch(language("TR"));
    }
  };

  return (
    <AppBar
      position="static"
      color="default"
      style={{
        boxShadow: "0 3px 10px rgb(0 0 0 / 0.2) ",

        borderRadius: "50px",
        backgroundColor:
          apptheme === "light" ? mytheme.light.primary : mytheme.dark.primary,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            src={apptheme === "light" ? cfms : cfmsW}
            alt="logo"
            width="120px"
            height="50px"
          />

          {/* // RESPONSIVE */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{
                color:
                  apptheme === "light"
                    ? mytheme.light.secondary
                    : mytheme.dark.optional,
              }}
            >
              <MenuIcon
                style={{
                  color: "rgb(179, 179, 179)",
                  width: "17px",
                }}
              />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              MenuListProps={{ disablePadding: true }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    backgroundColor:
                      apptheme === "light"
                        ? mytheme.light.primary
                        : mytheme.dark.primary,
                    margin: "0px",
                    ":hover": {
                      backgroundColor:
                        apptheme === "light"
                          ? "#e9e9e9"
                          : mytheme.dark.secondary,
                    },
                  }}
                >
                  <Typography
                    textAlign="center"
                    sx={{
                      color:
                        apptheme === "light"
                          ? mytheme.light.secondary
                          : mytheme.dark.optional,

                      fontFamily: "'Poppins Regular', sans-serif",
                      fontWeight: "300",
                      fontSize: "16px",
                    }}
                    onClick={navigation(page)}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* // MAİN */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, ml: 5 }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={navigation(page)}
                sx={{
                  my: 2,
                  color:
                    apptheme === "light"
                      ? mytheme.light.secondary
                      : mytheme.dark.optional,
                  display: "block",
                  fontFamily: "'Poppins Light', sans-serif",
                  fontWeight: "900",
                  fontSize: "16px",
                  borderRadius: "40px",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            style={{
              marginRight: "5px",
            }}
          >
            <Badge
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              badgeContent={unreadCount}
              color="error"
              sx={{
                "& .MuiBadge-badge": { fontSize: 10, height: 13, minWidth: 10 },
              }}
            >
              <EmailIcon
                style={{
                  width: "17px",
                  color: "rgb(179, 179, 179)",
                }}
              />
            </Badge>
          </IconButton>

          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuClick}
            style={{
              marginRight: "5px",
            }}
          >
            <SettingsIcon
              style={{
                width: "17px",
                color: "rgb(179, 179, 179)",
              }}
            />
          </IconButton>
          <Menu
            anchorEl={anchorElSettings}
            open={Boolean(anchorElSettings)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            MenuListProps={{ disablePadding: true }}
          >
            <MenuItem
              sx={{
                "&:hover": {
                  backgroundColor:
                    apptheme === "light" ? "inherit" : mytheme.dark.primary,
                },
                pointerEvents: "none",
                backgroundColor:
                  apptheme === "light"
                    ? mytheme.light.primary
                    : mytheme.dark.primary,
                margin: "0px",
              }}
            >
              <Switch
                variant="soft"
                onChange={themeHandler}
                size="sm"
                color={apptheme === "light" ? "neutral" : "info"}
                slotProps={{
                  input: { "aria-label": "Dark mode" },
                  thumb: {
                    children: (
                      <DarkMode
                        style={{
                          width: "13px",
                        }}
                      />
                    ),
                  },
                }}
                sx={{
                  "--Switch-thumbSize": "17px",
                  boxShadow: "0px 0px 4px 1px rgba(0,0,0,0.4) ",
                  borderRadius: "10px",
                  marginRight: "10px",
                  pointerEvents: "auto",
                }}
              />
              <Typography
                textAlign="center"
                sx={{
                  color:
                    apptheme === "light"
                      ? mytheme.light.secondary
                      : mytheme.dark.optional,

                  fontFamily: "'Poppins Regular', sans-serif",
                  fontWeight: "300",
                  fontSize: "13px",
                  marginRight: "10px",
                }}
              >
                {apptheme === "light" ? "Dark" : "Light"}
              </Typography>
            </MenuItem>
            <MenuItem
              sx={{
                "&:hover": {
                  backgroundColor:
                    apptheme === "light" ? "inherit" : mytheme.dark.primary,
                },
                pointerEvents: "none",
                backgroundColor:
                  apptheme === "light"
                    ? mytheme.light.primary
                    : mytheme.dark.primary,
                margin: "0px",
              }}
            >
              <Switch
                variant="soft"
                onChange={languageHandler}
                size="sm"
                color={apptheme === "light" ? "neutral" : "primary"}
                slotProps={{
                  input: { "aria-label": "Dark mode" },
                  thumb: {
                    children: (
                      <LanguageIcon
                        style={{
                          width: "13px",
                        }}
                      />
                    ),
                  },
                }}
                sx={{
                  "--Switch-thumbSize": "17px",
                  boxShadow: "0px 0px 4px 1px rgba(0,0,0,0.4) ",
                  borderRadius: "10px",
                  marginRight: "10px",
                  pointerEvents: "auto",
                }}
              />
              <Typography
                textAlign="center"
                sx={{
                  color:
                    apptheme === "light"
                      ? mytheme.light.secondary
                      : mytheme.dark.optional,

                  fontFamily: "'Poppins Regular', sans-serif",
                  fontWeight: "300",
                  fontSize: "13px",
                  marginRight: "10px",
                }}
              >
                {applanguage === "TR" ? "EN" : "TR"}
              </Typography>
            </MenuItem>
          </Menu>

          <Box sx={{ flexGrow: 0 }}>
            <Typography
              textAlign="center"
              sx={{
                color:
                  apptheme === "light"
                    ? mytheme.light.secondary
                    : mytheme.dark.secondary,
                fontFamily: "'Poppins Light', sans-serif",
                fontWeight: "900",
                fontSize: "16px",
                mr: "10px",
              }}
            >
              {userName}
            </Typography>
            <Typography
              textAlign="right"
              sx={{
                color: "gray",
                fontFamily: "'Poppins Light', sans-serif",
                fontWeight: "900",
                fontSize: "11px",
                mr: "10px",
              }}
            >
              {capitalizeFirst(userRole)}
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={applanguage === "TR" ? "Profil" : "Profile"}>
              <IconButton
                onClick={navigation("profile")}
                sx={{
                  p: 0,
                  border:
                    "1px solid " +
                    (apptheme === "light"
                      ? mytheme.light.secondary
                      : mytheme.dark.secondary),
                }}
              >
                <Avatar alt="user photo" src={userPhoto} />
              </IconButton>
            </Tooltip>
            <Tooltip title={applanguage === "TR" ? "Çıkış Yap" : "Log Out"}>
              <IconButton sx={{ p: 0, ml: "10px" }} onClick={handleLogout}>
                <LogoutIcon
                  style={{
                    width: "17px",
                    color: "rgb(179, 179, 179)",
                  }}
                />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
