import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { signInUser } from "../../services/api";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const onSubmit = async (data) => {
    try {
      const response = await signInUser(data);
      console.log("response", response);
      if (response?.data?.status) {
        localStorage.setItem("token", response.data.user.token);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("errorerrorerrorerror", error);
      const errors = error?.response?.data?.errors;

      if (Array.isArray(errors)) {
        errors.forEach((err) => toast.error(err.msg));
      } else {
        toast.error(
          error?.response?.data?.message || error?.message || "Login failed"
        );
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "200px",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: "600px",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <TextField
          label="Username"
          variant="filled"
          fullWidth
          {...register("username", { required: "Username is required" })}
          error={!!errors.username}
          helperText={errors.username?.message}
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
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button type="submit" fullWidth variant="contained" color="primary">
          Submit
        </Button>

        {/* Register Link */}
        <Typography sx={{ fontSize: "14px", textAlign: "center" }}>
          Don't have an account?{" "}
          <Button
            variant="text"
            onClick={() => navigate("/register")}
            sx={{ padding: 0, textTransform: "none" }}
          >
            Register here
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
