import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";

import { UserSearch, UsersList, UserFilter } from "components";
import { useUsersStore } from "store/useUsers.store";
import { Card, CardContent, Skeleton } from "@mui/material";

export const UsersListWidget: React.FC = () => {
  const { fetching } = useUsersStore();

  if (fetching)
    return (
      <Box
        sx={{ flexGrow: 1 }}
        gap={1}
        display={"flex"}
        flexDirection={"column"}
        padding={"20px"}
        borderRadius={"10px"}
        boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px;"
      >
        <Grid container spacing={2}>
          {new Array(18).fill(1).map((_, index) => <Grid key={['card_loader', index].join('_')} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card>
              <Skeleton
                sx={{ height: 140 }}
                animation="wave"
                variant="rectangular"
              />
              <CardContent>
                <React.Fragment>
                  <Skeleton
                    animation="wave"
                    height={10}
                    style={{ marginBottom: 6 }}
                  />
                  <Skeleton animation="wave" height={10} width="80%" />
                </React.Fragment>
              </CardContent>
            </Card>
          </Grid>)}
        </Grid>
      </Box>
    );

  return (
    <Box
      sx={{ flexGrow: 1 }}
      gap={1}
      display={"flex"}
      flexDirection={"column"}
      padding={"20px"}
      borderRadius={"10px"}
      boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px;"
    >
      <Box display={"flex"} justifyContent={"flex-end"} gap={1}>
        <Box flex={1}>
          <UserSearch />
        </Box>
        <Box flex={1}>
          <UserFilter />
        </Box>
      </Box>

      <Grid container spacing={2}>
        <UsersList />
      </Grid>
    </Box>
  );
};
