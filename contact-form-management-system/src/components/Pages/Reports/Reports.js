import React from "react";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { useTheme } from "styled-components";
import { useSelector } from "react-redux";
import { language } from "../../../store/slices/languageSlice";

export default function Reports() {
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

  useEffect(() => {
    getMessages();
  }, []);

  const [messages, setMessages] = useState();

  const countryFilter = (axis) => {
    const countries = {};
    if (messages) {
      messages.map((message) => {
        const country = message.country;
        countries[country] = countries[country] ? countries[country] + 1 : 1;
      });
      const entries = Object.entries(countries);
      entries.sort((a, b) => {
        return b[1] - a[1];
      });
      const sortedData = Object.fromEntries(entries);
      if (axis === "country") {
        return Object.keys(sortedData);
      } else if (axis === "count") {
        return Object.values(sortedData);
      }
    }
  };
  const genderFilter = (gender) => {
    var female = 0;
    var male = 0;
    if (messages) {
      messages.map((message) => {
        {
          message.gender === "female" ? female++ : male++;
        }
      });
      if (gender === "female") {
        return female;
      } else if (gender === "male") {
        return male;
      }
    }
  };

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

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );

  const countryOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        labels: "false",
        position: "top",
      },
    },
  };

  const genderOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "top",
      },
    },
  };
  const labels = countryFilter("country");
  const messageCount = countryFilter("count");

  const countryData = {
    labels,
    datasets: [
      {
        data: messageCount,
        backgroundColor:
          apptheme === "light"
            ? "rgba(20, 178, 226, 0.5)"
            : "rgb(103, 212, 245)",
      },
    ],
  };
  const female = genderFilter("female");
  const male = genderFilter("male");
  const gender = [female, male];
  const genderData = {
    labels: applanguage === "TR" ? ["Kadın", "Erkek"] : ["Female", "Male"],
    datasets: [
      {
        label: applanguage === "TR" ? "Mesaj Sayısı" : "Message Count",
        data: gender,
        backgroundColor:
          apptheme === "light"
            ? ["rgba(107, 46, 164,0.5)", "rgba(20, 178, 226, 0.5)"]
            : ["rgb(139, 43, 161)", "rgb(103, 212, 245)"],
        borderColor: ["rgba(153, 102, 255, 1)", "rgba(72, 139, 210,1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Grid container spacing={2} mt="20px">
      <Grid item xs={12} md={12}>
        <Item>
          <div>
            <p
              style={{
                fontFamily: "Poppins Regular",
                fontWeight: "600",
                color:
                  apptheme === "light"
                    ? mytheme.light.secondary
                    : mytheme.dark.secondary,
              }}
            >
              {applanguage === "TR"
                ? "Ülkelere göre mesajlar"
                : "Messages for each country"}
            </p>
          </div>
          <div style={{ height: "420px" }}>
            <Bar options={countryOptions} data={countryData} />
          </div>
        </Item>
        <Item
          style={{
            marginTop: "20px",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "Poppins Regular",
                fontWeight: "600",
                color:
                  apptheme === "light"
                    ? mytheme.light.secondary
                    : mytheme.dark.secondary,
              }}
            >
              {applanguage === "TR"
                ? "Cinsiyetlere göre mesajlar"
                : "Messages for each gender"}
            </p>
          </div>
          <div style={{ height: "420px" }}>
            <Pie data={genderData} options={genderOptions} />
          </div>
        </Item>
      </Grid>
    </Grid>
  );
}
