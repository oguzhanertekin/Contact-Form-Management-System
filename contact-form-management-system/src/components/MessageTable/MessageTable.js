import React from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableFooter from "@mui/material/TableFooter";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import "./MessageTable.css";
import { useSelector, useDispatch } from "react-redux";
import { currentMessage } from "../../store/slices/currentMessageSlice";
import { useTheme } from "styled-components";
import { language } from "../../store/slices/languageSlice";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { IconButton } from "@mui/material";
import { styled } from "@mui/system";
import { TablePagination, tablePaginationClasses as classes } from "@mui/base";

export default function MessageTable({ messageID }) {
  const grey = {
    50: "#F3F6F9",
    100: "#E7EBF0",
    200: "#E0E3E7",
    300: "#CDD2D7",
    400: "#B2BAC2",
    500: "#A0AAB4",
    600: "#6F7E8C",
    700: "#3E5060",
    800: "#2D3843",
    850: "#2d3339",
    900: "#1A2027",
  };

  const CustomTablePagination = styled(TablePagination)(
    ({ theme }) => `
    & .${classes.spacer} {
      display: none;

    }
  
    & .${classes.toolbar}  {
      display: flex;
      align-items: center;
      margin-top:105px;
      border-radius: 10px;
      padding:2px;
    
      background-color: ${apptheme === "dark" ? grey[850] : "#fff"};
  
     
    }
  
    & .${classes.selectLabel} {
      padding-left: 8px;
      margin: 0;
      color: ${
        apptheme === "dark" ? mytheme.dark.optional : mytheme.light.optional
      };
      
    }
  
    & .${classes.select}{
      margin-left:5px;
      padding: 2px;
      border: 1px solid ${
        apptheme === "dark" ? mytheme.dark.optional : mytheme.light.optional
      };
      border-radius: 50px;
      background-color: transparent;
      color: ${apptheme === "dark" ? grey[500] : mytheme.light.optional};
  
  
      &:focus {
        outline: 1px solid ${
          apptheme === "dark" ? mytheme.dark.secondary : mytheme.light.secondary
        };
      }
    }
  
    & .${classes.displayedRows} {
      margin: 0;
  
      @media (min-width: 768px) {
        margin-left: auto;
      }
      color: ${
        apptheme === "dark" ? mytheme.dark.optional : mytheme.light.optional
      };
      padding:0 8px;
      
    }
  
    & .${classes.actions} {
      padding: 2px;
      border: 1px solid ${
        apptheme === "dark" ? mytheme.dark.optional : mytheme.light.optional
      };
      border-radius: 50px;
      text-align: center;
    }
  
    & .${classes.actions} > button {
      margin: 0 8px;
      border: transparent;
      border-radius: 4px;
      background-color: transparent;
      color: ${
        apptheme === "dark" ? mytheme.dark.optional : mytheme.light.optional
      };
  
      &:hover {
        background-color: ${apptheme === "dark" ? grey[700] : grey[200]};
      }
  
      &:disabled {
        opacity: 0.3;
      }
    }
    `
  );

  const dispatch = useDispatch();
  const applanguage = useSelector((state) => state.language.language);
  const mytheme = useTheme();
  const currentmessage = useSelector((state) => state.currentMessage.value);
  const apptheme = useSelector((state) => state.theme.theme);
  const [messages, setMessages] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - messages.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    getMessages();
  }, [currentmessage]);

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
        setMessages(data.data.messages);
      })
      .catch((err) => console.log(err));
  };

  const readMessage = (id) => {
    fetch(`http://localhost:5165/api/message/read/${id}`, {
      method: "POST",
      headers: {
        token: localStorage.getItem("token"),
        "my-custom-header-key": "my-custom-header-value",
      },
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err));
  };

  const handleRowClick = (message) => {
    readMessage(message.id);
    // messageID(message.id);
    dispatch(currentMessage(message));
  };

  // const sortedMessages = (orderBy) => {
  //   setOriginalMessages(messages);
  //   if (orderBy === "name") {
  //     setMessages(messages.sort((a, b) => a.name.localeCompare(b.name)));
  //   }
  //   if (orderBy === "country") {
  //     setMessages(messages.sort((a, b) => a.country.localeCompare(b.country)));
  //   }
  //   if (orderBy === "gender") {
  //     setMessages(messages.sort((a, b) => a.gender.localeCompare(b.gender)));
  //   }

  //   setMessages(originalMessages);
  // };

  return (
    <TableContainer
      component={Paper}
      style={{
        minHeight: 470,
        maxHeight: 470,
        overflow: "auto",
        boxShadow: "0px 0px 0px 0px ",
        backgroundColor:
          apptheme === "light" ? mytheme.light.primary : mytheme.dark.primary,
      }}
    >
      <Table
        aria-label="basic table"
        stickyHeader
        sx={{
          "& .MuiTableCell-head": {
            color:
              apptheme === "light"
                ? mytheme.light.secondary
                : mytheme.dark.optional,
            backgroundColor:
              apptheme === "light"
                ? mytheme.light.primary
                : mytheme.dark.primary,
          },
        }}
      >
        <TableHead>
          <TableRow className="head-row">
            <TableCell
              style={{
                fontSize: "14px",
                color:
                  apptheme === "light"
                    ? mytheme.light.secondary
                    : mytheme.dark.optional,
                fontFamily: "Poppins",
              }}
            >
              <Box
                style={{
                  display: "flex",
                }}
              >
                {applanguage === "TR" ? "İsim" : "Name"}
                <KeyboardArrowDownRoundedIcon
                // onClick={() => {
                //   sortedMessages("name");
                // }}
                />
              </Box>
            </TableCell>
            <TableCell
              style={{
                fontSize: "14px",
                color:
                  apptheme === "light"
                    ? mytheme.light.secondary
                    : mytheme.dark.optional,
                fontFamily: "Poppins",
              }}
            >
              <Box
                style={{
                  display: "flex",
                }}
              >
                {applanguage === "TR" ? "Ülke" : "Country"}
                <KeyboardArrowDownRoundedIcon
                // onClick={() => {
                //   sortedMessages("country");
                // }}
                />
              </Box>
            </TableCell>
            <TableCell
              style={{
                fontSize: "14px",
                color:
                  apptheme === "light"
                    ? mytheme.light.secondary
                    : mytheme.dark.optional,
                fontFamily: "Poppins",
              }}
            >
              <Box
                style={{
                  display: "flex",
                }}
              >
                {applanguage === "TR" ? "Cinsiyet" : "Gender"}
                <KeyboardArrowDownRoundedIcon
                // onClick={() => {
                //   sortedMessages("gender");
                // }}
                />
              </Box>
            </TableCell>
            <TableCell
              style={{
                fontSize: "14px",
                color:
                  apptheme === "light"
                    ? mytheme.light.secondary
                    : mytheme.dark.optional,
                fontFamily: "Poppins",
              }}
            >
              <Box
                style={{
                  display: "flex",
                }}
              >
                {applanguage === "TR" ? "Durum" : "Status"}
              </Box>
            </TableCell>
            <TableCell
              style={{
                fontSize: "14px",
                color:
                  apptheme === "light"
                    ? mytheme.light.secondary
                    : mytheme.dark.optional,
                fontFamily: "Poppins",
                paddingRight: "70px",
              }}
            >
              <Box
                style={{
                  display: "flex",
                }}
              >
                {applanguage === "TR" ? "Tarih" : "Date"}
              </Box>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? messages.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : messages
          ).map((message, index) => (
            <TableRow
              key={message.id}
              onClick={() => handleRowClick(message)}
              className="row"
              style={{
                backgroundColor:
                  apptheme === "light"
                    ? message.read === "true"
                      ? "#dafec4"
                      : "rgb(255, 232, 232)"
                    : null,
              }}
            >
              <TableCell
                className="custom-cell"
                style={{
                  color:
                    apptheme === "dark"
                      ? message.read === "true"
                        ? "#adf5a9"
                        : "#f55757"
                      : "black",
                }}
              >
                {message.name}
              </TableCell>
              <TableCell
                className="custom-cell"
                style={{
                  color:
                    apptheme === "dark"
                      ? message.read === "true"
                        ? "#adf5a9"
                        : "#f55757"
                      : "black",
                }}
              >
                {message.country}
              </TableCell>
              <TableCell
                className="custom-cell"
                style={{
                  color:
                    apptheme === "dark"
                      ? message.read === "true"
                        ? "#adf5a9"
                        : "#f55757"
                      : "black",
                }}
              >
                {message.gender}
              </TableCell>
              <TableCell
                className="custom-cell"
                style={{
                  color:
                    apptheme === "dark"
                      ? message.read === "true"
                        ? "#adf5a9"
                        : "#f55757"
                      : "black",
                }}
              >
                {message.read === "true" ? "Read" : "Unread"}
              </TableCell>
              <TableCell
                className="custom-cell"
                style={{
                  color:
                    apptheme === "dark"
                      ? message.read === "true"
                        ? "#adf5a9"
                        : "#f55757"
                      : "black",
                }}
              >
                {message.creationDate.split("T")[0]}
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <tr style={{ height: 41 * emptyRows }}>
              <td colSpan={3} />
            </tr>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <CustomTablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={5}
              count={messages.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  "aria-label": "rows per page",
                },
                actions: {
                  showFirstButton: true,
                  showLastButton: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
