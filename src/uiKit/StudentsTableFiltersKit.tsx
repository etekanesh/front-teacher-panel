import React from "react";
import {
    Paper,
    TextField,
    FormControl,
    Select,
    MenuItem,
    useMediaQuery,
    InputAdornment,
    Box,
} from "@mui/material";

import theme from "theme";
import { SearchCustomIcon } from "./icons";

type Props = {
    searchQuery: string;
    setSearchQuery: (v: string) => void;

    selectedTaskStatus: string;
    setSelectedTaskStatus: (v: string) => void;

    selectedGrouplancingStatus: string;
    setSelectedGrouplancingStatus: (v: string) => void;

    selectedCurrentLevel: string;
    setSelectedCurrentLevel: (v: string) => void;

    taskStatusOptions: number[];
    grouplancingStatusOptions: number[];
    levelOptions: number[];

    triggerSearch: () => void;
    clearAllFilters: () => void;
    hasActiveFilters: boolean | string;

    filterItems: any;
};

export const StudentsTableFilterKit: React.FC<Props> = ({
    searchQuery,
    setSearchQuery,
    selectedTaskStatus,
    setSelectedTaskStatus,
    selectedGrouplancingStatus,
    setSelectedGrouplancingStatus,
    selectedCurrentLevel,
    setSelectedCurrentLevel,
    taskStatusOptions,
    grouplancingStatusOptions,
    levelOptions,
    triggerSearch,
    // clearAllFilters,
    // hasActiveFilters,
    filterItems,
}) => {
    const isMobile = useMediaQuery("(max-width:768px)");
    const selectStyle = {
        borderRadius: "8px",
        background: isMobile ? "rgba(237, 240, 239, 0.5)" : "#fff",
        height: "34px",
        direction: "rtl",
        fontSize: "12px",
        color: "#686F82",

        "& .MuiOutlinedInput-notchedOutline": { border: "none" },
        "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none" },

        "& .MuiSelect-select": {
            paddingRight: "12px !important",
            fontSize: "12px",
            color: "#686F82",
        },

        "& svg": {
            right: "auto",
            left: "8px",
        },

        textAlign: "right",
    };
    return (
        <Paper
            elevation={0}
            sx={{
                padding: isMobile ? 0 : "12px",
                borderRadius: "15px",
                border: isMobile ? 0 : `1px solid ${theme.palette.grey[300]}`,
                background: isMobile ? "unset" : theme.palette.grey[400],
            }}
        >
            <Box display={"flex"} flexDirection={isMobile ? "column" : "row"} justifyContent={"space-between"} gap={isMobile ? "7px" : "4px"}>
                <TextField
                    placeholder="جستجو بر اساس نام دانشجـــــــو ..."
                    value={searchQuery}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSearchQuery(e.target.value)
                    }
                    fullWidth
                    onKeyDown={(e) => e.key === "Enter" && triggerSearch()}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            padding: 0,
                            borderRadius: "8px",
                            background: isMobile ? "rgba(237, 240, 239, 0.5)" : "#fff",
                            direction: "rtl",
                            height: 34,
                            "& fieldset": { border: "none" },
                            "&:hover fieldset": { border: "none" },
                            "&.Mui-focused fieldset": { border: "none" },

                            "& input": {
                                color: "#686F82",
                                fontSize: "12px",
                                fontWeight: 500,
                                paddingRight: "8px",
                            },
                            "& input::placeholder": {
                                color: "#686F82",
                                opacity: 1,
                                fontSize: "12px",
                            },
                        },
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment
                                position="end"
                                onClick={triggerSearch}
                                style={{ cursor: "pointer" }}
                            >
                                <SearchCustomIcon />
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Task Status */}
                <FormControl fullWidth size="small" sx={{ minWidth: 150 }}>
                    <Select
                        value={selectedTaskStatus ?? ""}
                        onChange={(e) => setSelectedTaskStatus(e.target.value)}
                        sx={selectStyle}
                        displayEmpty
                        renderValue={(value) =>
                            value === "" || value === null || value === undefined ? (
                                <span style={{ color: theme.palette.grey[600] }}>
                                    وضعیت تکلیف
                                </span>
                            ) : (
                                filterItems?.level_statuses?.[value] ?? value
                            )
                        }
                        MenuProps={{
                            sx: {
                                "& .MuiPaper-root": {
                                    borderRadius: "10px",
                                },
                                "& .MuiList-root": {
                                    padding: "8px 5px !important",
                                    gap: "2px !important",
                                },
                                "& .MuiMenuItem-root": {
                                    borderRadius: "10px",
                                    fontSize: "11px",
                                    color: theme.palette.grey[500],
                                },
                            },
                        }}
                    >
                        <MenuItem value="">همه</MenuItem>
                        {taskStatusOptions.map((st) => (
                            <MenuItem key={st} value={st}>
                                {filterItems?.level_statuses?.[st] ?? st}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* KYC Status */}
                <FormControl fullWidth sx={{ minWidth: 150 }}>
                    <Select
                        value={selectedGrouplancingStatus}
                        onChange={(e) => setSelectedGrouplancingStatus(e.target.value)}
                        sx={selectStyle}
                        MenuProps={{
                            sx: {
                                "& .MuiPaper-root": { borderRadius: "10px" },
                                "& .MuiList-root": { padding: "8px 5px !important", gap: "2px !important" },
                                "& .MuiMenuItem-root": { borderRadius: "10px", fontSize: "11px", color: theme.palette.grey[500] },
                            },
                        }}
                        renderValue={(value) =>
                            value !== null && value !== undefined && value !== ""
                                ? filterItems?.kyc_statuses?.[value] ?? value
                                : <span style={{ color: theme.palette.grey[600] }}>وضعیت اکانت</span>
                        }
                        displayEmpty
                    >
                        <MenuItem value="">همه</MenuItem>
                        {grouplancingStatusOptions.map((st) => (
                            <MenuItem key={st} value={st}>
                                {filterItems?.kyc_statuses?.[st] ?? st}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Level */}
                <FormControl fullWidth sx={{ minWidth: 120 }}>
                    <Select
                        value={selectedCurrentLevel}
                        onChange={(e) => setSelectedCurrentLevel(e.target.value)}
                        sx={selectStyle}
                        MenuProps={{
                            sx: {
                                "& .MuiPaper-root": { borderRadius: "10px" },
                                "& .MuiList-root": { padding: "8px 5px !important", gap: "2px !important" },
                                "& .MuiMenuItem-root": { borderRadius: "10px", fontSize: "11px", color: theme.palette.grey[500] },
                            },
                        }}
                        renderValue={(value) =>
                            value !== null && value !== undefined && value !== ""
                                ? filterItems?.grouplancingStatusOptions?.[value] ?? `سطح  ${value} `
                                : <span style={{ color: theme.palette.grey[600] }}>سطح</span>
                        }
                        displayEmpty
                    >
                        <MenuItem value="">همه</MenuItem>
                        {levelOptions.map((lvl) => (
                            <MenuItem key={lvl} value={lvl}>
                                سطح {lvl}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Clear All */}
                {/* {hasActiveFilters && (
                    <Button
                        onClick={clearAllFilters}
                        color="error"
                        size="small"
                        variant="outlined"
                        sx={{
                            whiteSpace: "nowrap",
                            borderRadius: "10px",
                            height: "40px",
                        }}
                    >
                        حذف فیلترها
                    </Button>
                )} */}
            </Box>
        </Paper>
    );
};
