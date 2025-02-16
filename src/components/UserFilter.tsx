import React, { useState } from "react";
import {
    Box,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import { useUsersStore } from "store/useUsers.store";

export const UserFilter: React.FC = () => {
    const { availableCountries, handleFilteredCountries } = useUsersStore();
    const [selectedValue, setSelectedValue] = useState("");

    const handleChange = (event: SelectChangeEvent) => {
        handleFilteredCountries(event.target.value);
        setSelectedValue(event.target.value);
    };

    const handleClear = () => {
        setSelectedValue("");
        handleFilteredCountries("");
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="country-user-filter">Country</InputLabel>

            <Select
                labelId="country-user-filter"
                id="country-user-filter"
                // label="country"
                fullWidth
                displayEmpty
                value={selectedValue}
                onChange={handleChange}
            >
                {/* <MenuItem value="">All</MenuItem> */}
                {availableCountries?.map((country, index) => (
                    <MenuItem value={country} key={index}>
                        {country}
                    </MenuItem>
                ))}
            </Select>
            {selectedValue && (
                <Box position={"absolute"} top={10} right={30}>
                    <IconButton onClick={handleClear} size="small" color="primary">
                        <ClearIcon />
                    </IconButton>
                </Box>
            )}
        </FormControl>
    );
};
