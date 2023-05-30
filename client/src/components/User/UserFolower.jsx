import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

export function UserFolower() {
  const countUserFollowers = "1";
  // useSelector(
  //   (state) => state.user.user.countUserFollowers
  // );
  const countUserFollowings = "1";
  // useSelector(
  //   (state) => state.user.user.countUserFollowings
  // );

  return (
    <Box
      sx={{
        display: "flex",
        gap: "14px",
      }}
    >
      <Typography>
        {countUserFollowings}
        <span
          style={{
            color: "rgb(139, 152, 165)",
          }}
        >
          foloving
        </span>
      </Typography>
      <Typography>
        {countUserFollowers}
        <span
          style={{
            color: "rgb(139, 152, 165)",
          }}
        >
          folovers
        </span>
      </Typography>
    </Box>
  );
}
