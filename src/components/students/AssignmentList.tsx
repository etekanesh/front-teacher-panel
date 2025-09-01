import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Chip, Divider, Snackbar, Typography, useMediaQuery } from "@mui/material";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";

import {
    ClipboardIcon,
    CustomButton,
    DocumentIcon,
    EditTwoIcons,
    ListIcons,
    NoteIcon,
} from "uiKit";
import theme from "theme";
import { RichEditor } from "uiKit/RichTextKit";
import { useStudentsStore } from "store/useStudents.store";
import { PersianConvertDate } from "core/utils";
import { postStudentsLevel } from "core/services";

const statusStyles: Record<number, any> = {
    [-3]: {
        label: "در انتظار نظرسنجی",
        color: theme.palette.warning[500] || "#f57c00",
        bgcolor: theme.palette.warning[600] || "#ffe0b2",
        borderColor: theme.palette.warning[500] || "#ffa726",
        iconColor: "warning",
    },
    [-2]: {
        label: "در انتظار بازخورد",
        color: theme.palette.warning[500] || "#f57c00",
        bgcolor: theme.palette.warning[600] || "#ffe0b2",
        borderColor: theme.palette.warning[500] || "#ffa726",
        iconColor: "warning",
    },
    [-1]: {
        label: "رد شده",
        color: theme.palette.error[500] || "#f44336",
        bgcolor: theme.palette.error[400] || "#ffcdd2",
        borderColor: theme.palette.error[500] || "#f44336",
        iconColor: theme.palette.error[400] || "#ffcdd2",
    },
    [0]: {
        label: "در انتظار ارسال تکلیف",
        color: theme.palette.warning[500] || "#ef6c00",
        bgcolor: theme.palette.warning[600] || "#ffe0b2",
        borderColor: theme.palette.warning[500] || "#ffa726",
        iconColor: "warning",
    },
    [1]: {
        label: "در انتظار تایید مدرس",
        color: theme.palette.warning[500] || "#ef6c00",
        bgcolor: theme.palette.warning[600] || "#ffe0b2",
        borderColor: theme.palette.warning[500] || "#ffa726",
        iconColor: "warning",
    },
    [2]: {
        label: "تایید شده",
        color: theme.palette.primary[400] || "#4caf50",
        bgcolor: theme.palette.primary[50] || "#c8e6c9",
        borderColor: theme.palette.primary[200] || "#4caf50",
        iconColor: theme.palette.primary[400] || "#4caf50",
    },
};

