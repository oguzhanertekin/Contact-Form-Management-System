import * as React from "react";

import FormLabel from "@mui/joy/FormLabel";
import FormControl from "@mui/joy/FormControl";

import { useState } from "react";
import Button from "@mui/joy/Button";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

import { TextField } from "@mui/material";
import Typography from "@mui/joy/Typography";
import Badge from "@mui/material/Badge";

import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";

import { useSelector, useDispatch } from "react-redux";
import { currentUser } from "../../store/slices/currentUserSlice";
import ResponsiveDialog from "../../components/ResponsiveDialog/ResponsiveDialog";
import { theme } from "../../store/slices/themeSlice";
import { useTheme } from "styled-components";
import { language } from "../../store/slices/languageSlice";

export default function UserCard() {
  const applanguage = useSelector((state) => state.language.language);

  const apptheme = useSelector((state) => state.theme.theme);
  const mytheme = useTheme();

  const dispatch = useDispatch();
  const currentuser = useSelector((state) => state.currentUser.value);

  const [username, setUsername] = useState(currentuser.username);
  const [password, setPassword] = useState(currentuser.password);
  const [base64Photo, setBase64Photo] = useState(currentuser.base64Photo);
  const [showPassword, setShowPassword] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSave = (id, username, password, base64Photo) => {
    if (
      username !== undefined &&
      password !== undefined &&
      base64Photo !== undefined
    ) {
      saveUser(id, username, password, base64Photo);
      dispatch(
        currentUser({
          id: id,
          username: username,
          password: password,
          base64Photo: base64Photo,
        })
      );

      setIsSaved(true);
    }
  };

  const saveUser = async (id, username, password, base64Photo) => {
    if (id !== null) {
      try {
        const response = await fetch(
          `http://localhost:5165/api/user/update/${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              token: localStorage.getItem("token"),
              "my-custom-header-key": "my-custom-header-value",
            },
            body: JSON.stringify({
              username: username,
              password: password,
              base64Photo: base64Photo,
            }),
          }
        );

        const data = await response.json();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setBase64Photo(reader.result);
      };
    }
  };
  const handleIconClick = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <div
        className="section"
        style={{
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div className="profile-photo">
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <UploadFileRoundedIcon
                size="lg"
                type="file"
                accept="image/*"
                style={{
                  color:
                    apptheme === "light"
                      ? mytheme.light.optional
                      : mytheme.dark.optional,
                }}
                onClick={() => {
                  handleIconClick();
                }}
              />
            }
          >
            <img
              src={base64Photo}
              alt="logo"
              width="120px"
              height="120px"
              style={{
                borderRadius: "60px",
                boxShadow:
                  "0px 0px 10px 0px " +
                  (apptheme === "light"
                    ? mytheme.light.optional
                    : mytheme.dark.optional),
                objectFit: "cover",
              }}
            />
          </Badge>

          <div style={{ position: "relative" }}>
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
          <div
            style={{
              marginTop: "10px",
              color:
                apptheme === "light"
                  ? mytheme.light.optional
                  : mytheme.dark.optional,
            }}
          >
            {currentuser.role}
          </div>
        </div>

        <div
          className="username"
          style={{
            display: "flex",
            justifyContent: "center",
            color:
              apptheme === "light"
                ? mytheme.light.secondary
                : mytheme.dark.secondary,
          }}
        >
          <FormControl
            sx={{
              marginTop: "25px",
            }}
          >
            <FormLabel
              sx={{
                fontFamily: "Poppins Light",
                fontWeight: "600",
                color:
                  apptheme === "light"
                    ? mytheme.light.optional
                    : mytheme.dark.optional,
              }}
            >
              {applanguage === "TR" ? "Kullanıcı Adı" : "Username"}
            </FormLabel>
            <TextField
              inputProps={{
                maxLength: 10,
                style: {
                  height: "10px",
                  color:
                    apptheme === "light"
                      ? mytheme.light.optional
                      : mytheme.dark.optional,
                },
                sx: {
                  border:
                    "1px solid " +
                    (apptheme === "light"
                      ? mytheme.light.secondary
                      : mytheme.dark.optional),
                  borderRadius: "4px",
                },
              }}
              id="username-id"
              placeholder={username}
              // defaultValue={user.username}
              required
              variant="outlined"
              type="text"
              sx={{
                "--Input-focusedInset": "var(--any, )",
                "--Input-focusedThickness": "0.25rem",
                "--Input-focusedHighlight": "rgba(58, 39, 185,.25)",
                "&::before": {
                  transition: "box-shadow .4s ease-in-out",
                },
                "&:focus-within": {
                  borderColor: "#9f27b7",
                },
                minWidth: "300px",
              }}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <Typography
              level="body-xs"
              sx={{ alignSelf: "flex-end", color: "hsl(var(--hue) 80% 30%)" }}
            >
              {applanguage === "TR" ? "Max. 10 karakter" : "Max. 10 character"}
            </Typography>
          </FormControl>
        </div>

        <div
          className="password"
          style={{
            display: "flex",
            justifyContent: "center",
            color:
              apptheme === "light"
                ? mytheme.light.secondary
                : mytheme.dark.secondary,
          }}
        >
          <FormControl
            sx={{
              marginTop: "25px",
            }}
          >
            <FormLabel
              sx={{
                fontFamily: "Poppins Light",
                fontWeight: "600",
                color:
                  apptheme === "light"
                    ? mytheme.light.optional
                    : mytheme.dark.optional,
              }}
            >
              {applanguage === "TR" ? "Şifre" : "Password"}
            </FormLabel>
            <TextField
              inputProps={{
                maxLength: 10,
                style: {
                  height: "10px",
                  color:
                    apptheme === "light"
                      ? mytheme.light.optional
                      : mytheme.dark.optional,
                },
                sx: {
                  border:
                    "1px solid " +
                    (apptheme === "light"
                      ? mytheme.light.secondary
                      : mytheme.dark.optional),
                  borderRadius: "4px",
                },
              }}
              placeholder={password}
              // defaultValue={user.password}
              required
              variant="outlined"
              type={showPassword ? "text" : "password"}
              enddecorator={
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  size="small"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              }
              sx={{
                "--Input-focusedInset": "var(--any, )",
                "--Input-focusedThickness": "0.25rem",
                "--Input-focusedHighlight": "rgba(58, 39, 185,.25)",
                "&::before": {
                  transition: "box-shadow .4s ease-in-out",
                },
                "&:focus-within": {
                  borderColor: "#9f27b7",
                },
                minWidth: "300px",
              }}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />

            <Typography
              level="body-xs"
              sx={{ alignSelf: "flex-end", color: "hsl(var(--hue) 80% 30%)" }}
            >
              {applanguage === "TR" ? "Max. 10 karakter" : "Max. 10 character"}
            </Typography>
          </FormControl>
        </div>
        <div>
          <Button
            onClick={() => {
              handleSave(currentuser.id, username, password, base64Photo);
            }}
            type="submit"
            style={{
              marginTop: "20px",
              borderRadius: "20px",
              borderRadius: "16px",
              boxShadow: "0px 0px 10px 1px rgb(0, 0, 0,0.2)",
            }}
            size="sm"
            variant="soft"
            color="success"
            startDecorator={<BookmarkAddedOutlinedIcon />}
          >
            {applanguage === "TR" ? "Kaydet" : "Save"}
          </Button>
        </div>
      </div>
      {isSaved ? <ResponsiveDialog content="user-saved" /> : null}
    </form>
  );
}
