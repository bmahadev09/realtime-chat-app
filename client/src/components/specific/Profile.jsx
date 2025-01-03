import { AlternateEmail, CalendarMonth, Face } from "@mui/icons-material";
import { Avatar, Stack, Typography } from "@mui/material";
import moment from "moment";

const Profile = () => {
  return (
    <Stack direction={"column"} spacing={"2rem"} alignItems={"center"}>
      <Avatar
        sx={{
          width: "12rem",
          height: "12rem",
          objectFit: "cover",
          border: "2px solid white",
          marginBottom: "1rem",
        }}
      />
      <ProfileCard heading={"Bio"} text={"jshdfjkshdf"} />
      <ProfileCard
        heading={"userName"}
        text={"mithu@gmail.com"}
        Icon={<AlternateEmail />}
      />
      <ProfileCard heading={"Name"} text={"setertgg"} Icon={<Face />} />
      <ProfileCard
        heading={"Joined"}
        text={moment("2024-11-04T18:00:00.000Z").fromNow()}
        Icon={<CalendarMonth />}
      />
    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading }) => {
  return (
    <Stack
      direction={"row"}
      spacing={"1rem"}
      alignItems={"center"}
      color={"white"}
    >
      {Icon && Icon}
      <Stack>
        <Typography variant={"body1"}>{text}</Typography>
        <Typography color="gray" variant="caption">
          {heading}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Profile;
