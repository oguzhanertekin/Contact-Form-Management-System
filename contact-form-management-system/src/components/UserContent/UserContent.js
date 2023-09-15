import React from "react";
import { useState, useEffect } from "react";
import "./UserContent.css";
import Button from "@mui/joy/Button";

import EditIcon from "@mui/icons-material/Edit";

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import UserCard from "../UserCard/UserCard";
import Dialog from "@mui/material/Dialog";
import { useSelector } from "react-redux";
import DialogContent from "@mui/material/DialogContent";
import { useTheme } from "styled-components";
import { language } from "../../store/slices/languageSlice";

const UserContent = (props) => {
  const applanguage = useSelector((state) => state.language.language);

  const apptheme = useSelector((state) => state.theme.theme);
  const mytheme = useTheme();

  const currentuser = useSelector((state) => state.currentUser.value);

  const [user, setUser] = useState([]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getUser();
  }, [currentuser]);

  const getUser = async () => {
    try {
      if (currentuser.id !== undefined) {
        const response = await fetch(
          `http://localhost:5165/api/user/${currentuser.id}`,
          {
            method: "GET",
            headers: {
              token: localStorage.getItem("token"),
              "my-custom-header-key": "my-custom-header-value",
            },
          }
        );

        if (!response.ok) {
          throw new Error();
        }

        const data = await response.json();
        setUser(data.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="box">
      <h4 className="title">
        {applanguage === "TR" ? "Kullanıcı Profili" : "User Profile"}
      </h4>

      <hr
        style={{
          color:
            apptheme === "light"
              ? mytheme.light.optional
              : mytheme.dark.optional,
        }}
      />
      {user.id ? (
        <div>
          <div className="profile-card">
            <div className="profile-photo">
              <img
                src={user.base64Photo}
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
            </div>

            <div className="section">
              <div
                className="role"
                style={{
                  justifyContent: "center",
                  marginTop: "23px",
                }}
              >
                <h5
                  style={{
                    fontFamily: "Poppins Regular",
                    fontWeight: "900",
                    color: apptheme === "light" ? "#006c93" : "#7cb8cd",
                  }}
                >
                  {applanguage === "TR" ? "Rol" : "Role"}
                </h5>
                <div>
                  <p
                    style={{
                      fontFamily: "Poppins Light",
                      fontWeight: "900",
                      color:
                        apptheme === "light"
                          ? mytheme.light.optional
                          : mytheme.dark.optional,
                    }}
                  >
                    {user.role}
                  </p>
                </div>
              </div>
              <div
                className="username"
                style={{
                  justifyContent: "center",
                  marginTop: "23px",
                }}
              >
                <h5
                  style={{
                    fontFamily: "Poppins Regular",
                    fontWeight: "900",
                    color: apptheme === "light" ? "#006c93" : "#7cb8cd",
                  }}
                >
                  {applanguage === "TR" ? "Kullanıcı Adı" : "Username"}
                </h5>
                <div>
                  <p
                    style={{
                      fontFamily: "Poppins Light",
                      fontWeight: "900",
                      color:
                        apptheme === "light"
                          ? mytheme.light.optional
                          : mytheme.dark.optional,
                    }}
                  >
                    {user.username}
                  </p>
                </div>
              </div>
              <div
                className="password"
                style={{
                  justifyContent: "center",
                  marginTop: "23px",
                }}
              >
                <h5
                  style={{
                    fontFamily: "Poppins Regular",
                    fontWeight: "900",
                    color: apptheme === "light" ? "#006c93" : "#7cb8cd",
                  }}
                >
                  {applanguage === "TR" ? "Şifre" : "Password"}
                </h5>
                <div>
                  <p
                    style={{
                      fontFamily: "Poppins Light",
                      fontWeight: "900",
                      color:
                        apptheme === "light"
                          ? mytheme.light.optional
                          : mytheme.dark.optional,
                    }}
                  >
                    {user.password}
                  </p>
                </div>
              </div>

              <div
                className="edit"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "30px",
                }}
              >
                <Button
                  key={currentuser.id}
                  size="sm"
                  variant="soft"
                  color="warning"
                  onClick={() => {
                    handleClickOpen();
                  }}
                  startDecorator={<EditIcon />}
                  style={{
                    borderRadius: "16px",
                    boxShadow: "0px 0px 10px 1px rgb(0, 0, 0,0.2)",
                  }}
                >
                  {applanguage === "TR" ? "Düzenle" : "Edit"}
                </Button>
                <Dialog
                  sx={{
                    backdropFilter: "blur(5px) sepia(5%)",

                    "& .MuiDialog-paper": {
                      borderRadius: "40px",
                    },
                  }}
                  PaperProps={{
                    style: {
                      backgroundColor:
                        apptheme === "light"
                          ? mytheme.light.primary
                          : mytheme.dark.primary,
                    },
                  }}
                  open={open}
                  onClose={handleClose}
                  fullWidth
                  style={{
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <h4
                    className="title"
                    style={{
                      fontFamily: "Poppins Regular",
                      fontWeight: "900",
                      marginTop: "20px",
                    }}
                  >
                    {applanguage === "TR"
                      ? "Kullanıcı Profili"
                      : "User Profile"}
                  </h4>
                  <hr
                    style={{
                      color:
                        apptheme === "light"
                          ? mytheme.light.optional
                          : mytheme.dark.optional,
                    }}
                  />

                  <DialogContent>
                    <UserCard />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-content">
          <p
            style={{
              fontSize: "20px",
              marginTop: "180px",
              fontFamily: "Poppins Regular",
              color:
                apptheme === "light"
                  ? mytheme.light.optional
                  : mytheme.dark.optional,
            }}
          >
            {applanguage === "TR"
              ? "Detayları görmek için herhangi bir kullanıcıya tıklayın"
              : "Click any user to see the details"}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserContent;