export const AssignmentList: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isMobile = useMediaQuery("(max-width:768px)");

    const { studentLevelData } = useStudentsStore();

    const [editorValue, setEditorValue] = useState("");

    const handleEditorChange = (html: string) => {
        setEditorValue(html);
    };

    const handleSubmitLevel = (status: string) => {
        postStudentsLevel(id, editorValue, status).then((res: any) => {
            if (res?.status === true) {
                <Snackbar
                    open
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    message={res?.data?.message}
                    autoHideDuration={3000}
                    sx={{
                        "& .MuiSnackbarContent-root": {
                            backgroundColor: "#008C64",
                            color: "white",
                        },
                    }}
                />;
            }
            navigate("/teacher/students");
        });
    };

    const status = studentLevelData?.status;
    const statusConfig = statusStyles[status] || {};

    return (
        <>
            <Box
                display={"flex"}
                flex={1}
                gap={"10px"}
                alignItems={"center"}
                minHeight={70}
            >
                <ClipboardIcon
                    color={theme.palette.primary[600]}
                    width={22}
                    height={22}
                />
                <Typography
                    fontSize={{ xs: "12px", md: "16px" }}
                    fontWeight={700}
                    color={theme.palette.grey[500]}
                >
                    تایم لاین انجام تمرین دانشجـــــــــو
                </Typography>
                <Chip
                    label={statusConfig.label}
                    variant="outlined"
                    icon={<ErrorOutlineRoundedIcon
                        color={
                            statusConfig.iconColor as
                            | "inherit"
                            | "action"
                            | "disabled"
                            | "primary"
                            | "secondary"
                            | "error"
                            | "info"
                            | "success"
                            | "warning"
                        }
                        sx={{
                            height: "15px",
                            width: "15px",
                        }}
                    />}
                    sx={{
                        display: "flex",
                        height: "20px",
                        padding: "6px",
                        alignItems: "center",
                        fontWeight: 600,
                        fontSize: "12px",
                        color: statusConfig.color,
                        bgcolor: statusConfig.bgcolor,
                        borderColor: statusConfig.borderColor,
                        width: "fit-content",
                        "& .MuiChip-icon": {
                            margin: 0,
                            color: statusConfig.iconColor,
                        },
                        "& .MuiChip-label": {
                            padding: 0,
                        },
                    }}
                />
            </Box>

            <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                flexDirection={"column"}
                gap={"18px"}
            >
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
                                <ListIcons color="#334155" />
                            </Box>
                            <Typography
                                fontSize={{ xs: "12px", md: "16px" }}
                                fontWeight={700}
                                color={theme.palette.grey[500]}
                            >
                                تمرین ارسال شده توسط دانشجو
                            </Typography>
                        </Box>
                        <Box display={"flex"} flexDirection={"column"} textAlign={"right"}>
                            <Typography
                                fontSize={{ xs: "10px", md: "10px" }}
                                fontWeight={500}
                                color={theme.palette.grey[600]}
                            >
                                ســــــاعت :{" "}
                                {
                                    studentLevelData?.last_project?.datetime
                                        ?.split("T")[1]
                                        ?.split(".")[0]
                                }
                            </Typography>
                            <Typography
                                fontSize={{ xs: "10px", md: "14px" }}
                                fontWeight={700}
                                color={theme.palette.grey[500]}
                            >
                                {PersianConvertDate(studentLevelData?.last_project?.datetime)}
                            </Typography>
                        </Box>
                    </Box>
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
                                cursor: "pointer",
                                overflow: "hidden"
                            }}
                        >
                            <a
                                href={studentLevelData?.last_project?.project}
                                download
                                target="_blank"
                                rel="noopener noreferrer"
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
                                    <Box
                                        display={"flex"}
                                        flexDirection={"column"}
                                        alignItems={"center"}
                                        justifyContent={"center"}
                                    >
                                        <Typography
                                            color={theme.palette.primary[600]}
                                            fontSize={12}
                                            fontWeight={700}
                                        >
                                            {studentLevelData?.last_project?.project}
                                        </Typography>
                                        {/* <Typography color={theme.palette.grey[600]} fontSize={10}>
                                        200 KB{" "}
                                    </Typography> */}
                                    </Box>
                                </Box>
                            </a>
                        </Box>
                    </Box>
                </Box>
                {studentLevelData?.notes?.map((item) => (
                    <Box
                        display={"flex"}
                        flexDirection={"column"}
                        gap={"18px"}
                        width={"100%"}
                        key={Math.random()}
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
                                    <NoteIcon color="#334155" width={18} height={18} />
                                </Box>
                                <Typography
                                    fontSize={{ xs: "12px", md: "16px" }}
                                    fontWeight={700}
                                    color={theme.palette.grey[500]}
                                >
                                    {item?.user?.role !== 5
                                        ? `نظر مدرس مربوطه(${item?.user?.first_name + " " + item?.user?.last_name
                                        })`
                                        : `نظر دانشجو(${item?.user?.first_name + " " + item?.user?.last_name
                                        })`}
                                </Typography>
                            </Box>
                            <Box
                                display={"flex"}
                                flexDirection={"column"}
                                textAlign={"right"}
                            >
                                <Typography
                                    fontSize={10}
                                    fontWeight={500}
                                    color={theme.palette.grey[600]}
                                >
                                    ســــــاعت : {item?.datetime?.split(" ")[1]}
                                </Typography>
                                <Typography
                                    fontSize={{ xs: "10px", md: "14px" }}
                                    fontWeight={700}
                                    color={theme.palette.grey[500]}
                                >
                                    {PersianConvertDate(item?.datetime)}
                                </Typography>
                            </Box>
                        </Box>
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
                                    fontSize={{ xs: "10px", md: "12px" }}
                                    fontWeight={400}
                                    dangerouslySetInnerHTML={{ __html: item?.text ? item?.text : "متنی موجود نیست" }}
                                />
                            </Box>
                        </Box>
                    </Box>
                ))}
                <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    flexDirection={"column"}
                    width={"100%"}
                >
                    <Box
                        display={"flex"}
                        gap={"10px"}
                        alignItems={"center"}
                        width={"100%"}
                    >
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
                            fontSize={{ xs: "12px", md: "16px" }}
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
                        <RichEditor onContentChange={handleEditorChange} />
                    </Box>
                </Box>
                <Box
                    width={"100%"}
                    display={"flex"}
                    justifyContent={"flex-end"}
                    gap={"8px"}
                >
                    <CustomButton
                        variant="outlined"
                        color="error"
                        sx={{ color: "error", minWidth: isMobile ? 120 : 200 }}
                        disabled={editorValue.length <= 0}
                        onClick={() => handleSubmitLevel("reject")}
                    >
                        رد تکلیف{" "}
                    </CustomButton>
                    <CustomButton
                        variant="contained"
                        color="primary"
                        sx={{ minWidth: isMobile ? 120 : 200 }}
                        disabled={editorValue.length <= 0}
                        onClick={() => handleSubmitLevel("accept")}
                    >
                        تایید تکلیف ارسال شده{" "}
                    </CustomButton>
                </Box>
            </Box>
        </>
    );
};
