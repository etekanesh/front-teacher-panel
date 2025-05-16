import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField } from "@mui/material";

import { postLogin, postOtp } from "core/services";
import { CustomButton } from "uiKit";

export const LoginPages: React.FC = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        identity: "",
        otp: "",
    });
    const [otpSent, setOtpSent] = useState(false)

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: any) => {
        if (otpSent) {
            e.preventDefault();
            postLogin(formData).then((res) => {
                if (res) {
                    navigate("/teacher/dashboard")
                }
            });

        }
        else {
            e.preventDefault();
            postOtp(formData).then((res) => {
                if (res) {
                    setOtpSent(true)
                }
            });
        }
    };

    return (
        <Box height={"100vh"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "300px",
                    gap: "10px",
                }}
            >
                <TextField
                    type="text"
                    name="identity"
                    placeholder="شماره تلفن"
                    value={formData.identity}
                    fullWidth

                    sx={{
                        "& .MuiOutlinedInput-root": {
                            height: "34px",
                            borderRadius: "8px",
                            "& .MuiInputBase-input": {
                                fontSize: "12px",
                            },
                        },
                    }}
                    onChange={handleChange}
                />
                {otpSent &&
                    <TextField
                        type="text"
                        name="otp"
                        placeholder="Enter OTP"
                        value={formData.otp}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                height: "34px",
                                borderRadius: "8px",
                                "& .MuiInputBase-input": {
                                    fontSize: "12px",
                                },
                            },
                        }}
                        onChange={handleChange}
                    />
                }

                <CustomButton type="submit">ورود</CustomButton>
            </form>
        </Box>

    );
};

