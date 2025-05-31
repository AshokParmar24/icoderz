import React from "react";
 import Navbar from "./Navbar";
import { Box } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
 
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Navbar />
        {/* Add padding to offset fixed AppBar */}
        <Box sx={{ mt: 8, p: 6 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default Layout;
