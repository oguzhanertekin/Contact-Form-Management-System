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
        <h1 className="error">404 PAGE NOT FOUND!</h1>

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
