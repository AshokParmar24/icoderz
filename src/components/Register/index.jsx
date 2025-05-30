// src/components/RegisterPage.js

import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { singUpUser } from "../../services/api";
import { toast } from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await singUpUser(data);
      console.log("response", response);
      if (response?.status===200) {
        toast.success(response?.data?.message || "user create successfully");
        navigate("/");
      }
    } catch (error) {
      const errors = error?.response?.data?.errors;
      if (Array.isArray(errors)) {
        errors.forEach((err) => toast.error(err.msg));
      } else {
        toast.error(
          error?.response?.data?.message || error?.message || "Signup failed"
        );
      }
    }
  };

  const password = watch("password");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "100px",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: "600px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Typography variant="h5" textAlign="center">
          Register
        </Typography>

        <TextField
          label="Username"
          variant="filled"
          fullWidth
          {...register("username", { required: "Username is required" })}
          error={!!errors.username}
          helperText={errors.username?.message}
        />

        <TextField
          label="Email"
          variant="filled"
          fullWidth
          {...register("email", { required: "Email is required" })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="filled"
          fullWidth
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          variant="filled"
          fullWidth
          {...register("confirmPassword", {
            required: "Confirm Password is required",
            validate: (value) => value === password || "Passwords do not match",
          })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button type="submit" fullWidth variant="contained" color="primary">
          Register
        </Button>

        <Typography sx={{ fontSize: "14px", textAlign: "center" }}>
          Already have an account?{" "}
          <Button
            variant="text"
            onClick={() => navigate("/")}
            sx={{ padding: 0, textTransform: "none" }}
          >
            Login here
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default Register;
