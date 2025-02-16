import React from "react";
import { TextField } from "@mui/material";

import { useUsersStore } from "store/useUsers.store";

export const UserSearch: React.FC = () => {
    const { handleSearchUsers } = useUsersStore();

    const handleChange = (value: string) => {
        handleSearchUsers(value);
    };

    return (
        <TextField
            fullWidth
            id="outlined-search"
            label="Search Users"
            type="search"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(event.target.value);
            }}
        />
    );
};
