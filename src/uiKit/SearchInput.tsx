import React, { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import theme from "theme";

type Props = {
  placeholderText: string;
  onSearch: (value: string) => void;
};

export const SearchInput: React.FC<Props> = ({ placeholderText, onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchText.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <TextField
      variant="outlined"
      placeholder={placeholderText}
      value={searchText}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
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
          <InputAdornment
            position="end"
            onClick={handleSearch}
            style={{ cursor: "pointer" }}
          >
            {" "}
            <SearchIcon />{" "}
          </InputAdornment>
        ),
      }}
    />
  );
};
