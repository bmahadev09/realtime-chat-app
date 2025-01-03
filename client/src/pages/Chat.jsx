import { IconButton, Stack } from "@mui/material";
import AppLayout from "../components/layout/AppLayout";
import { useRef } from "react";
import { grayColor, orange } from "../constants/color";
import { AttachFile, Send } from "@mui/icons-material";
import { InputBox } from "../components/styles/StyledComponents";
import FileMenu from "../components/dialogs/FileMenu";
import { sampleMessages } from "../constants/sampleData";
import MessageComponent from "../components/shared/MessageComponent";

const user = {
  _id: "fgdgert",
  name: "John Doe",
};

const Chat = () => {
  const containerRef = useRef(null);

  return (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        height={"90%"}
        bgcolor={grayColor}
        sx={{
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {/* Chat Messages */}

        {sampleMessages.map((message) => (
          <MessageComponent key={message._id} message={message} user={user} />
        ))}
      </Stack>

      <form
        style={{
          height: "10%",
        }}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              rotate: "35deg",
            }}
          >
            <AttachFile />
          </IconButton>
          <InputBox placeholder="Type Message Here...." />
          <IconButton
            type="submit"
            sx={{
              rotate: "-35deg",
              bgcolor: orange,
              color: "white",
              marginLeft: "0.5rem",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
          >
            <Send />
          </IconButton>
        </Stack>
      </form>

      {/* <input type="file" /> */}
      <FileMenu />
    </>
  );
};
const WrappedChat = AppLayout()(Chat);
export default WrappedChat;
