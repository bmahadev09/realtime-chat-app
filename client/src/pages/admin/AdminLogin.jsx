import { useInputValidation } from "6pp";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { adminLogin, getAdmin } from "../../redux/thunks/admin";
import { useEffect } from "react";

const AdminLogin = () => {
  const { isAdmin } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const secretKey = useInputValidation("");

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(adminLogin(secretKey.value));
  };

  useEffect(() => {
    dispatch(getAdmin());
  }, [dispatch]);

  if (isAdmin) return <Navigate to="/admin/dashboard" />;

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
          <Typography variant={"h5"}>Admin Login</Typography>
          <form
            onSubmit={handleLogin}
            style={{ width: "100%", marginTop: "20px" }}
          >
            <TextField
              required
              fullWidth
              label={"secretKey"}
              type={"password"}
              margin={"normal"}
              variant="outlined"
              value={secretKey.value}
              onChange={secretKey.changeHandler}
            />
            <Button
              fullWidth
              variant={"contained"}
              color={"primary"}
              type="submit"
            >
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};
export default AdminLogin;
