import { Box, Typography } from "@mui/material";
import AppLayout from "../components/layout/AppLayout";

const Home = () => {
  return (
    <Box bgcolor={"rgba(0, 0, 0, 0.1)"} height={"100%"}>
      <Typography p={"2rem"} variant="h5">
        select a friend to chat with or create a group
      </Typography>
    </Box>
  );
};
const WrappedHome = AppLayout()(Home);
export default WrappedHome;
