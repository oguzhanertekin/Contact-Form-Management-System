import "./App.css";

import Form from "./components/Pages/Form/Form";
import Login from "./components/Pages/Login/Login";
import Account from "./components/Pages/Account/Account";
import Messages from "./components/Pages/Messages/Messages";
import Users from "./components/Pages/Users/Users";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { React } from "react";
import { useSelector } from "react-redux";
import NavbarLayout from "./layouts/NavbarLayout";
import Unauthorized from "./components/Pages/ErrorPage/Unauthorized";
import NotFound from "./components/Pages/ErrorPage/NotFound";
import Reports from "./components/Pages/Reports/Reports";
import { ThemeProvider } from "styled-components";
import theme from "./components/theme";

function App() {
  const loggedIn = useSelector((state) => state.log.loggedValue);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/form" element={<Form />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/account/*"
            element={
              loggedIn ? (
                <NavbarLayout>
                  <Routes>
                    <Route path="/" element={<Account />} />
                    <Route path="/profile" element={<Account />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/reports" element={<Reports />} />
                  </Routes>
                </NavbarLayout>
              ) : (
                <Navigate to="/unauthorized" />
              )
            }
          />

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
