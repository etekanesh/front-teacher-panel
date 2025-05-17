import React, { ReactElement } from "react";
import { Box, Divider, Typography } from "@mui/material";
import { Note } from "@mui/icons-material";

import {
    CustomButton,
    DocumentIcon,
    EditTwoIcons,
    ListIcons,
    NoteIcon,
} from "uiKit";
import theme from "theme";
import { RichEditor } from "uiKit/RichTextKit";

export interface Note {
    id: number | string;
    title: string;
    body?: string;
    time: string;
    attachment?: string;
    isApproved?: boolean;
    icon: ReactElement;
}

const Notes: Note[] = [
    {
        id: 1,
        title: "تمرین ارسال شده توسط دانشجو (نیدا گودرزی)",
        time: "۱۰:۳۶ ۲۹ فروردین ماه ۱۴۰۳",
        attachment: "jpg.Homework",
        isApproved: true,
        icon: <ListIcons color="#334155" />,
    },
    {
        id: 2,
        title: "ثبت نظر مدرس مربوطه (نیدا گودرزی)",
        body:
            "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ...\n" +
            "تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می‌باشد.",
        time: "۱۰:۳۵ ۲۹ فروردین ماه ۱۴۰۳",
        icon: <NoteIcon color="#334155" width={18} height={18} />,
    },
    {
        id: 3,
        title: "ثبت نظر دانشجو (نیدا گودرزی)",
        body: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ ...",
        time: "۱۰:۳۲ ۲۹ فروردین ماه ۱۴۰۳",
        icon: <NoteIcon color="#334155" width={18} height={18} />,
    },
];

export const AssignmentList: React.FC = () => {
    return (
        <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            gap={"18px"}
        >
            {Notes.map((item) => (
                <Box
                    display={"flex"}
                    flexDirection={"column"}
                    gap={"18px"}
                    width={"100%"}
                >
                    <Box
                        display={"flex"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                    >
                        <Box display={"flex"} gap={"10px"} alignItems={"center"}>
                            <Box
                                display={"flex"}
                                alignItems={"center"}
                                justifyContent={"center"}
                                bgcolor={theme.palette.grey[300]}
                                height={30}
                                width={30}
                                borderRadius={"50%"}
                            >
                                {item?.icon}
                            </Box>
                            <Typography
                                fontSize={16}
                                fontWeight={700}
                                color={theme.palette.grey[500]}
                            >
                                {item?.title}
                            </Typography>
                        </Box>
                        <Box display={"flex"} flexDirection={"column"} textAlign={"right"}>
                            <Typography
                                fontSize={10}
                                fontWeight={500}
                                color={theme.palette.grey[600]}
                            >
                                ســــــاعت ۱۰:۲۳:۰۰{" "}
                            </Typography>
                            <Typography
                                fontSize={14}
                                fontWeight={700}
                                color={theme.palette.grey[500]}
                            >
                                ۲۹ فروردین ماه ۱۴۰۳{" "}
                            </Typography>
                        </Box>
                    </Box>
                    {item?.attachment ? (
                        <Box display={"flex"} gap={"18px"}>
                            <Divider
                                sx={{ borderWidth: 1, color: "#EDF0EF", marginRight: "15px" }}
                                variant="fullWidth"
                            />
                            <Box
                                sx={{
                                    p: "11px",
                                    border: "1px dashed",
                                    borderColor: theme.palette.primary[600],
                                    width: "100%",
                                    borderRadius: "10px",
                                }}
                            >
                                <Box display={"flex"} gap={"9px"}>
                                    <Box
                                        display={"flex"}
                                        alignItems={"center"}
                                        justifyContent={"center"}
                                        bgcolor={theme.palette.grey[300]}
                                        height={30}
                                        width={30}
                                        borderRadius={"50%"}
                                    >
                                        <DocumentIcon
                                            width={18}
                                            height={18}
                                            color={theme.palette.primary[600]}
                                        />
                                    </Box>
                                    <Box display={"flex"} flexDirection={"column"}>
                                        <Typography
                                            color={theme.palette.primary[600]}
                                            fontSize={12}
                                            fontWeight={700}
                                        >
                                            jpg.Home work
                                        </Typography>
                                        <Typography color={theme.palette.grey[600]} fontSize={10}>
                                            200 KB{" "}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    ) : (
                        <Box display={"flex"} gap={"18px"}>
                            <Divider
                                sx={{ borderWidth: 1, color: "#EDF0EF", marginRight: "15px" }}
                                variant="fullWidth"
                            />
                            <Box
                                sx={{
                                    p: "11px",
                                    border: "1px solid",
                                    borderColor: theme.palette.grey[300],
                                    width: "100%",
                                    borderRadius: "10px",
                                }}
                            >
                                <Typography
                                    color={theme.palette.grey[600]}
                                    fontSize={12}
                                    fontWeight={400}
                                >
                                    {item.body}
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </Box>
            ))}
            <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                flexDirection={"column"}
                width={"100%"}
            >
                <Box display={"flex"} gap={"10px"} alignItems={"center"} width={"100%"}>
                    <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        bgcolor={theme.palette.grey[300]}
                        height={30}
                        width={30}
                        borderRadius={"50%"}
                    >
                        <EditTwoIcons color="#334155" width={18} height={18} />
                    </Box>
                    <Typography
                        fontSize={16}
                        fontWeight={700}
                        color={theme.palette.grey[500]}
                    >
                        ثبت نظر تایید یا رد تکلیف دانشجو
                    </Typography>
                </Box>
                <Box width={"100%"} display={"flex"} gap={"20px"} paddingTop={"8px"}>
                    <Divider
                        sx={{ borderWidth: 1, color: "#EDF0EF", marginRight: "15px" }}
                        variant="fullWidth"
                    />
                    <RichEditor />
                </Box>
            </Box>
            <Box
                width={"100%"}
                display={"flex"}
                justifyContent={"flex-end"}
                gap={"8px"}
            >
                <CustomButton variant="outlined" color="error" sx={{ color: "error", minWidth: 200 }}>
                    رد تکلیف{" "}
                </CustomButton>
                <CustomButton variant="contained" color="primary" sx={{ minWidth: 200 }}>
                    تایید تکلیف ارسال شده{" "}
                </CustomButton>
            </Box>
        </Box>
    );
};
