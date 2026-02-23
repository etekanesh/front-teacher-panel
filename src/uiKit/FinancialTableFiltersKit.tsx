import "../styles/datepicker.css";
import React, { useMemo } from "react";
import {
  Paper,
  TextField,
  FormControl,
  Select,
  MenuItem,
  useMediaQuery,
  InputAdornment,
  Box,
  IconButton,
} from "@mui/material";

import theme from "theme";
import { SearchCustomIcon } from "./icons";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Cancel } from "@mui/icons-material";

type Props = {
  searchQuery: string;
  setSearchQuery: (v: string) => void;

  selectedStatus: string;
  setSelectedStatus: (v: string) => void;

  toDate: any;
  setToDate: (v: any) => void;

  fromDate: any;
  setFromDate: (v: any) => void;

  triggerSearch: () => void;
};

export const FinancialTableFilterKit: React.FC<Props> = ({
  searchQuery,
  setSearchQuery,
  selectedStatus,
  setSelectedStatus,
  toDate,
  setToDate,
  fromDate,
  setFromDate,
  triggerSearch,
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

  // Get status options for filter dropdown
  const statusOptions = useMemo(() => {
    return [
      { value: true, label: "تکمیل شده" },
      { value: false, label: "تکمیل نشده" },
    ];
  }, []);

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
      <Box
        display={"flex"}
        flexDirection={isMobile ? "column" : "row"}
        justifyContent={"space-between"}
        gap={isMobile ? "7px" : "4px"}
      >
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
            value={selectedStatus ?? ""}
            onChange={(e) => setSelectedStatus(e.target.value)}
            sx={selectStyle}
            displayEmpty
            renderValue={(value) =>
              value === "" || value === null || value === undefined ? (
                <span style={{ color: theme.palette.grey[600] }}>
                  وضعیت درخواست
                </span>
              ) : (
                <span style={{ color: theme.palette.grey[600] }}>
                  {
                    statusOptions.find((so) => so.value.toString() === value)
                      ?.label
                  }
                </span>
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
            <MenuItem value="">همه وضعیت‌ها</MenuItem>
            {statusOptions.map((status, index) => (
              <MenuItem
                key={status.label + index}
                value={status.value.toString()}
              >
                {status.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Start date */}
        <Box
          display={"flex"}
          position={"relative"}
          flex={1}
          minWidth={{ xs: 50, md: 180 }}
        >
          <DatePicker
            value={fromDate}
            onChange={(date) => {
              if (date) {
                setFromDate(date);
              }
            }}
            arrowStyle={{ display: "none" }}
            calendar={persian}
            locale={persian_fa}
            inputClass="custom-date-input"
            containerStyle={{
              width: "100%",
            }}
            style={{
              width: "100%",
              height: "35px",
              borderRadius: "8px",
              border: "1px solid rgba(148, 163, 184, 0.2)",
              backgroundColor: "white",
              padding: "0 12px",
              fontFamily: "yekanBakh, Arial, sans-serif",
            }}
            placeholder="از تاریخ"
          />
          {!!fromDate && (
            <IconButton
              size="small"
              sx={{
                position: "absolute",
                left: 2,
                top: 3,
                zIndex: 9999,
                color: "#aaa",
              }}
              onClick={() => setFromDate(null)}
            >
              <Cancel fontSize="small" />
            </IconButton>
          )}
        </Box>
        {/* Start date */}
        <Box
          display={"flex"}
          position={"relative"}
          flex={1}
          minWidth={{ xs: 50, md: 180 }}
        >
          <DatePicker
            value={toDate}
            onChange={(date) => {
              if (date) {
                setToDate(date);
              }
            }}
            arrowStyle={{ display: "none" }}
            calendar={persian}
            locale={persian_fa}
            inputClass="custom-date-input"
            containerStyle={{
              width: "100%",
            }}
            style={{
              width: "100%",
              height: "35px",
              borderRadius: "8px",
              border: "1px solid rgba(148, 163, 184, 0.2)",
              backgroundColor: "white",
              padding: "0 12px",
              fontFamily: "yekanBakh, Arial, sans-serif",
            }}
            placeholder="تا تاریخ"
          />
          {!!toDate && (
            <IconButton
              size="small"
              sx={{
                position: "absolute",
                left: 2,
                top: 3,
                zIndex: 9999,
                color: "#aaa",
              }}
              onClick={() => setToDate(null)}
            >
              <Cancel fontSize="small" />
            </IconButton>
          )}
        </Box>
      </Box>
    </Paper>
  );
};
