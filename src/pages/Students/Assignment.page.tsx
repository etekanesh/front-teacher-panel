import React from "react";
import { Box, Chip, Paper, Typography } from "@mui/material";

import theme from "theme";
import { HeaderLayout } from "layouts/header.layout";
import { BreadCrumbsModel } from "core/types";
import { ClipboardIcon, DoubleTickIcons } from "uiKit";
import { AssignmentList } from "components";

const breadcrumbData: BreadCrumbsModel[] = [
    {
        title: "مدیریت دانشجویان",
        link: "/students",
        id: "0",
        color: theme.palette.grey[600],
        active: false,
    },
    {
        title: "لیست دانشجویان",
        link: "/students",
        id: "1",
        color: theme.palette.grey[600],
        active: true,
    },
];

export const AssignmentPage: React.FC = () => {
    return (
        <>
            <HeaderLayout title="مدیریت دانشجویان" breadcrumb={breadcrumbData} />
            <Paper
                elevation={0}
                sx={{
                    width: "100%",
                    bgcolor: "white",
                    [theme.breakpoints.up("sm")]: {
                        borderRadius: "10px",
                    },
                    padding: "21px 28px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "13px"
                }}

            >
                <Box display={"flex"} flex={1} gap={"10px"} alignItems={"center"} minHeight={70}>
                    <ClipboardIcon
                        color={theme.palette.primary[600]}
                        width={22}
                        height={22}
                    />
                    <Typography
                        fontSize={16}
                        fontWeight={700}
                        color={theme.palette.grey[500]}
                    >
                        تایم لاین انجام تمرین دانشجـــــــــو
                    </Typography>
                    <Chip
                        label={"تایـیـــد شده"}
                        variant="outlined"
                        icon={<DoubleTickIcons />}
                        sx={{
                            display: "flex",
                            height: "20px",
                            padding: "6px",
                            alignItems: "center",
                            fontWeight: 600,
                            fontSize: "12px",
                            color: theme.palette.primary[400],
                            bgcolor: theme.palette.primary[50],
                            borderColor: theme.palette.primary[200],
                            width: "fit-content",
                            "& .MuiChip-icon": {
                                margin: 0,
                            },
                            "& .MuiChip-label": {
                                padding: 0,
                            },
                        }}
                    />
                </Box>
                <AssignmentList />
            </Paper>
        </>
    );
};
