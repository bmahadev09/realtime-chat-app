import { Stack } from "@mui/material";
import AppLayout from "../components/layout/AppLayout";
import { useRef } from "react";
import { grayColor } from "../constants/color";

const Chat = () => {
  const containerRef = useRef(null);

  return (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        width={"90%"}
        bgcolor={grayColor}
        sx={{
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        Chat
      </Stack>
    </>
  );
};
const WrappedChat = AppLayout()(Chat);
export default WrappedChat;
