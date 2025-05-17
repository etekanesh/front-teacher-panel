import React from "react";
import { Box, Typography } from "@mui/material";

import Image from "assets/course-image.png";
import { CustomButton } from "uiKit";

export const CourseAds: React.FC = () => {
    return (
        <Box display={"flex"} flexDirection={"column"} gap={"21px"}>
            <Box component={"img"} src={Image} />
            <Box display={"flex"} gap={"7px"} flexDirection={"column"}>
                <Typography fontSize={16} fontWeight={700} color={"grey.500"}>
                    کسب درآمد دلاری از فریلنسری
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
                        چالش های ساخت اکانت + بررسی درآمد + انتقال درآمد به ایران{" "}
                    </Typography>
                </Box>
            </Box>
            <CustomButton color="primary">
                <Typography color={"white"} fontSize={16} fontWeight={700}>
                    ویرایش دوره{" "}
                </Typography>
            </CustomButton>
        </Box>
    );
};
