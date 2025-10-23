import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { 
    Box, 
    Paper, 
    Typography, 
    useMediaQuery, 
    Tabs, 
    Tab, 
    TextField 
} from "@mui/material";
import { useLocation } from "react-router-dom";

import theme from "theme";
import { ProfileForm, BankCard } from "components";
import { BreadCrumbsModel } from "core/types";
import { HeaderLayout } from "layouts";
import { EditIcons, WalletIcon, DocumentIcon, CustomButton } from "uiKit";
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

interface BankFormData {
    bankName: string;
    shebaNumber: string;
    cardNumber: string;
    accountNumber: string;
    cardHolderName: string;
}

export const GeneralInfoPage: React.FC = () => {
    const isMobile = useMediaQuery("(max-width:768px)");
    const { fetching, userData } = useUsersStore();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(0);

    // Set initial tab based on URL
    useEffect(() => {
        if (location.pathname.includes('/bank-info')) {
            setActiveTab(1);
        } else if (location.pathname.includes('/contracts')) {
            setActiveTab(2);
        } else {
            setActiveTab(0);
        }
    }, [location.pathname]);
    
    const [bankFormData, setBankFormData] = useState<BankFormData>({
        bankName: "",
        shebaNumber: "",
        cardNumber: "",
        accountNumber: "",
        cardHolderName: "",
    });

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const handleBankFormChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBankFormData({ ...bankFormData, [e.target.name]: e.target.value });
    };

    const handleBankFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 0: // General Info
                return <ProfileForm userData={userData && userData} />;
            
            case 1: // Bank Info
                return (
                    <Box
                        bgcolor={theme.palette.grey[200]}
                        minHeight={600}
                        display={"flex"}
                        justifyContent={"space-between"}
                        flexDirection={isMobile ? "column-reverse" : "row"}
                    >
                        <Box
                            component="form"
                            onSubmit={handleBankFormSubmit}
                            width={"100%"}
                            flex={1}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "7px",
                                p: isMobile ? "19px 16px" : "39px 33px",
                            }}
                        >
                            <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>
                                نام بانک
                            </Typography>
                            <TextField
                                name="bankName"
                                placeholder="نام بانک را وارد کنید..."
                                fullWidth
                                onChange={handleBankFormChange}
                                value={bankFormData.bankName}
                                sx={{
                                    borderRadius: "8px",
                                    height: "34px",
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "8px",
                                        height: "34px",
                                        borderColor: theme.palette.grey[400],
                                        "& fieldset": { borderColor: theme.palette.grey[400] },
                                        "&:hover fieldset": { borderColor: theme.palette.grey[600] },
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

                            <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>
                                شماره شبا
                            </Typography>
                            <TextField
                                name="shebaNumber"
                                placeholder="شماره شبا  را وارد کنید..."
                                fullWidth
                                onChange={handleBankFormChange}
                                value={bankFormData.shebaNumber}
                                sx={{
                                    borderRadius: "8px",
                                    height: "34px",
                                    "& .MuiInputBase-input": {
                                        fontSize: "11px",
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "8px",
                                        height: "34px",
                                        borderColor: theme.palette.grey[400],
                                        "& fieldset": { borderColor: theme.palette.grey[400] },
                                        "&:hover fieldset": { borderColor: theme.palette.grey[600] },
                                        "&.Mui-focused fieldset": {
                                            borderColor: theme.palette.primary.main,
                                        },
                                    },
                                    "& .MuiInputBase-input::placeholder": {
                                        fontSize: "11px",
                                    },
                                }}
                            />
                            <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>
                                شماره ۱۶ رقمی کارت
                            </Typography>
                            <TextField
                                name="cardNumber"
                                placeholder="شماره ۱۶ رقمی کارت را وارد کتید..."
                                fullWidth
                                onChange={handleBankFormChange}
                                value={bankFormData.cardNumber}
                                sx={{
                                    fontSize: "11px",
                                    borderRadius: "8px",
                                    height: "34px",
                                    "& .MuiInputBase-input": {
                                        fontSize: "11px",
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "8px",
                                        height: "34px",
                                        borderColor: theme.palette.grey[400],
                                        "& fieldset": { borderColor: theme.palette.grey[400] },
                                        "&:hover fieldset": { borderColor: theme.palette.grey[600] },
                                        "&.Mui-focused fieldset": {
                                            borderColor: theme.palette.primary.main,
                                        },
                                    },
                                    "& .MuiInputBase-input::placeholder": {
                                        fontSize: "11px",
                                    },
                                }}
                            />

                            <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>
                                شماره حساب
                            </Typography>
                            <TextField
                                name="accountNumber"
                                placeholder="شماره حساب را وارد کنید..."
                                fullWidth
                                onChange={handleBankFormChange}
                                value={bankFormData.accountNumber}
                                sx={{
                                    borderRadius: "8px",
                                    height: "34px",
                                    "& .MuiInputBase-input": {
                                        fontSize: "11px",
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "8px",
                                        height: "34px",
                                        borderColor: theme.palette.grey[400],
                                        "& fieldset": { borderColor: theme.palette.grey[400] },
                                        "&:hover fieldset": { borderColor: theme.palette.grey[600] },
                                        "&.Mui-focused fieldset": {
                                            borderColor: theme.palette.primary.main,
                                        },
                                    },
                                    "& .MuiInputBase-input::placeholder": {
                                        fontSize: "11px",
                                    },
                                }}
                            />

                            <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>
                                نام صاحب کارت
                            </Typography>
                            <TextField
                                name="cardHolderName"
                                placeholder="نام صاحب کارت را وارد کنید..."
                                fullWidth
                                required
                                onChange={handleBankFormChange}
                                value={bankFormData.cardHolderName}
                                sx={{
                                    borderRadius: "8px",
                                    height: "34px",
                                    "& .MuiInputBase-input": {
                                        fontSize: "11px",
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "8px",
                                        height: "34px",
                                        borderColor: theme.palette.grey[400],
                                        "& fieldset": { borderColor: theme.palette.grey[400] },
                                        "&:hover fieldset": { borderColor: theme.palette.grey[600] },
                                        "&.Mui-focused fieldset": {
                                            borderColor: theme.palette.primary.main,
                                        },
                                    },
                                    "& .MuiInputBase-input::placeholder": {
                                        fontSize: "11px",
                                    },
                                }}
                            />
                            <Box display={"flex"} justifyContent={"flex-end"} marginTop={"30px"}>
                                <CustomButton
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        fontSize: "16px",
                                        backgroundColor: theme.palette.primary[600],
                                        maxWidth: "222px",
                                        height: "34px",
                                        fontWeight: "500"
                                    }}
                                    fullWidth
                                >
                                    ذخیره تغییــــــــــرات
                                </CustomButton>
                            </Box>
                        </Box>
                        <Box flex={1} display={"flex"} justifyContent={"center"} alignItems={isMobile ? "center" : "flex-start"}>
                            <BankCard />
                        </Box>
                    </Box>
                );
            
            case 2: // Contracts
                return (
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
                );
            
            default:
                return null;
        }
    };

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
                                bgcolor: "white",
                                borderRadius: "10px 10px 0 0",
                                boxShadow: "-12px 0px 67.1px 0px #6B857E17",
                                [theme.breakpoints.down("sm")]: {
                                    boxShadow: "none",
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 15,
                                    alignItems: "center",
                                    padding: "18px 28px",
                                    [theme.breakpoints.down("sm")]: {
                                        flexDirection: "column",
                                        gap: "8px",
                                        alignItems: "flex-start",
                                        padding: isMobile ? "10px 16px" : "15px 16px 20px",
                                    },
                                }}
                            >
                                <Box display={"flex"} flex={1} gap={"10px"} alignItems={"center"}>
                                    {activeTab === 0 && <EditIcons
                                        color={theme.palette.primary[600]}
                                        width={22}
                                        height={22}
                                    />}
                                    {activeTab === 1 && <WalletIcon
                                        color={theme.palette.primary[600]}
                                        width={22}
                                        height={22}
                                    />}
                                    {activeTab === 2 && <DocumentIcon
                                        color={theme.palette.primary[600]}
                                        width={22}
                                        height={22}
                                    />}
                                    <Typography
                                        fontSize={16}
                                        fontWeight={700}
                                        color={theme.palette.grey[500]}
                                    >
                                        {activeTab === 0 && "مشخصات عمومـــــــــی"}
                                        {activeTab === 1 && "مشخصات حساب بانکی"}
                                        {activeTab === 2 && "قـــــــرارداد"}
                                    </Typography>
                                </Box>
                            </Box>
                            <Tabs
                                value={activeTab}
                                onChange={handleTabChange}
                                sx={{
                                    borderBottom: 1,
                                    borderColor: 'divider',
                                    '& .MuiTab-root': {
                                        textTransform: 'none',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                    },
                                }}
                            >
                                <Tab label="مشخصات عمومی" />
                                <Tab label="مشخصات بانکی" />
                                <Tab label="قرارداد" />
                            </Tabs>
                        </Paper>
                        <Box
                            bgcolor={theme.palette.grey[200]}
                            minHeight={600}
                            display={"flex"}
                            gap={"30px"}
                            flexDirection={"column"}
                            padding={isMobile ? "0 16px" : "28px"}
                        >
                            {renderTabContent()}
                        </Box>
                    </Box>
                </>
            )}
        </>
    );
};
