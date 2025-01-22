import { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { Avatar } from "@mui/material";
import { transformImage } from "../../lib/features";
import { useGetAllUsersQuery } from "../../redux/api/api";
import { useErrors } from "../../hooks/hook";
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
    renderCell: (params) => (
      <Avatar alt={params.row.name} src={params.row.avatar} />
    ),
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "username",
    headerName: "Username",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "friends",
    headerName: "Friends",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "groups",
    headerName: "Groups",
    headerClassName: "table-header",
    width: 200,
  },
];

const UserManagement = () => {
  const [rows, setRows] = useState([]);

  const { isError, error, data, isLoading } = useGetAllUsersQuery();

  useErrors([{ isError: isError, error: error }]);

  useEffect(() => {
    setRows(
      data?.users.map((user) => ({
        ...user,
        id: user._id,
        avatar: transformImage(user.avatar, 50),
      }))
    );
  }, [data]);

  return isLoading ? (
    <LayoutLoader />
  ) : (
    <AdminLayout>
      <Table heading={"All Users"} columns={columns} rows={rows}>
        User Management
      </Table>
    </AdminLayout>
  );
};
export default UserManagement;
