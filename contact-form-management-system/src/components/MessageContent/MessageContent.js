import React from "react";
import { useState, useEffect } from "react";
import "./MessageContent.css";
import PersonIcon from "@mui/icons-material/Person";
import LanguageIcon from "@mui/icons-material/Language";
import Button from "@mui/material/Button";

import Chip from "@mui/joy/Chip";

import ClearIcon from "@mui/icons-material/Clear";
import { currentMessage } from "../../store/slices/currentMessageSlice";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "styled-components";
import { language } from "../../store/slices/languageSlice";

const MessageContent = () => {
  const applanguage = useSelector((state) => state.language.language);
  const mytheme = useTheme();
  const apptheme = useSelector((state) => state.theme.theme);

  const nullMessage = {
    id: undefined,
    name: undefined,
    message: undefined,
    gender: undefined,
    country: undefined,
    creationDate: undefined,
    read: undefined,
  };
  const [message, setMessage] = useState([]);

  const dispatch = useDispatch();

  const currentmessage = useSelector((state) => state.currentMessage.value);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    getMessage();
  }, [currentmessage]);

  const getMessage = () => {
    if (currentmessage.id !== undefined) {
      fetch(`http://localhost:5165/api/message/${currentmessage.id}`, {
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
          setMessage(data.data.message);
        })
        .catch((err) => console.log(err));
    }
  };
  const deleteMessage = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5165/api/message/delete/${id}`,
        {
          method: "POST",
          headers: {
            token: localStorage.getItem("token"),
            "my-custom-header-key": "my-custom-header-value",
          },
        }
      );

      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
      return null;
    }
  };
  const handleDelete = async (message) => {
    deleteMessage(message.id);

    dispatch(currentMessage(nullMessage));

    setMessage(nullMessage);
  };

  return (
    <div className="box">
      <h4 className="title">
        {applanguage === "TR" ? "Mesaj İçeriği" : "Message Content"}
      </h4>
      <div className="date-box">
        <p
          className="date"
          style={{
            color:
              apptheme === "light"
                ? mytheme.light.optional
                : mytheme.dark.optional,
          }}
        >
          {" "}
          {message.creationDate}
        </p>
      </div>
      <hr
        style={{
          color:
            apptheme === "light"
              ? mytheme.light.optional
              : mytheme.dark.optional,
        }}
      />
      {message.id ? (
        <div>
          <div className="content">
            <div className="message-box">
              <p
                className="message"
                style={{
                  fontFamily: "Poppins Regular",
                  fontWeight: "300",
                  color:
                    apptheme === "light"
                      ? mytheme.light.optional
                      : mytheme.dark.optional,
                }}
              >
                {message.message}
              </p>
            </div>
          </div>

          <div className="info">
            <hr
              style={{
                color:
                  apptheme === "light"
                    ? mytheme.light.optional
                    : mytheme.dark.optional,
              }}
            />
            <div className="top-info">
              <div className="person">
                <Chip
                  startDecorator={
                    <PersonIcon style={{ width: "20px", height: "20px" }} />
                  }
                  variant="plain"
                  size="small"
                  style={{
                    color: "green",
                    fontSize: "13px",
                  }}
                >
                  {message.name}
                </Chip>
              </div>

              <div className="country">
                <Chip
                  startDecorator={
                    <LanguageIcon style={{ width: "20px", height: "20px" }} />
                  }
                  variant="plain"
                  color="primary"
                  size="small"
                  style={{
                    fontSize: "13px",
                  }}
                >
                  {message.country}
                </Chip>
              </div>
            </div>
            <div className="bottom-info">
              <div className="delete">
                <Button
                  key={message.id}
                  onClick={() => {
                    handleDelete(message);
                  }}
                  startIcon={
                    <ClearIcon style={{ width: "16px", height: "16px" }} />
                  }
                  style={{
                    textTransform: "none",
                    borderRadius: "20px",
                    fontSize: "12px",
                  }}
                  size="small"
                  color="error"
                  variant="outlined"
                >
                  {applanguage === "TR" ? "Sil" : "Delete"}
                </Button>
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
              ? "Detayları görmek için herhangi bir mesaja tıklayın"
              : "Click any message to see the details"}
          </p>
        </div>
      )}
    </div>
  );
};

export default MessageContent;
