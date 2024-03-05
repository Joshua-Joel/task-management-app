import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckIcon from "@mui/icons-material/Check";
import {
  Alert,
  Button,
  InputLabel,
  Link,
  MenuItem,
  Select,
} from "@mui/material";
import { FormControl } from "@mui/material";
// import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    password: "",
    role: "",
  });
  const [emailValidationError, setEmailValidationError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [conflictStatus, setConflictStatus] = useState(false);
  // const [isValid,setIsValid] = useState(false);
  // const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  const handleInputChange = (e) => {
    setConflictStatus(false);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  const handleSignup = async (e) => {
    const isValidEmail = emailRegex.test(formData.user_email);
    const isValidPassword = passwordRegex.test(formData.password);
    if (!isValidEmail) {
      setEmailValidationError(true);
    } 
    else if (!isValidPassword) {
      setEmailValidationError(false);
      setPasswordError(true);
    } else {
      try {
        e.preventDefault();
        // if (formData) {
        //   setIsValid(true);
        // }
        const response = await fetch(
          "http://localhost:3000/api/user/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const res = await response.json();
        if (res.message === "success") {
          setSignupSuccess(true);
        }
        if (res.message === "User already exists") {
          setConflictStatus(true);
        }
        setFormData({
          user_name: "",
          user_email: "",
          password: "",
          role: "",
        });
        setPasswordError(false);
        setEmailValidationError(false);
      } catch (error) {
        if (error.response.status === 400) {
          setConflictStatus(true);
        }
      }
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
          height: "85%",
          padding: "20px",
          borderRadius: "10px",
          flexDirection: "column",
        }}
        component="form"
        noValidate
        autoComplete="off"
      >
        <div>
          <strong style={{ fontSize: "22px" }}>Sign up</strong>
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
          <FormControl sx={{ width: "45ch" }} fullWidth>
            <TextField
              style={{ margin: " 1px 0 10px 0" }}
              id="text-field-1"
              name="user_name"
              label="User name"
              variant="outlined"
              value={formData.user_name}
              onChange={handleInputChange}
              required
            />

            <TextField
              style={{ margin: " 10px 0 10px 0" }}
              id="text-field-2"
              name="user_email"
              label="User email"
              variant="outlined"
              value={formData.user_email}
              onChange={handleInputChange}
              required
            />
            {emailValidationError && (
              <Alert
                icon={<ErrorOutlineIcon fontSize="inherit" />}
                severity="error"
              >
                Invalid Email
              </Alert>
            )}
            <TextField
              style={{ margin: "10px 0 10px 0" }}
              id="password-field-1"
              name="password"
              type="password"
              label="Password"
              variant="outlined"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            {passwordError && (
              <Alert
                icon={<ErrorOutlineIcon fontSize="inherit" />}
                severity="error"
              >
                Weak password
              </Alert>
            )}
            <FormControl fullWidth style={{ margin: "10px 0" }}>
              <InputLabel id="role">Role</InputLabel>
              <Select
                required
                labelId="role"
                value={formData.role}
                name="role"
                label="Role"
                onChange={handleInputChange}
              >
                {/* <MenuItem value={""} disabled="true">- role -</MenuItem> */}
                <MenuItem value={"manager"}>Manager</MenuItem>
                <MenuItem value={"employee"}>Employee</MenuItem>
              </Select>
            </FormControl>
            {signupSuccess && (
              <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                Registered succesfully..!
              </Alert>
            )}
            {conflictStatus && (
              <Alert
                icon={<ErrorOutlineIcon fontSize="inherit" />}
                severity="error"
              >
                Email is already associated with another account..!
              </Alert>
            )}
            <Button
              disabled={false}
              style={{ margin: "15px 0" }}
              variant="contained"
              onClick={handleSignup}
            >
              Register
            </Button>
            {/* <hr
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                width: "60%",
                alignItems: "center",
                backgroundColor: "black",
              }}
            /> */}
            {/* <Button
              style={{ margin: "10px 0" }}
              onClick={() => {
                navigate("/login");
              }}
              variant="outlined"
            >
              Login
            </Button> */}
            <Link href="/login" underline="hover">
              Login
            </Link>
          </FormControl>
        </div>
      </Box>
    </div>
  );
};
