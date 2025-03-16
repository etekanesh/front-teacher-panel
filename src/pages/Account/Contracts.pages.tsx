import React from "react";
import { Box, Paper, Typography, useMediaQuery } from "@mui/material";

import theme from "theme";
import { HeaderLayout } from "layouts";
import { BreadCrumbsModel } from "types";
import { CustomButton, DocumentIcon } from "uiKit";

const breadcrumbData: BreadCrumbsModel[] = [
    {
        title: "ویرایش حساب کاربــــــــری",
        link: "/",
        id: "1",
        color: theme.palette.grey[600],
        active: false,
    },
    {
        title: "قـــــــرارداد",
        link: "/account/contracts",
        id: "2",
        color: theme.palette.grey[600],
        active: true,
    },
];

export const ContractsPage: React.FC = () => {
    const isMobile = useMediaQuery("(max-width:768px)");

    return (
        <>
            <HeaderLayout
                title="ویرایش حساب کاربــــــــری"
                breadcrumb={breadcrumbData}
            />
            <Box
                display={"flex"}
                flexDirection={"column"}
                height={isMobile ? "75vh" : "100vh"}
                overflow={"auto"}
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
                        <DocumentIcon
                            color={theme.palette.primary[600]}
                            width={22}
                            height={22}
                        />
                        <Typography
                            fontSize={16}
                            fontWeight={700}
                            color={theme.palette.grey[500]}
                        >
                            قـــــــرارداد{" "}
                        </Typography>
                    </Box>
                </Paper>
                <Box
                    bgcolor={theme.palette.grey[200]}
                    minHeight={600}
                    display={"flex"}
                    gap={"30px"}
                    flexDirection={"column"}
                    padding={isMobile ? "0 16px" : 0}
                >
                    <Box
                        display={"flex"}
                        alignItems={"flex-start"}
                        justifyContent={"center"}
                        gap={"10px"}
                        flexDirection={"column"}
                        maxWidth={672}
                        margin={isMobile ? 0 : "34px auto"}
                    >
                        <Typography
                            fontSize={"16px"}
                            fontWeight={700}
                            color={theme.palette.grey[500]}
                            display={isMobile ? "none" : "block"}
                        >
                            متن قـــــــرارداد
                        </Typography>
                        <Typography
                            fontSize={"14px"}
                            textAlign={"justify"}
                            color={theme.palette.grey[500]}
                        >
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                            در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
                            نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
                            کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
                            جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای
                            طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان
                            فارسی ایجاد کرد.{" "}
                        </Typography>
                        <Typography
                            fontSize={"14px"}
                            textAlign={"justify"}
                            color={theme.palette.grey[500]}
                        >
                            چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم
                            است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با
                            هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد
                            گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد.{" "}
                        </Typography>
                        <Typography
                            fontSize={"14px"}
                            textAlign={"justify"}
                            color={theme.palette.grey[500]}
                        >
                            تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص
                            طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت
                            می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و
                            شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی
                            دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی
                            اساسا مورد استفاده قرار گیرد.لورم ایپسوم متن ساختگی با تولید سادگی
                            نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و
                            متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای
                            شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود
                            ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال
                            و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم
                            افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان
                            خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان
                            امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت
                            تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی،
                            و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده
                            قرار گیرد.{" "}
                        </Typography>
                    </Box>
                    <Box
                        display={"flex"}
                        gap={"12px"}
                        margin={"0 auto"}
                        width={"100%"}
                        maxWidth={672}
                        flexDirection={isMobile ? "column-reverse" : "row"}
                    >
                        <CustomButton variant="outlined" color="primary" fullWidth>
                            چت با پشتیبانـــــــی
                        </CustomButton>
                        <CustomButton
                            variant="contained"
                            fullWidth
                            sx={{
                                backgroundColor: theme.palette.primary[600],
                            }}
                        >
                            شرایط و قوانین را میپذیرم
                        </CustomButton>
                    </Box>
                </Box>
            </Box>
        </>
    );
};
