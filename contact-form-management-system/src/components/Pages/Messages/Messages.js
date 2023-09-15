import { useState, useEffect, React } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

import MessageTable from "../../MessageTable/MessageTable";
import { useSelector, useDispatch } from "react-redux";
import MessageContent from "../../MessageContent/MessageContent";
import { useTheme } from "styled-components";

const Messages = (props) => {
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

  return (
    <Grid container spacing={2} mt="20px">
      <Grid item xs={12} md={7.5}>
        <Item>
          <MessageTable />
        </Item>
      </Grid>
      <Grid item xs={12} md={0.5}></Grid>
      <Grid item xs={12} md={4} className="right-side">
        <Item>
          <MessageContent />
        </Item>
      </Grid>
    </Grid>
  );
};

export default Messages;
