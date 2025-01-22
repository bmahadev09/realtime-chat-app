/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { Avatar, Stack } from "@mui/material";
import { transformImage } from "../../lib/features";
import AvatarCard from "../../components/shared/AvatarCard";
import { useErrors } from "../../hooks/hook";
import { useGetAllChatsQuery } from "../../redux/api/api";
import { LayoutLoader } from "../../components/layout/Loaders";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => <AvatarCard avatar={params.row.avatar} />,
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 300,
  },
  {
    field: "groupChat",
    headerName: "Group",
    headerClassName: "table-header",
    width: 100,
  },
  {
    field: "totalMembers",
    headerName: "Total Members",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "members",
    headerName: "Members",
    headerClassName: "table-header",
    width: 400,
    renderCell: (params) => (
      <AvatarCard max={100} avatar={params.row.members} />
    ),
  },
  {
    field: "totalMessages",
    headerName: "Total Messages",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "createdAt",
    headerName: "Created By",
    headerClassName: "table-header",
    width: 250,
    renderCell: (params) => (
      <Stack direction="row" alignItems="center" spacing={1}>
        <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
        <span>{params.row.creator.name}</span>
      </Stack>
    ),
  },
];

const ChatManagement = () => {
  const [rows, setRows] = useState([]);

  const { isError, error, data, isLoading } = useGetAllChatsQuery();

  useErrors([{ isError: isError, error: error }]);

  useEffect(() => {
    setRows(
      data?.chats.map((chat) => ({
        ...chat,
        id: chat._id,
        avatar: chat.avatar.map((avatar) => transformImage(avatar, 50)),
        members: chat.members.map((member) =>
          transformImage(member.avatar, 50)
        ),
        creator: {
          name: chat.creator.name,
          avatar: transformImage(chat.creator.avatar, 50),
        },
      }))
    );
  }, [data]);

  return isLoading ? (
    <LayoutLoader />
  ) : (
    <AdminLayout>
      <Table heading={"All Chats"} columns={columns} rows={rows}>
        User Management
      </Table>
    </AdminLayout>
  );
};

export default ChatManagement;
