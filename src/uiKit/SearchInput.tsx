import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import theme from "theme";

export const SearchInput: React.FC = () => {
  return (
    <TextField
      variant="outlined"
      placeholder="جستجو در بین دانشجـــــــو ..."
      //   value={value}
      onChange={(e) => console.log(e)}
      fullWidth
      sx={{
        "& .MuiInputBase-root": {
          borderRadius: "35px",
          height: "33px",
          borderColor: theme.palette.grey[400],
          color: theme.palette.grey[600],
          fontSize: "12px",
          fontWeight: 500,
        },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {" "}
            <SearchIcon />{" "}
          </InputAdornment>
        ),
      }}
    />
  );
};
