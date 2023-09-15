import { useState, React, Link } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import "./Profile.css";
import { language } from "../../../store/slices/languageSlice";

const Profile = (props) => {
  const user = useSelector((state) => state.user.value);
  const applanguage = useSelector((state) => state.language.language);
  const userPhoto = user.base64Photo;

  return (
    <Grid container>
      <Grid item xs={12} md={0.5} />
      <Grid item xs={12} md={4}>
        <div className="welcome-box" style={{ marginTop: "100px" }}>
          <div className="profile-photo">
            <img
              src={userPhoto}
              alt="logo"
              width="200px"
              style={{
                border: "8px solid #f5d2f9",
                borderRadius: "90px",
                boxShadow: "0px 0px 30px 5px rgba(256,256,256,0.55)",
              }}
            />
          </div>
        </div>
      </Grid>
      <Grid item xs={12} md={7}>
        <div
          className="welcome-box"
          style={{
            justifyContent: "left",
            textAlign: "center",
            marginTop: "70px",
          }}
        >
          <div className="welcome-text">
            <div className="wrapper">
              <svg>
                <text x="50%" y="30%" dy=".70em" textAnchor="middle">
                  {applanguage === "TR" ? "Hoşgeldin!" : "Welcome!"}
                </text>
              </svg>
            </div>
            <p
              className="flipInX"
              style={{
                fontSize: "70px",
                fontFamily: "Poppins Light",
              }}
            >
              {user.username}
            </p>
          </div>

          <div className="welcome-text"></div>
        </div>
      </Grid>
      <Grid item xs={12} md={0.5} />
    </Grid>
  );
};

export default Profile;
