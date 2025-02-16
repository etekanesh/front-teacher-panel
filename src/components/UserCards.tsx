import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { UsersData } from "core/types";
import { Button, Collapse } from "@mui/material";

interface Props {
  users: UsersData;
};

export const UserCard: React.FC<Props> = ({ users }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded((prev) => !prev);
  };


  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={users?.picture?.large}
        title={users?.name?.last}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {users?.name?.first} {users?.name?.last}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {users?.email}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {users?.location?.country}
        </Typography>
      </CardContent>
      {/* <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions> */}
      <CardActions>
        <Button onClick={handleExpandClick}>Show more details</Button>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Phone Number : {users?.phone}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Address : {users?.location?.street?.name}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};
