import React from "react";
import "./Form.css";
import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import MessageIcon from "@mui/icons-material/Message";
import Select from "@mui/material/Select";
import LanguageIcon from "@mui/icons-material/Language";
import AlertMessage from "../../AlertMessage/AlertMessage";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import cfms from "../../../assets/cfms-white.png";
import { w3cwebsocket as W3CWebSocket } from "websocket";

import ResponsiveDialog from "../../ResponsiveDialog/ResponsiveDialog";
const ContactForm = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");
  const [countries, setCountries] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [status, setStatus] = useState(400);

  // Event: When the connection is established

  useEffect(() => {
    getCountries();
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };
  const resetAlert = () => {
    setAlertMessage("");
  };
  const getCountries = () => {
    fetch("http://localhost:5165/api/countries", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setCountries(data.data.countries);
      })
      .catch((err) => console.log(err));
  };

  const handleClick = () => {
    let stt;
    fetch("http://localhost:5165/api/message/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, message, gender, country }),
    })
      .then((res) => {
        stt = res.status;
        setStatus(res.status);
        return res.json();
      })
      .then((data) => {
        if (stt === 200) {
          setAlertMessage("Message sent successfully.");
        } else if (stt === 400) {
          const msg = `${data.error}!
          STATUS CODE: ${status}`;
          throw new Error(msg);
        }
      })
      .catch((err) => setAlertMessage(err.message));
  };

  return (
    <div className="container">
      <div className="form-page">
        <div className="head">
          <div className="logo">
            <img src={cfms} alt="cfms" width="300px" />
          </div>
          <div className="text">
            <h5 className="welcome">
              Welcome to <b>CFMS!</b>
            </h5>
          </div>
        </div>

        <div className="form">
          <div className="form-container">
            <div className="form-card">
              <p className="header">Contact Form</p>
              <form>
                <div className="name field" style={{ marginTop: "20px" }}>
                  <AccountCircle className="account icon" />
                  <TextField
                    color="secondary"
                    style={{ width: "400px" }}
                    type="text"
                    label="Name"
                    variant="outlined"
                    placeholder="Enter Your Name"
                    inputProps={{ maxLength: 50 }}
                    onChange={handleNameChange}
                  />
                </div>

                <div className="gender-field" style={{ marginTop: "20px" }}>
                  <FormLabel
                    id="demo-row-radio-buttons-group-label"
                    sx={{
                      fontFamily: "Roboto Regular",
                      color: "gray",
                    }}
                  >
                    Gender
                  </FormLabel>

                  <RadioGroup
                    row="true"
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    orientation="horizontal"
                    className="radio-group"
                    onChange={handleGenderChange}
                  >
                    <FormControlLabel
                      value="female"
                      control={
                        <Radio
                          variant="soft"
                          color="info"
                          sx={{ marginRight: "5px" }}
                        />
                      }
                      label="Female"
                    />
                    <span className="radio-button-spacing" />
                    <FormControlLabel
                      value="male"
                      control={
                        <Radio
                          variant="soft"
                          color="info"
                          sx={{ marginRight: "5px" }}
                        />
                      }
                      label="Male"
                    />
                  </RadioGroup>
                </div>

                <div className="country field" style={{ marginTop: "20px" }}>
                  <LanguageIcon className="language icon" />
                  <div className="country-selection">
                    <FormControl sx={{ width: "400px" }}>
                      <InputLabel
                        sx={{
                          fontSize: "13px",
                          fontFamily: "Roboto",
                          textAlign: "left",
                          marginLeft: "10px",
                        }}
                      >
                        Country
                      </InputLabel>

                      <Select
                        color="secondary"
                        defaultValue="none"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={country}
                        onChange={handleCountryChange}
                      >
                        {countries.map((country, index) => (
                          <MenuItem key={index} value={country}>
                            {country}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>

                <div className="message field" style={{ marginTop: "40px" }}>
                  <MessageIcon className="message icon" />
                  <TextField
                    color="secondary"
                    style={{ width: "400px" }}
                    type="text"
                    label="Message"
                    multiline
                    rows="3"
                    variant="outlined"
                    placeholder="Enter Your Message"
                    inputProps={{ maxLength: 500 }}
                    onChange={handleMessageChange}
                    helperText={`${message.length}/500`}
                  />
                </div>

                <div className="send-button" style={{ paddingTop: "40px" }}>
                  <Button
                    onClick={handleClick}
                    variant="contained"
                    color="secondary"
                    sx={{
                      width: "190px",
                      backgroundImage: `linear-gradient(45deg, #101168, #7719d0)`,
                      ":hover": {
                        backgroundImage: `linear-gradient(45deg, #512bce, #101168)`,
                        color: "white",
                      },
                    }}
                  >
                    SEND
                  </Button>
                </div>

                <br />
              </form>
            </div>
            <div className="login-section" style={{ marginTop: "10px" }}>
              <Button
                startIcon={<SupervisorAccountIcon />}
                href="/login"
                className="login-button"
                variant="contained"
                sx={{
                  color: "#512bce",
                  backgroundColor: "white",
                  ":hover": {
                    backgroundImage: `linear-gradient(45deg, #512bce, #101168)`,
                    color: "white",
                  },
                }}
              >
                Admin/Reader Panel
              </Button>
            </div>
          </div>
        </div>
        {alertMessage && status === 400 ? (
          <AlertMessage
            key={Math.random()}
            message={alertMessage}
            reset={resetAlert}
          />
        ) : null}
        {status === 200 ? <ResponsiveDialog content="message-sent" /> : null}
      </div>
    </div>
  );
};

export default ContactForm;
