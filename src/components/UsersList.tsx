import React from "react";
import Grid from "@mui/material/Grid2";

import { useUsersStore } from "store";
import { UserCard } from "components";

export const UsersList: React.FC = () => {
  const { usersList } = useUsersStore();

  if (usersList.length < 1) {
    return null;
  }

  return usersList.map((user) => (
    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={user.email}>
      <UserCard users={user} />
    </Grid>
  ));
};
