import React, { useState, useEffect } from "react";
import {
    Box,
    Divider,
    MenuItem,
    Select,
    SelectChangeEvent,
    Tooltip,
    Typography,
    useMediaQuery,
} from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

import theme from "theme";
import PersianTypography from "core/utils/PersianTypoGraphy.utils";
import { CourseLevelAcademyItem } from "core/types";
import frame from "assets/frame.png";

interface CustomBarChartProps {
    levelsDispersion?: CourseLevelAcademyItem["LevelsDispersion"];
    courseList: { uuid: string; title: string }[];
    selectedCourse: string;
    onChangeCourse: (uuid: string) => void;
}

export const CustomBarChart: React.FC<CustomBarChartProps> = ({
    levelsDispersion,
    courseList,
    selectedCourse,
    onChangeCourse,
}) => {
    const isMobile = useMediaQuery("(max-width:768px)");

    const [data, setData] = useState<
        { level: string; percent: number; students: number }[]
    >([]);

    useEffect(() => {
        if (!levelsDispersion || Object.keys(levelsDispersion).length === 0) {
            setData([]);
            return;
        }

        const maxStudents = Math.max(...Object.values(levelsDispersion));
        const newData = Object.entries(levelsDispersion).map(([key, students]) => ({
            level: `سطح ${+key + 1}`,
            percent: Math.round((students / maxStudents) * 100),
            students,
        }));
        setData(newData);
    }, [levelsDispersion]);

    const handleCourseChange = (e: SelectChangeEvent) => {
        onChangeCourse(e.target.value);
    };

    if (data.length === 0) {
        return <Typography>داده‌ای برای نمایش وجود ندارد.</Typography>;
    }

    const selectedBarIndex = 2;

    return (
        <Box p={isMobile ? "8px" : 4} dir="rtl" sx={{
            backgroundImage: `url(${frame})`,
            backgroundRepeat: "repeat",
            backgroundSize: "auto",
            backgroundPosition: "center",
        }}>
            {/* Header */}
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
                mb={3}
                flexDirection={isMobile ? "column" : "row"}
                gap={"4px"}

            >
                <Typography fontSize={isMobile ? 12 : 16} fontWeight="bold">
                    درصد پیشرفت هر سطح بر اساس تعداد دانشجو
                </Typography>
                <Select
                    value={selectedCourse}
                    onChange={handleCourseChange}
                    variant="standard"
                    IconComponent={() => <KeyboardArrowDownRoundedIcon />}
                    sx={{
                        minWidth: "220px",
                        border: "none",
                        "::before": { border: "none" },
                        ":hover:not(.Mui-disabled, .Mui-error):before": { border: "none" },
                        "::after": { border: "none" },
                        "& .MuiSelect-select": {
                            padding: "0px !important",
                            fontSize: "12px",
                        },
                        "& .MuiSvgIcon-root": {
                            right: "unset",
                            left: "7px",
                            opacity: 0.5,
                            width: "16px",
                            height: "16px",
                        },
                    }}
                    MenuProps={{
                        sx: {
                            "& .MuiPaper-root": { borderRadius: "10px" },
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
                    {courseList.map((course) => (
                        <MenuItem
                            key={course.uuid}
                            value={course.uuid}
                            sx={{ borderRadius: "15px", fontSize: "12px", border: "none" }}
                        >
                            {course.title}
                        </MenuItem>
                    ))}
                </Select>
            </Box>

            {/* Chart */}
            <Box
                display="flex"
                alignItems="center"
                height={400}
                justifyContent="center"
                position="relative"
            >
                {/* Vertical Percentage Axis */}
                <Box
                    sx={{
                        position: "absolute",
                        right: isMobile ? "94%" : "99%",
                        height: isMobile ? "80%" : "90%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        mr: 1,
                        mb: "40px",
                    }}
                >
                    {[100, 80, 60, 40, 20, 0].map((value) => (
                        <Typography
                            key={value}
                            fontSize={12}
                            color={theme.palette.grey[500]}
                            sx={{ transform: "translateY(6px)" }}
                        >
                            {value}٪
                        </Typography>
                    ))}
                </Box>

                {/* Bars */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        overflowX: "auto",
                        height: "100%",
                        justifyContent: "space-between",
                        width: "100%",
                        direction: "ltr!important",
                        padding: "0 16px"
                    }}
                >
                    {data.map((item, index) => (
                        <Box key={item.level} sx={{ textAlign: "center", width: isMobile ? 20 : 40 }}>
                            <Tooltip
                                arrow
                                title={
                                    <Box borderRadius={"10px"} display={"flex"} gap={"8px"} alignItems={"center"}>
                                        <Box display={"flex"} gap={"2px"} alignItems={"center"}>
                                            <PersianTypography fontSize={11} color="gray">{item.percent}</PersianTypography>٪
                                        </Box>
                                        <Divider orientation="vertical" flexItem />
                                        <Box display={"flex"} gap={"2px"} alignItems={"center"}>
                                            <PersianTypography fontSize={11} color="gray">
                                                {item.students}
                                            </PersianTypography>
                                            دانشجو
                                        </Box>
                                    </Box>
                                }
                                componentsProps={{
                                    popper: {
                                        modifiers: [
                                            {
                                                name: "offset",
                                                options: {
                                                    offset: [0, 5],
                                                },
                                            },
                                        ],
                                    },
                                    tooltip: {
                                        sx: {
                                            backgroundColor: "#EDF0EF",
                                            color: "#000",
                                            borderRadius: "10px",
                                            padding: "8px 12px",
                                        },
                                    },
                                }}
                            >
                                <Box display="flex" flexDirection="column" gap={"20px"}>
                                    <Box
                                        sx={{
                                            height: `${item.percent * 3}px`,
                                            backgroundColor:
                                                index === selectedBarIndex ? theme.palette.primary[500] : theme.palette.primary[300],
                                            borderRadius: 2,
                                            transition: "0.3s",
                                        }}
                                    />
                                    <PersianTypography
                                        fontSize={10}
                                        color={theme.palette.grey[600]}
                                    >
                                        {item.level}
                                    </PersianTypography>
                                </Box>
                            </Tooltip>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};
