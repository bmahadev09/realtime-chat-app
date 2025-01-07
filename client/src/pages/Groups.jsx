import {
  Add,
  Delete,
  Done,
  Edit,
  KeyboardBackspace,
  Menu,
} from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { lazy, memo, Suspense, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "../components/styles/StyledComponents";
import AvatarCard from "../components/shared/AvatarCard";
import { sampleChats, sampleUsers } from "../constants/sampleData";
import UserItem from "../components/shared/UserItem";

const ConfirmDeleteDialog = lazy(() =>
  import("../components/dialogs/ConfirmDeleteDialog")
);
const AddMemberDialog = lazy(() =>
  import("../components/dialogs/AddMemberDialog")
);

const isAddMember = false;

const Groups = () => {
  const navigate = useNavigate();

  const chatId = useSearchParams()[0].get("group");

  //console.log("chatId", chatId);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [groupTitle, setGroupTitle] = useState("");
  const [groupTitleUpdatedValue, setGroupTitleUpdatedValue] = useState("");

  const navigateBack = () => {
    navigate("/");
  };

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileClose = () => {
    setIsMobileMenuOpen(false);
  };

  const updateGroupName = () => {
    setIsEdit(false);
    console.log("update group name");
  };

  const openConfirmDeleteHandler = () => {
    setConfirmDelete(true);
    console.log("confirm delete group");
  };

  const closeConfirmDeleteHandler = () => {
    setConfirmDelete(false);
  };

  const openAddMemberHandler = () => {
    console.log("open add member");
  };

  const deleteHandler = () => {
    console.log("delete group");
    closeConfirmDeleteHandler();
  };

  const removeMemberHandler = (id) => {
    console.log("remove member", id);
  };

  useEffect(() => {
    if (chatId) {
      setGroupTitle(`Group Name ${chatId}`);
      setGroupTitleUpdatedValue(`Group Name ${chatId}`);
    }

    return () => {
      setGroupTitle("");
      setGroupTitleUpdatedValue("");
      setIsEdit(false);
    };
  }, [chatId]);

  const IconsBtns = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
            top: "1rem",
            right: "1rem",
          },
        }}
      >
        <IconButton onClick={handleMobile}>
          <Menu />
        </IconButton>
      </Box>

      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "1.5rem",
            left: "1.5rem",
            bgcolor: "rgba(0, 0, 0, 0.8)",
            color: "white",
            ":hover": {
              bgcolor: "rgba(0, 0, 0, 0.6)",
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspace />
        </IconButton>
      </Tooltip>
    </>
  );

  const GroupNameComponent = (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={1}
      padding={"3rem"}
    >
      {isEdit ? (
        <>
          <TextField
            value={groupTitleUpdatedValue}
            onChange={(e) => setGroupTitleUpdatedValue(e.target.value)}
          />
          <IconButton onClick={updateGroupName}>
            <Done />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant={"h4"}>{groupTitle}</Typography>
          <IconButton onClick={() => setIsEdit(true)}>
            <Edit />
          </IconButton>
        </>
      )}
    </Stack>
  );

  const ButtonGroup = (
    <Stack
      direction={{
        xs: "column-reverse",
        sm: "row",
      }}
      spacing={2}
      p={{
        xs: "0",
        sm: "1rem",
        md: "1rem 4rem",
      }}
    >
      <Button
        size="large"
        variant="outlined"
        color="error"
        startIcon={<Delete />}
        onClick={openConfirmDeleteHandler}
      >
        Delete Group
      </Button>
      <Button
        size="large"
        variant="contained"
        startIcon={<Add />}
        onClick={openAddMemberHandler}
      >
        Add Member
      </Button>
    </Stack>
  );

  return (
    <Grid container height={"100vh"}>
      <Grid
        item
        sx={{ display: { xs: "none", sm: "block" } }}
        sm={4}
        bgcolor={"bisque"}
      >
        <GroupList myGroups={sampleChats} chatId={chatId} />
      </Grid>

      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        {IconsBtns}

        {groupTitle && (
          <>
            {GroupNameComponent}
            <Typography
              margin={"2rem"}
              alignSelf={"flex-start"}
              variant={"body1"}
            >
              Members
            </Typography>
            <Stack
              maxWidth={"45rem"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={{
                xs: "0",
                sm: "1rem",
                md: "1rem 4rem",
              }}
              spacing={2}
              height={"50vh"}
              overflow={"auto"}
            >
              {/* Members List */}
              {sampleUsers.map((user) => (
                <UserItem
                  key={user._id}
                  user={user}
                  isAdded
                  styling={{
                    boxShadow: "0 0 1rem rgba(0, 0, 0, 0.1)",
                    padding: "1rem 2rem",
                    borderRadius: "1rem",
                  }}
                  handler={removeMemberHandler}
                />
              ))}
            </Stack>
            {ButtonGroup}
          </>
        )}
      </Grid>

      {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMemberDialog />
        </Suspense>
      )}

      {/* Confirm Delete Dialog */}
      {confirmDelete && (
        <Suspense fallback={<Backdrop open />}>
          <ConfirmDeleteDialog
            open={confirmDelete}
            handleClose={closeConfirmDeleteHandler}
            deleteHandler={deleteHandler}
          />
        </Suspense>
      )}

      <Drawer
        sx={{
          display: { xs: "block", sm: "none" },
          ".MuiDrawer-paper": {
            width: "70%",
          },
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
      >
        <GroupList myGroups={sampleChats} chatId={chatId} />
      </Drawer>
    </Grid>
  );
};

const GroupList = ({ width = "100%", myGroups = [], chatId }) => (
  <Stack width={width} height={"100vh"} overflow={"auto"}>
    {myGroups.length > 0 ? (
      myGroups.map((group) => (
        <GroupListItem key={group._id} group={group} chatId={chatId} />
      ))
    ) : (
      <Typography padding={"1rem"} textAlign={"center"}>
        No Groups
      </Typography>
    )}
  </Stack>
);

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) {
          e.preventDefault();
        }
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1.5rem"}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});

GroupListItem.displayName = "GroupListItem";

export default Groups;
