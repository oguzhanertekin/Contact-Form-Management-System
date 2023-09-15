import { useState, useEffect, React } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Paper from "@mui/material/Paper";

import { useSelector, useDispatch } from "react-redux";

import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Avatar from "@mui/material/Avatar";
import { currentUser } from "../../store/slices/currentUserSlice";
import "./UserTable.css";
import { useTheme } from "styled-components";
import { language } from "../../store/slices/languageSlice";

const UserTable = () => {
  const applanguage = useSelector((state) => state.language.language);
  const apptheme = useSelector((state) => state.theme.theme);
  const mytheme = useTheme();

  const dispatch = useDispatch();

  const currentuser = useSelector((state) => state.currentUser.value);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, [currentuser]);

  const getUsers = () => {
    fetch("http://localhost:5165/api/users", {
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
        setUsers(data.data.users);
      })
      .catch((err) => console.log(err));
  };

  const handleRowClick = (user) => {
    dispatch(currentUser(user));
  };

  return (
    <TableContainer
      component={Paper}
      style={{
        minHeight: 400,
        maxHeight: 400,
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
              {applanguage === "TR" ? "Fotoğraf" : "Photo"}
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
              ID
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
              {applanguage === "TR" ? "Kullanıcı Adı" : "Username"}
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
              {applanguage === "TR" ? "Rol" : "Role"}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow
              key={index}
              className="user-row"
              onClick={() => handleRowClick(user)}
            >
              <TableCell className="custom-cell">
                <Avatar alt="user photo" src={user.base64Photo} />
              </TableCell>
              <TableCell
                className="custom-cell"
                style={{
                  color:
                    apptheme === "light"
                      ? mytheme.light.secondary
                      : mytheme.dark.secondary,
                }}
              >
                {user.id}
              </TableCell>
              <TableCell
                className="custom-cell"
                style={{
                  color:
                    apptheme === "light"
                      ? mytheme.light.optional
                      : mytheme.dark.optional,
                }}
              >
                {user.username}
              </TableCell>
              <TableCell
                className="custom-cell"
                style={{
                  color:
                    apptheme === "light"
                      ? mytheme.light.optional
                      : mytheme.dark.optional,
                }}
              >
                {user.role}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
