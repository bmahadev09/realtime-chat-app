import { useInputValidation } from "6pp";
import {
  Button,
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";

const NewGroup = () => {
  const groupName = useInputValidation("");

  const [selectedMembers, setSelectedMembers] = useState([]);
  const [members, setMembers] = useState(sampleUsers);

  const selectMemberHandler = (id) => {
    // setMembers((prev) =>
    //   prev.map((user) =>
    //     user._id === id ? { ...user, isAdded: !user.isAdded } : user
    //   )
    // );

    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  //console.log(selectedMembers);

  const submitHandler = () => {
    console.log("Submit Handler");
  };

  const closeHandler = () => {
    console.log("Close Handler");
  };

  return (
    <Dialog open>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        New Group
      </DialogTitle>
      <Stack
        p={{ xs: "1rem", sm: "3rem" }}
        direction={"column"}
        width={"25rem"}
        spacing={2}
      >
        <TextField
          value={groupName.value}
          onChange={groupName.changeHandler}
          label="Group Name"
          variant="outlined"
          size="small"
          fullWidth
        />

        <Typography textAlign={"center"}>Select Members</Typography>

        <Stack>
          {members.map((user, idx) => (
            <UserItem
              key={idx}
              user={user}
              handler={selectMemberHandler}
              isAdded={selectedMembers.includes(user._id)}
            />
          ))}
        </Stack>

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
          spacing={2}
        >
          <Button variant={"outlined"} color="error">
            Cancel
          </Button>
          <Button variant={"contained"} onClick={submitHandler}>
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};
export default NewGroup;
