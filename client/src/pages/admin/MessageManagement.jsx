import { Avatar, Box, Stack } from "@mui/material";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { useEffect, useState } from "react";
import { fileFormat, transformImage } from "../../lib/features";
import { dashboardData } from "../../constants/sampleData";
import moment from "moment";
import RenderAttachment from "../../components/shared/RenderAttachment";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "attachments",
    headerName: "Attachment",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => {
      const { attachments } = params.row;

      return attachments?.length > 0
        ? attachments.map((attachment, index) => {
            const url = attachment.url;
            const file = fileFormat(url);

            return (
              <Box key={index} style={{ cursor: "pointer" }}>
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  download
                  style={{
                    color: "black",
                  }}
                >
                  {RenderAttachment(file)}
                </a>
              </Box>
            );
          })
        : "No Attachment";
    },
  },
  {
    field: "content",
    headerName: "Content",
    headerClassName: "table-header",
    width: 400,
  },
  {
    field: "sender",
    headerName: "Sent By",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => (
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        style={{ cursor: "pointer" }}
      >
        <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
        <span>{params.row.sender.name}</span>
      </Stack>
    ),
  },
  {
    field: "chat",
    headerName: "Chat",
    headerClassName: "table-header",
    width: 220,
  },
  {
    field: "groupChat",
    headerName: "GroupChat",
    headerClassName: "table-header",
    width: 100,
  },
  {
    field: "createdAt",
    headerName: "Time",
    headerClassName: "table-header",
    width: 250,
  },
];

const MessageManagement = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(
      dashboardData.messages.map((message) => ({
        ...message,
        id: message._id,
        sender: {
          name: message.sender.name,
          avatar: transformImage(message.sender.avatar, 50),
        },
        chat: message.chat,
        groupChat: message.groupChat ? "Yes" : "No",
        createdAt: moment(message.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
      }))
    );
  }, []);

  return (
    <AdminLayout>
      <Table
        heading={"All Messages"}
        columns={columns}
        rows={rows}
        rowHeight={100}
      >
        Message{" "}
      </Table>
    </AdminLayout>
  );
};
export default MessageManagement;
