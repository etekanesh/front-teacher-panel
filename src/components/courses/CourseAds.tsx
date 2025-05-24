import React, { useState } from "react";
import {
    Box,
    Typography,
    Modal,
    Paper,
    TextField,
    useMediaQuery,
} from "@mui/material";

import { CustomButton, DocumentCourseIcon } from "uiKit";
import theme from "theme";
import { useCoursesStore } from "store/useCourses.store";
import { postNewHeadlineCourse } from "core/services";
import { AddEpisodeForm } from "./AddEpisodeForm";

type Props = {
    courseId: string;
};

export const CourseAds: React.FC<Props> = ({ courseId }) => {
    const isMobile = useMediaQuery("(max-width:768px)");
    const { courseByIdtData, fetchCourseByIdData } = useCoursesStore();

    const [openLevelModal, setOpenLevelModal] = useState(false);
    const [openSectionModal, setOpenSectionModal] = useState(false);

    const [displayName, setDisplayName] = useState("");

    const handleNewHeadline = async () => {
        const level = courseByIdtData?.headlines.length + 1;
        const levelId = courseId;
        try {
            await postNewHeadlineCourse(levelId, {
                level,
                display_name: displayName.trim(),
            }).then(() => {
                fetchCourseByIdData(courseId);
                setOpenLevelModal(false);
                setDisplayName("");
            })
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            {/* Main Card */}
            <Box display={"flex"} flexDirection={"column"} gap={"21px"}>
                <Box
                    component={"img"}
                    src={courseByIdtData?.thumbnail}
                    width={317}
                    height={207}
                    borderRadius={"10px"}
                />
                <Box display={"flex"} gap={"7px"} flexDirection={"column"}>
                    <Typography fontSize={16} fontWeight={700} color={"grey.500"}>
                        {courseByIdtData?.title}
                    </Typography>
                    <Box
                        bgcolor={"grey.400"}
                        height={"24px"}
                        borderRadius={"15px"}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        <Typography color={"grey.600"} fontSize={12}>
                            {courseByIdtData?.title}
                        </Typography>
                    </Box>
                </Box>

                {/* Action Buttons */}
                <Box
                    display={"flex"}
                    gap={"4px"}
                    justifyContent={"space-between"}
                    width={"100%"}
                >
                    <CustomButton
                        color="primary"
                        variant="outlined"
                        fullWidth
                        onClick={() => setOpenLevelModal(true)}
                    >
                        <Typography fontWeight={500} fontSize={isMobile ? 12 : 16}>
                            ایجاد سطح
                        </Typography>
                    </CustomButton>
                    <CustomButton
                        color="primary"
                        fullWidth
                        onClick={() => setOpenSectionModal(true)}
                    >
                        <Typography
                            color={"white"}
                            fontSize={isMobile ? 12 : 16}
                            fontWeight={500}
                        >
                            ایجاد بخش جدید
                        </Typography>
                    </CustomButton>
                </Box>
            </Box>

            <Modal open={openLevelModal} onClose={() => setOpenLevelModal(false)}>
                <Paper
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: isMobile ? 345 : 525,
                        p: 4,
                        borderRadius: 2,
                        outline: "none",
                    }}
                >
                    <Box
                        display={"flex"}
                        flexDirection={"column"}
                        gap={"22px"}
                        alignItems={"center"}
                        justifyContent={"center"}
                    >
                        <Box
                            display={"flex"}
                            gap={"8px"}
                            flexDirection={"column"}
                            justifyContent={"center"}
                            alignItems={"center"}
                        >
                            <Box
                                borderRadius={"50%"}
                                width={51}
                                height={51}
                                display={"flex"}
                                alignItems={"center"}
                                justifyContent={"center"}
                                bgcolor={theme.palette.grey[300]}
                            >
                                <DocumentCourseIcon color="#334155" width={22} height={22} />
                            </Box>
                            <Typography
                                fontSize={14}
                                color={theme.palette.grey[500]}
                                fontWeight={700}
                            >
                                ایجـــــــاد سطح جدیـــــــــــــد
                            </Typography>
                        </Box>
                        {/* <Box
                            borderRadius="8px"
                            display="flex"
                            flexDirection="column"
                            gap={2}
                            width={"100%"}
                        >
                            <Box display="flex" flexDirection="column" gap={"7px"}>
                                <Typography
                                    fontWeight={600}
                                    fontSize={12}
                                    color={theme.palette.grey[500]}
                                >
                                    تعداد ویدیو ها *
                                </Typography>
                                <TextField
                                    value="3"
                                    sx={{
                                        borderRadius: "8px",
                                        height: "34px",
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "8px",
                                            height: "34px",
                                            borderColor: theme.palette.grey[400],
                                            "& fieldset": { borderColor: theme.palette.grey[400] },
                                            "&:hover fieldset": {
                                                borderColor: theme.palette.grey[600],
                                            },
                                            "&.Mui-focused fieldset": {
                                                borderColor: theme.palette.primary.main,
                                            },
                                        },
                                        "& .MuiInputBase-input": {
                                            fontSize: "11px",
                                        },
                                        "& .MuiInputBase-input::placeholder": {
                                            fontSize: "11px",
                                        },
                                    }}
                                />
                            </Box>
                        </Box> */}
                        <Box
                            borderRadius="8px"
                            display="flex"
                            flexDirection="column"
                            gap={2}
                            width={"100%"}
                        >
                            <Box display="flex" flexDirection="column" gap={"7px"}>
                                <Typography
                                    fontWeight={600}
                                    fontSize={12}
                                    color={theme.palette.grey[500]}
                                >
                                    شماره ی سطـــــــح *{" "}
                                </Typography>
                                <TextField
                                    disabled
                                    sx={{
                                        borderRadius: "8px",
                                        height: "34px",
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "8px",
                                            height: "34px",
                                            borderColor: theme.palette.grey[400],
                                            "& fieldset": { borderColor: theme.palette.grey[400] },
                                            "&:hover fieldset": {
                                                borderColor: theme.palette.grey[600],
                                            },
                                            "&.Mui-focused fieldset": {
                                                borderColor: theme.palette.primary.main,
                                            },
                                        },
                                        "& .MuiInputBase-input": {
                                            fontSize: "11px",
                                        },
                                        "& .MuiInputBase-input::placeholder": {
                                            fontSize: "11px",
                                        },
                                    }}
                                    value={`سطح ${courseByIdtData?.headlines.length + 1} `}
                                />
                            </Box>

                            <Box display="flex" flexDirection="column" gap={1}>
                                <Typography
                                    fontWeight={600}
                                    fontSize={12}
                                    color={theme.palette.grey[500]}
                                >
                                    اسم سطـــــــح *
                                </Typography>
                                <TextField
                                    placeholder="اسم سطح را وارد کنید"
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    sx={{
                                        borderRadius: "8px",
                                        height: "34px",
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "8px",
                                            height: "34px",
                                            borderColor: theme.palette.grey[400],
                                            "& fieldset": { borderColor: theme.palette.grey[400] },
                                            "&:hover fieldset": {
                                                borderColor: theme.palette.grey[600],
                                            },
                                            "&.Mui-focused fieldset": {
                                                borderColor: theme.palette.primary.main,
                                            },
                                        },
                                        "& .MuiInputBase-input": {
                                            fontSize: "11px",
                                        },
                                        "& .MuiInputBase-input::placeholder": {
                                            fontSize: "11px",
                                        },
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box
                            display={"flex"}
                            justifyContent={"space-between"}
                            gap={2}
                            width={"100%"}
                        >
                            <CustomButton
                                variant="outlined"
                                color="primary"
                                fullWidth
                                onClick={() => setOpenLevelModal(false)}
                            >
                                انصراف
                            </CustomButton>
                            <CustomButton
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={displayName.length == 0}
                                onClick={() => handleNewHeadline()}
                            >
                                ثبت
                            </CustomButton>
                        </Box>
                    </Box>
                </Paper>
            </Modal>

            <Modal open={openSectionModal} onClose={() => setOpenSectionModal(false)}>
                <Paper
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: isMobile ? 345 : 525,
                        p: isMobile ? 2 : 4,
                        borderRadius: 2,
                        outline: "none",
                    }}
                >
                    <AddEpisodeForm courseId={courseId} setOpenSectionModal={setOpenSectionModal} />
                </Paper>
            </Modal>
        </>
    );
};
