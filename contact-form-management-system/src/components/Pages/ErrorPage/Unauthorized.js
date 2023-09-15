import { React } from "react";
import "./ErrorPage.css";
import { Button } from "@mui/joy/";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/form");
  };
  return (
    <div className="container">
      <div className="unauthorized-page">
        <h1 className="error">403 ERROR!</h1>
        <p className="error-text">Unauthorized Page!</p>
        <Button
          size="md"
          variant="soft"
          onClick={handleClick}
          style={{
            borderRadius: "20px",
          }}
        >
          Back to homepage
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
