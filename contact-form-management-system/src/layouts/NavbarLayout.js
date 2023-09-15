import React from "react";
import AppBar from "../components/AppBar/AppBar";
import { useState, useEffect } from "react";
import EmailIcon from "@mui/icons-material/Email";
import { Toaster, toast } from "sonner";
import Alert from "@mui/joy/Alert";
import Button from "@mui/joy/Button";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useNavigate } from "react-router-dom";
import audio from "../assets/notification.mp3";
import { useSelector, useDispatch } from "react-redux";
import { currentMessage } from "../store/slices/currentMessageSlice";

const enhancedToast = toast;
enhancedToast.warn = (message, data) =>
  toast(message, {
    ...data,
    className: "sonner-toast-warn",
  });

const notificationAudio = new Audio(audio);

const NavbarLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (message) => {
    navigate("/account/messages");
    dispatch(currentMessage(message));
  };

  useEffect(() => {
    const socket = new W3CWebSocket("ws://localhost:8490");
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      notificationAudio.play();
      toast(message.name, {
        icon: (
          <EmailIcon
            style={{ paddingRight: "5px", color: "rgb(155, 80, 169)" }}
            onClick={() => {
              handleClick(message);
            }}
          />
        ),
        style: {
          color: "purple",
          boxShadow: "0px 0px 20px 7px rgba(0,0,0,0.3)",
          borderRadius: "15px",
        },

        description: (
          <div>
            <p
              style={{
                color: "black",
                // wordWrap: "break-word",
                whiteSpace: "nowrap",
                width: "300px",

                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {message.message}
            </p>
          </div>
        ),
      });
    };

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  return (
    <>
      <div className="container">
        <AppBar />

        <Toaster
          duration="20000"
          position="bottom-right"
          toastOptions={{
            style: {
              paddingLeft: "10px",
              textAlign: "left",
              fontSize: "14px",
            },
          }}
          richColors
          closeButton
        />

        {children}
      </div>
    </>
  );
};

export default NavbarLayout;
