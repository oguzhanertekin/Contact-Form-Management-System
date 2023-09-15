import { useState, React } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import cfms from "../../../assets/cfms-white.png";
import logo from "../../../assets/logo.png";
import Input from "@mui/joy/Input";
import FormLabel from "@mui/joy/FormLabel";
import FormControl from "@mui/joy/FormControl";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/joy/Button";
import LoginIcon from "@mui/icons-material/Login";
import AlertMessage from "../../AlertMessage/AlertMessage";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authUser } from "../../../store/slices/authSlice";
import { logged } from "../../../store/slices/logSlice";
import MessageIcon from "@mui/icons-material/Message";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "#1A2027" : "rgba(255, 255, 255, 1)",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "500px",
  borderRadius: "15px",
  boxShadow: "0px 0px 100px 0px rgba(0,0,0,0.75)",
}));

const Login = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [alertMessage, setAlertMessage] = useState("");

  const [inputError, setInputError] = useState("");

  const handleReturn = () => {
    navigate("/form");
  };

  function userLogin() {
    dispatch(logged(true));

    navigate("/account/profile");
  }
  const resetAlert = () => {
    setAlertMessage("");
  };

  const handleNameChange = (event) => {
    setUsername(event.target.value);
    setInputError("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setInputError("");
  };

  const handleProtectedClick = () => {
    let stt;
    fetch("http://localhost:5165/api/user/check-login", {
      method: "POST",
      headers: {
        token: localStorage.getItem("token"),
        "my-custom-header-key": "my-custom-header-value",
      },
    })
      .then((res) => {
        stt = res.status;
        return res.json();
      })
      .then((data) => {
        if (stt === 200) {
          dispatch(authUser(data.data.user));

          userLogin();
        } else {
          const msg = `${data.error}!`;
          throw new Error(msg);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleLogin = () => {
    let stt;
    fetch("http://localhost:5165/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((res) => {
        stt = res.status;

        return res.json();
      })
      .then((data) => {
        if (stt === 200) {
          localStorage.setItem("token", data.data.token);
          handleProtectedClick();
        } else if (stt === 400) {
          const msg = `${data.error}!`;
          throw new Error(msg);
        }
      })
      .catch((err) => {
        if (err.message.indexOf("Username") !== -1) {
          setInputError("name-error");
        } else if (err.message.indexOf("Password") !== -1) {
          setInputError("password-error");
        }
        setAlertMessage(err.message + `STATUS CODE: ${stt}`);
      });
  };

  return (
    <div>
      <div className="container">
        <Grid container spacing={2} mt="20px">
          <Grid item xs={12} md={8}>
            <div className="left-side">
              <div className="logo">
                <a href="/">
                  <img src={cfms} alt="logo" width="300px" />
                </a>
              </div>
              <div className="title">
                <p>Welcome to</p>
              </div>
              <div className="text">
                <p>CFMS Admin/Reader Panel</p>
              </div>
              <div className="btn">
                <Button
                  startDecorator={<MessageIcon />}
                  href="/form"
                  variant="contained"
                  onClick={handleReturn}
                  sx={{
                    borderRadius: "30px",
                    color: "#512bce",
                    backgroundColor: "white",
                    ":hover": {
                      backgroundImage: `linear-gradient(45deg, #512bce, #101168)`,
                      color: "white",
                    },
                  }}
                >
                  Form Panel
                </Button>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={4} className="right-side">
            <Item>
              <div className="login-form">
                <div className="head-logo">
                  <img src={logo} alt="logo" width="200px" />
                </div>
                <div className="input-section">
                  <div className="username">
                    <FormControl
                      sx={{
                        marginTop: "25px",
                      }}
                    >
                      <FormLabel
                        sx={{
                          fontFamily: "Poppins Light",
                          fontWeight: "600",
                        }}
                      >
                        Username
                      </FormLabel>
                      <Input
                        error={inputError === "name-error" ? true : false}
                        endDecorator={
                          <PersonIcon
                            sx={{
                              color: "rgb(170, 170, 170)",
                            }}
                          />
                        }
                        placeholder="Enter Your Username"
                        variant="soft"
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
                        }}
                        onChange={handleNameChange}
                      />
                    </FormControl>
                  </div>

                  <div className="password">
                    <FormControl
                      sx={{
                        marginTop: "25px",
                      }}
                    >
                      <FormLabel
                        sx={{
                          fontFamily: "Poppins Light",
                          fontWeight: "600",
                        }}
                      >
                        Password
                      </FormLabel>
                      <Input
                        error={inputError === "password-error" ? true : false}
                        endDecorator={
                          <VpnKeyIcon
                            sx={{
                              color: "rgb(170, 170, 170)",
                            }}
                          />
                        }
                        placeholder="Enter Your Password"
                        variant="soft"
                        type="password"
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
                        }}
                        onChange={handlePasswordChange}
                      />
                    </FormControl>
                  </div>

                  <div className="submit-button">
                    <Button
                      sx={{
                        borderRadius: "30px",
                        marginTop: "40px",

                        backgroundImage: `linear-gradient(45deg, #101168, #7719d0)`,
                        ":hover": {
                          backgroundImage: `linear-gradient(45deg, #512bce, #101168)`,
                          color: "white",
                        },
                      }}
                      size="sm"
                      variant="solid"
                      endDecorator={<LoginIcon />}
                      onClick={handleLogin}
                    >
                      LOGIN
                    </Button>
                  </div>
                  {alertMessage ? (
                    <AlertMessage
                      key={Math.random()}
                      message={alertMessage}
                      reset={resetAlert}
                    />
                  ) : null}
                </div>
              </div>
            </Item>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Login;
