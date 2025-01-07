import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";
import { useState } from "react";

const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [members, setMembers] = useState(sampleUsers);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const addMemberSubmitHandler = () => {
    console.log("add member submit");
    handleClose();
  };

  const handleClose = () => {
    setSelectedMembers([]);
    setMembers([]);
  };

  return (
    <Dialog open onClose={handleClose}>
      <Stack spacing={"1rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
        <Stack>
          {members.length > 0 ? (
            members.map((user) => (
              <UserItem
                key={user._id}
                user={user}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(user._id)}
              />
            ))
          ) : (
            <Typography textAlign={"center"}>No Friends Found</Typography>
          )}
        </Stack>

        <Stack
          direction={"row"}
          spacing={2}
          justifyContent={"space-evenly"}
          padding={"1rem"}
        >
          <Button onClick={handleClose} color="error" variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={addMemberSubmitHandler}
            variant="contained"
            disabled={isLoadingAddMember}
          >
            Submit Changes
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};
export default AddMemberDialog;
