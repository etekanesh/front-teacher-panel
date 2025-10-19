import React from "react";
import { Box, Paper, Typography, useMediaQuery } from "@mui/material";

import theme from "theme";
import { ProfileForm } from "components";
import { BreadCrumbsModel } from "core/types";
import { HeaderLayout } from "layouts";
import { EditIcons } from "uiKit";
import { useUsersStore } from "store";

const breadcrumbData: BreadCrumbsModel[] = [
    {
        title: "  حساب کاربــــــــری",
        link: "/",
        id: "1",
        color: theme.palette.grey[600],
        active: false,
    },
    {
        title: "مشخصات عمومـــــــــی",
        link: "/account/general-info",
        id: "2",
        color: theme.palette.grey[600],
        active: true,
    },
];

export const GeneralInfoPage: React.FC = () => {
    const isMobile = useMediaQuery("(max-width:768px)");
    const { fetching, userData } = useUsersStore();
    return (
        <>
            {fetching ? (
                ""
            ) : (
                <>
                    <HeaderLayout
                        title="مشخصات عمومـــــــــی"
                        breadcrumb={breadcrumbData}
                    />
                    <Box
                        display={"flex"}
                        flexDirection={"column"}
                    >
                        <Paper
                            elevation={0}
                            sx={{
                                width: "100%",
                                height: "70px",
                                bgcolor: "white",
                                borderRadius: "10px 10px 0 0",
                                boxShadow: "-12px 0px 67.1px 0px #6B857E17",
                                display: "flex",
                                gap: 15,
                                alignItems: "center",
                                padding: "18px 28px",
                                [theme.breakpoints.down("sm")]: {
                                    flexDirection: "column",
                                    gap: "8px",
                                    height: "100px",
                                    alignItems: "flex-start",
                                    padding: isMobile ? "10px 16px" : "15px 16px 20px",
                                    boxShadow: "none",
                                },
                            }}
                        >
                            <Box display={"flex"} flex={1} gap={"10px"} alignItems={"center"}>
                                <EditIcons
                                    color={theme.palette.primary[600]}
                                    width={22}
                                    height={22}
                                />
                                <Typography
                                    fontSize={16}
                                    fontWeight={700}
                                    color={theme.palette.grey[500]}
                                >
                                    مشخصات عمومـــــــــی{" "}
                                </Typography>
                            </Box>
                        </Paper>
                        <Box
                            bgcolor={theme.palette.grey[200]}
                            minHeight={600}
                            display={"flex"}
                            gap={"30px"}
                            flexDirection={"column"}
                            padding={isMobile ? "0 16px" : "28px"}
                        >
                            <ProfileForm userData={userData && userData} />
                        </Box>
                    </Box>
                </>
            )}
        </>
    );
};
