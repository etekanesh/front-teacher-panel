import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Chip, Divider, Snackbar, Typography } from "@mui/material";

import {
    ClipboardIcon,
    CustomButton,
    DocumentIcon,
    DoubleTickIcons,
    EditTwoIcons,
    ListIcons,
    NoteIcon,
} from "uiKit";
import theme from "theme";
import { RichEditor } from "uiKit/RichTextKit";
import { useStudentsStore } from "store/useStudents.store";
import { PersianConvertDate } from "core/utils";
import { postStudentsLevel } from "core/services";

export const AssignmentList: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

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
                    fontSize={16}
                    fontWeight={700}
                    color={theme.palette.grey[500]}
                >
                    تایم لاین انجام تمرین دانشجـــــــــو
                </Typography>
                <Chip
                    label={studentLevelData?.status_label}
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
                                fontSize={16}
                                fontWeight={700}
                                color={theme.palette.grey[500]}
                            >
                                تمرین ارسال شده توسط دانشجو
                            </Typography>
                        </Box>
                        <Box display={"flex"} flexDirection={"column"} textAlign={"right"}>
                            <Typography
                                fontSize={10}
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
                                fontSize={14}
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
                                    fontSize={16}
                                    fontWeight={700}
                                    color={theme.palette.grey[500]}
                                >
                                    {item?.user?.role === 3
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
                                    fontSize={14}
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
                                    fontSize={12}
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
                        sx={{ color: "error", minWidth: 200 }}
                        disabled={editorValue.length <= 0}
                        onClick={() => handleSubmitLevel("reject")}
                    >
                        رد تکلیف{" "}
                    </CustomButton>
                    <CustomButton
                        variant="contained"
                        color="primary"
                        sx={{ minWidth: 200 }}
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
