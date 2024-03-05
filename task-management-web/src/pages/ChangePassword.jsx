import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Button, Alert } from "@mui/material";
import { FormControl } from "@mui/material";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";

export const ChangePassword = () => {
  const navigate = useNavigate();
  const [wrongPasswordStatus, setWrongPasswordStatus] = useState(false);
  const [successStatus, setSuccessStatus] = useState(false);
  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };
  const handleChangePassword = async (e) => {
    setWrongPasswordStatus(false);
    try {
      e.preventDefault();
      var headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Accept", "application/json");
      const response = await fetch(
        "http://localhost:3000/api/user/change-password",
        {
          method: "PATCH",
          redirect: "follow",
          credentials: "include",
          headers: headers,
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (data.message === "success") {
        setSuccessStatus(true);
        console.log(data.message);
      } else if (response.status === 401) {
        if (data.error === "Invalid credentials") {
          setFormData({ ...formData, current_password: "" });
          setWrongPasswordStatus(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{
        backgroundColor: "#1976d2",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        style={{
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          width: "40%",
          margin: "0 auto",
          height: "68%",
          padding: "10px",
          borderRadius: "10px",
          flexDirection: "column",
        }}
        component="form"
        noValidate
        autoComplete="off"
      >
        <div>
          <strong style={{ fontSize: "22px" }}>Change password</strong>
        </div>
        <div
          noValidate
          autoComplete="off"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "500px",
            height: "300px",
            padding: "20px",
            borderRadius: "10px",
            flexDirection: "column",
          }}
        >
          <FormControl sx={{ width: "45ch" }}>
            <TextField
              style={{ margin: " 10px 0 10px 0" }}
              id="current_password"
              name="current_password"
              type="password"
              label="Current password"
              variant="outlined"
              value={formData.current_password}
              onChange={handleInputChange}
              required
            />
            <TextField
              style={{ margin: "20px 0" }}
              id="new_password"
              name="new_password"
              type="password"
              label="New password"
              variant="outlined"
              value={formData.new_password}
              onChange={handleInputChange}
              required
            />
            {wrongPasswordStatus && (
              <Alert
                icon={<ErrorOutlineIcon fontSize="inherit" />}
                severity="success"
              >
                Wrong password. Please try again!
              </Alert>
            )}
            {successStatus && (
              <Alert
                severity="success"
              >
                Password successfully changed..!
              </Alert>
            )}
            <Button
              style={{ margin: "20px 0" }}
              onClick={handleChangePassword}
              variant="contained"
            >
              Change password
            </Button>
            <Link href="/login" underline="hover">Go Back</Link>
          </FormControl>
        </div>
      </Box>
    </div>
  );
};
