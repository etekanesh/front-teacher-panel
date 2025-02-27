import React from "react";
import Link from "@mui/material/Link";
import { Box, Breadcrumbs, Divider, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import theme from "theme";

const HeaderLayout: React.FC = () => {
    return (
        <Box
            height={44}
            display={"flex"}
            justifyContent={"space-between"}
            padding={"0 14px"}
        >
            <Box display={"flex"} flexDirection={"column"}>
                <Typography
                    color={theme.palette.grey[500]}
                    fontWeight={700}
                    fontSize={20}
                >
                    پیام های شما
                </Typography>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/"
                        sx={{
                            color: theme.palette.grey[500],
                        }}
                        fontSize={12}
                    >
                        پنل مدرسین
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/material-ui/getting-started/installation/"
                        fontSize={12}
                        sx={{
                            color: theme.palette.grey[500],
                        }}
                        fontWeight={500}
                    >
                        پیــــــــام ها
                    </Link>
                </Breadcrumbs>
            </Box>
            <Box display={"flex"} gap={"15px"} alignItems={"center"}>
                <Box display={"flex"} gap={"5px"}>
                    <AccessTimeIcon
                        sx={{ width: 16, height: 16, color: theme.palette.grey[600] }}
                    />
                    <Typography color={theme.palette.grey[600]} fontSize={14}>
                        ۱۴:۵۶:۲۳
                    </Typography>
                </Box>
                <Divider
                    orientation="vertical"
                    variant="middle"
                    sx={{ height: "11px" }}
                />
                <Box>
                    <Typography color={theme.palette.grey[600]} fontSize={14}>
                        {" "}
                        ۲۹ دی ماه ۱۴۰۳
                    </Typography>
                </Box>
                <Box
                    width={40}
                    height={40}
                    borderRadius={"50%"}
                    bgcolor={theme.palette.primary[400]}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    position={"relative"}
                >
                    <NotificationsActiveOutlinedIcon
                        sx={{ width: 20, height: 20, color: "white" }}
                    />
                    <Box
                        borderRadius={"50%"}
                        width={20}
                        height={20}
                        bgcolor={theme.palette.warning[500]}
                        color={"white"}
                        fontSize={10}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        position={"absolute"}
                        left={-5}
                        top={-5}
                        border={"2px solid white"}
                    >
                        ۵۶
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default HeaderLayout;
