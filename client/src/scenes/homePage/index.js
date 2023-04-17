import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";

function HomePage(props) {
  const user = useSelector((state) => state.user);
  const path = user.picturePath;
  return (
    <Box>
      <Navbar />

      {path && (
        <Box width={50} height={50}>
          <img width={50} height={50} alt='user' src={`http://localhost:4000/assets/${path}`} />
        </Box>
      )}

      {user.role === "admin" ? "admin" : "user"}
    </Box>
  );
}

export default HomePage;
