import { Avatar, AvatarGroup, Box, Stack } from "@mui/material";
import { transformImage } from "../../lib/features";

const AvatarCard = ({ avatar = [], max = 4 }) => {
  return (
    <Stack direction={"row"} spacing={1}>
      <AvatarGroup max={max}>
        <Box width={"5rem"} height={"3rem"}>
          {avatar.map((src, idx) => (
            <Avatar
              src={transformImage(src)}
              key={Math.random() * 100}
              alt={`avatar ${idx}`}
              sx={{
                width: "3rem",
                height: "3rem",
                position: "absolute",
                left: {
                  xs: `${idx + 0.5}rem`,
                  sm: `${idx}rem`,
                  md: `${idx + 2}rem`,
                  lg: `${idx + 3}rem`,
                },
              }}
            />
          ))}
        </Box>
      </AvatarGroup>
    </Stack>
  );
};
export default AvatarCard;
