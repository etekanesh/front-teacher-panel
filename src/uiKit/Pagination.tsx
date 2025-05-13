// CustomPagination.tsx (or inside your main file above your component)
import React from "react";
import Pagination from "@mui/material/Pagination";
import {
    useGridApiContext,
    useGridSelector,
    gridPageSelector,
    gridPageCountSelector,
} from "@mui/x-data-grid";
import { PaginationItem } from "@mui/material";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";

export const CustomPagination: React.FC = () => {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        console.log("event :>> ", event);
        apiRef.current.setPage(value - 1); // pages are 0-based in DataGrid
    };


    return (
        <Pagination
            count={pageCount}
            page={page + 1}
            onChange={handleChange}
            color="primary"
            sx={{ mt: 2, display: "flex", justifyContent: "center" }}
            siblingCount={2}
            boundaryCount={0}
            renderItem={(item) => (
                <PaginationItem
                    slots={{ previous: WestIcon, next: EastIcon }}
                    {...item}
                    sx={{
                        borderRadius: "50%",
                        width: 40,
                        height: 40,
                        fontSize: "16px",
                        fontWeight: "bold",
                        bgcolor: item.selected ? "success.main" : "#f0f0f0",
                        color: item.selected ? "white" : "#333",
                        "&:hover": {
                            bgcolor: item.selected ? "success.dark" : "#e0e0e0",
                        },
                    }}
                />
            )}
        />
    );
};
