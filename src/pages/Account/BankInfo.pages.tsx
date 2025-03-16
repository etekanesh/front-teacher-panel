import React, { ChangeEvent, FormEvent, useState } from "react";
import {
    Box,
    Paper,
    TextField,
    Typography,
    useMediaQuery,
} from "@mui/material";

import theme from "theme";
import { HeaderLayout } from "layouts";
import { BreadCrumbsModel } from "types";
import { CustomButton, WalletIcon } from "uiKit";
import { BankCard } from "components";

const breadcrumbData: BreadCrumbsModel[] = [
    {
        title: "ویرایش حساب کاربــــــــری",
        link: "/",
        id: "1",
        color: theme.palette.grey[600],
        active: false,
    },
    {
        title: "مشخصات حساب بانکی",
        link: "/account/bank-info",
        id: "2",
        color: theme.palette.grey[600],
        active: true,
    },
];

interface FormData {
    bankName: string;
    shebaNumber: string;
    cardNumber: string;
    accountNumber: string;
    cardHolderName: string;
}

export const BankInfoPage: React.FC = () => {
    const isMobile = useMediaQuery("(max-width:768px)");

    const [formData, setFormData] = useState<FormData>({
        bankName: "",
        shebaNumber: "",
        cardNumber: "",
        accountNumber: "",
        cardHolderName: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form Data:", formData);
    };

    return (
        <>
            <HeaderLayout
                title="ویرایش حساب کاربــــــــری"
                breadcrumb={breadcrumbData}
            />
            <Box display={"flex"} flexDirection={"column"} height={isMobile ? "75vh" : "100vh"} overflow={"auto"}>
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
                            padding: "15px 16px 20px",
                            boxShadow: "none",
                        },
                    }}
                >
                    <Box display={"flex"} flex={1} gap={"10px"} alignItems={"center"}>
                        <WalletIcon
                            color={theme.palette.primary[600]}
                            width={22}
                            height={22}
                        />
                        <Typography
                            fontSize={16}
                            fontWeight={700}
                            color={theme.palette.grey[500]}
                        >
                            مشخصات حساب بانکی
                        </Typography>
                    </Box>
                </Paper>
                <Box
                    bgcolor={theme.palette.grey[200]}
                    minHeight={600}
                    display={"flex"}
                    justifyContent={"space-between"}
                    flexDirection={isMobile ? "column-reverse" : "row"}
                >
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
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
                            onChange={handleChange}
                            value={formData.bankName}
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
                            name="shabaNumber"
                            placeholder="شماره شبا  را وارد کنید..."
                            fullWidth
                            onChange={handleChange}
                            value={formData.shebaNumber}
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
                            onChange={handleChange}
                            value={formData.cardNumber}
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
                                    fontSize: "11px", // Set the placeholder font size here
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
                            onChange={handleChange}
                            value={formData.accountNumber}
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
                                    fontSize: "11px", // Set the placeholder font size here
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
                            onChange={handleChange}
                            value={formData.cardHolderName}
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
            </Box >
        </>
    );
};
