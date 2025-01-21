import { Box, Typography } from "@mui/material";
import { memo } from "react";
import { lightBlue } from "../../constants/color";
import moment from "moment";
import { fileFormat } from "../../lib/features";
import RenderAttachment from "./RenderAttachment";

const MessageComponent = ({ message, user }) => {
  const { content, sender, attachments = [], createdAt } = message;

  const sameSender = sender?._id === user?._id;

  //console.log(sameSender, sender, user?._id);

  const timeAgo = moment(createdAt).fromNow();

  return (
    <div
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: sameSender ? "#f3f3f3" : "#e3e3e3",
        padding: "0.5rem",
        borderRadius: "0.5rem",
        maxWidth: "70%",
        color: "black",
      }}
    >
      {!sameSender && (
        <Typography color={lightBlue} fontWeight={"600"} variant="caption">
          {sender.name}
        </Typography>
      )}
      {content && (
        <Typography
          style={{
            wordBreak: "break-word",
          }}
        >
          {content}
        </Typography>
      )}
      {/* attachment */}
      {attachments.length > 0 &&
        attachments.map((attachment, idx) => {
          const url = attachment.url;
          const file = fileFormat(url);

          return (
            <Box key={idx}>
              <a
                href={url}
                target="_blank"
                download
                style={{
                  color: "black",
                  textDecoration: "none",
                  display: "block",
                  wordBreak: "break-word",
                }}
              >
                {RenderAttachment({ file, url })}
              </a>
            </Box>
          );
        })}

      <Typography variant="caption" color="text.secondary">
        {timeAgo}
      </Typography>
    </div>
  );
};
export default memo(MessageComponent);
