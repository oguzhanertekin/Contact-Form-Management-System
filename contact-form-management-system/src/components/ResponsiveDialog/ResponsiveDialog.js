import * as React from "react";

import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ResponsiveDialog({ content }) {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
    if (content === "message-sent") {
      window.location.reload();
    } else if (content === "user-saved") {
      navigate("/account/users");
    } else if (content === "user-added") {
      navigate("/account/users");
    }
  };

  const message = () => {
    if (content === "message-sent") {
      return "Message Sent Successfully!";
    } else if (content === "user-saved") {
      return "User Saved Successfully!";
    } else if (content === "user-added") {
      return "User Added Successfully!";
    }
  };
  return (
    <React.Fragment>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => handleClose()}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Sheet
          variant="solid"
          color="info"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
            wordWrap: "break-word",
          }}
        >
          <ModalClose
            sx={{
              top: "calc(-1/4 * var(--IconButton-size))",
              right: "calc(-1/4 * var(--IconButton-size))",
              boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
              borderRadius: "50%",
              bgcolor: "background.surface",
            }}
            size="sm"
          />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="sm"
            fontFamily="Poppins Regular"
            fontSize="20px"
            mb={1}
            style={{
              textAlign: "center",
            }}
          >
            {message()}
          </Typography>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
