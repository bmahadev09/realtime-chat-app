import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";
import { usernameValidator } from "../utils/validator";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useStrongPassword();

  const avatar = useFileHandler("single");

  const handleSignUp = (e) => {
    e.preventDefault();
  };

  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(rgb(200,200,200,0.5), rgb(120,110,220,0.5))",
      }}
    >
      <Container
        component={"main"}
        maxWidth={"xs"}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 4,
          }}
        >
          {isLogin ? (
            <>
              <Typography variant={"h5"}>Login</Typography>
              <form
                onSubmit={handleLogin}
                style={{ width: "100%", marginTop: "20px" }}
              >
                <TextField
                  required
                  fullWidth
                  label={"Username"}
                  margin={"normal"}
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                />

                <TextField
                  required
                  fullWidth
                  label={"Password"}
                  type={"password"}
                  margin={"normal"}
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                />
                <Button
                  fullWidth
                  variant={"contained"}
                  color={"primary"}
                  type="submit"
                >
                  Login
                </Button>
                <Typography textAlign={"center"} m={"10px 0"} variant={"body2"}>
                  Don`t have an account?
                </Typography>
                <Button
                  fullWidth
                  variant={"text"}
                  color={"primary"}
                  onClick={() => setIsLogin(false)}
                >
                  Register
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography variant={"h5"}>Sign Up</Typography>
              <form
                onSubmit={handleSignUp}
                style={{ width: "100%", marginTop: "20px" }}
              >
                <Stack
                  position={"relative"}
                  width={"10rem"}
                  margin={"auto"}
                  spacing={2}
                >
                  <Avatar
                    sx={{
                      width: "10rem",
                      height: "10rem",
                      objectFit: "contain",
                    }}
                    src={avatar.preview}
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      color: "primary.main",
                      backgroundColor: "white",
                    }}
                    component="label"
                  >
                    <>
                      <CameraAltIcon />
                      <VisuallyHiddenInput
                        type="file"
                        onChange={avatar.changeHandler}
                      />
                    </>
                  </IconButton>
                </Stack>

                {avatar.error && (
                  <Typography
                    width={"fit-content"}
                    m={"1rem auto"}
                    display={"block"}
                    color={"error"}
                    variant={"caption"}
                  >
                    {avatar.error}
                  </Typography>
                )}

                <TextField
                  required
                  fullWidth
                  label={"Name"}
                  margin={"normal"}
                  variant="outlined"
                  value={name.value}
                  onChange={name.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label={"Bio"}
                  margin={"normal"}
                  variant="outlined"
                  value={bio.value}
                  onChange={bio.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label={"Username"}
                  margin={"normal"}
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                />

                {username.error && (
                  <Typography color={"error"} variant={"caption"}>
                    {username.error}
                  </Typography>
                )}

                <TextField
                  required
                  fullWidth
                  label={"Password"}
                  type={"password"}
                  margin={"normal"}
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                />
                {password.error && (
                  <Typography color={"error"} variant={"caption"}>
                    {password.error}
                  </Typography>
                )}
                <Button
                  fullWidth
                  variant={"contained"}
                  color={"primary"}
                  type="submit"
                >
                  Sign Up
                </Button>
                <Typography textAlign={"center"} m={"10px 0"} variant={"body2"}>
                  Already have an account?
                </Typography>
                <Button
                  fullWidth
                  variant={"text"}
                  color={"primary"}
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
};
export default Login;
