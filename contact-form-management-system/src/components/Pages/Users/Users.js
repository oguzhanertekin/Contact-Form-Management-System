import { useState, React } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Button from "@mui/joy/Button";

import { useSelector } from "react-redux";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import UserTable from "../../UserTable/UserTable";
import UserContent from "../../UserContent/UserContent";
import AddReaderCard from "../../AddReaderCard/AddReaderCard";
import Dialog from "@mui/material/Dialog";
import { useTheme } from "styled-components";
import { language } from "../../../store/slices/languageSlice";

import DialogContent from "@mui/material/DialogContent";

const Users = (props) => {
  const applanguage = useSelector((state) => state.language.language);

  const mytheme = useTheme();
  const apptheme = useSelector((state) => state.theme.theme);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor:
      apptheme === "light" ? mytheme.light.primary : mytheme.dark.primary,
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "500px",
    borderRadius: "15px",
    boxShadow: "0px 0px 50px 0px rgba(0,0,0,0.75)",
  }));

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container spacing={2} mt="20px">
      <Grid item xs={12} md={7.5}>
        <Item>
          <UserTable />
          <hr
            style={{
              color:
                apptheme === "light"
                  ? mytheme.light.optional
                  : mytheme.dark.optional,
            }}
          />
          <Button
            className="add-user"
            size="small"
            variant="outlined"
            onClick={handleClickOpen}
            style={{
              color:
                apptheme === "light"
                  ? mytheme.light.secondary
                  : mytheme.dark.optional,
              border: "0.75px solid ",
              boxShadow: "0px 0px 4px 1px ",
              borderRadius: "30px",
            }}
            startDecorator={
              <PersonAddAltOutlinedIcon
                style={{
                  marginRight: "7px",
                }}
              />
            }
          >
            {applanguage === "TR" ? "Okuyucu Ekle" : "Add Reader"}
          </Button>
        </Item>
      </Grid>
      <Grid item xs={12} md={0.5}></Grid>
      <Grid item xs={12} md={4} className="right-side">
        <Item>
          <UserContent />
        </Item>
      </Grid>
      <Dialog
        sx={{
          backdropFilter: "blur(5px) sepia(5%)",

          "& .MuiDialog-paper": {
            borderRadius: "40px",
          },
        }}
        open={open}
        onClose={handleClose}
        fullWidth
        style={{
          justifyContent: "center",
          textAlign: "center",
        }}
        PaperProps={{
          style: {
            backgroundColor:
              apptheme === "light"
                ? mytheme.light.primary
                : mytheme.dark.primary,
          },
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
          {applanguage === "TR" ? "Kullanıcı Ekle" : "Add User"}
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
          <AddReaderCard />
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default Users;
