import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";
import moment from "moment-jalaali";
import { AdapterMomentJalaali } from "@mui/x-date-pickers/AdapterMomentJalaali";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Avatar, IconButton } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

import { CustomButton } from "uiKit";
import theme from "theme";

const ProfilePictureUploader: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box display="flex" alignItems="center" gap={1}>
      {/* Profile Image */}
      <Box
        sx={{
          position: "relative",
          width: 80,
          height: 80,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar
          src={image || "/default-profile.jpg"}
          sx={{ width: 80, height: 80, border: "2px dashed #ddd" }}
        />
        {/* Upload Button Overlay */}
        <IconButton
          component="label"
          sx={{
            position: "absolute",
            bottom: 5,
            right: 5,
            background: "rgba(255, 255, 255, 0.8)",
            borderRadius: "50%",
            width: 24,
            height: 24,
            boxShadow: 1,
            "&:hover": { background: "rgba(255, 255, 255, 1)" },
          }}
        >
          <AddAPhotoIcon sx={{ fontSize: 16, color: "#555" }} />
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageUpload}
          />
        </IconButton>
      </Box>

      {/* Name and Title */}
      <Box>
        <Typography fontWeight={600}>تیدا گودرزی</Typography>
        <Typography fontSize={12} color="gray">
          مدرس آکادمی
        </Typography>
      </Box>
    </Box>
  );
};

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationalCode: string;
  birthDate: moment.Moment | null;
}

export const ProfileForm: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:768px)");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      nationalCode: "",
      birthDate: null,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      width="100%"
      flex={1}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <ProfilePictureUploader />
      {/* First Name & Last Name */}
      <Box
        display="flex"
        justifyContent="space-between"
        gap="8px"
        flexDirection={isMobile ? "column" : "row"}
      >
        {["firstName", "lastName"].map((field) => (
          <Box
            key={field}
            display="flex"
            flexDirection="column"
            gap="4px"
            flex="1"
          >
            <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>
              {field === "firstName" ? "نام" : "نام خانوادگی"}
            </Typography>
            <Controller
              name={field as keyof FormData}
              control={control}
              rules={{ required: "این فیلد الزامی است" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder={
                    field.name === "firstName"
                      ? "نام را وارد کنید..."
                      : "نام خانوادگی را وارد کنید..."
                  }
                  fullWidth
                  error={!!errors[field.name]}
                  helperText={errors[field.name]?.message}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "34px",
                      borderRadius: "8px",
                      "& .MuiInputBase-input": {
                        fontSize: "12px",
                      },
                    },
                  }}
                />
              )}
            />
          </Box>
        ))}
      </Box>

      {/* Phone & Email */}
      <Box
        display="flex"
        justifyContent="space-between"
        gap="8px"
        flexDirection={isMobile ? "column" : "row"}
      >
        {["phone", "email"].map((field) => (
          <Box
            key={field}
            display="flex"
            flexDirection="column"
            gap="4px"
            flex="1"
          >
            <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>
              {field === "phone" ? "شماره تلفن" : "ایمیل"}
            </Typography>
            <Controller
              name={field as keyof FormData}
              control={control}
              rules={{ required: "این فیلد الزامی است" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder={
                    field.name === "phone"
                      ? "شماره تلفن را وارد کنید..."
                      : "ایمیل را وارد کنید..."
                  }
                  fullWidth
                  error={!!errors[field.name]}
                  helperText={errors[field.name]?.message}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "34px",
                      borderRadius: "8px",
                      "& .MuiInputBase-input": {
                        fontSize: "12px",
                      },
                    },
                  }}
                />
              )}
            />
          </Box>
        ))}
      </Box>

      {/* National Code & Birth Date */}
      <Box
        display="flex"
        justifyContent="space-between"
        gap="8px"
        flexDirection={isMobile ? "column" : "row"}
      >
        <Box display="flex" flexDirection="column" gap="4px" flex="1">
          <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>
            کد ملی
          </Typography>
          <Controller
            name="nationalCode"
            control={control}
            rules={{ required: "این فیلد الزامی است" }}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="کد ملی را وارد کنید..."
                fullWidth
                error={!!errors.nationalCode}
                helperText={errors.nationalCode?.message}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "34px",
                    borderRadius: "8px",
                    "& .MuiInputBase-input": {
                      fontSize: "12px",
                    },
                  },
                }}
              />
            )}
          />
        </Box>
        <Box display="flex" flexDirection="column" gap="4px" flex="1">
          <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>
            تاریخ تولد
          </Typography>
          <LocalizationProvider dateAdapter={AdapterMomentJalaali}>
            <Controller
              name="birthDate"
              control={control}
              rules={{ required: "این فیلد الزامی است" }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  value={field.value}
                  onChange={(date) => field.onChange(date)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.birthDate,
                      helperText: errors.birthDate?.message,
                      sx: {
                        "& .MuiOutlinedInput-root": {
                          height: "34px",
                          borderRadius: "8px",
                          "& .MuiInputBase-input": {
                            fontSize: "12px",
                          },
                        },
                      },
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </Box>
      </Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box display={"flex"} gap={"8px"} alignItems={"center"}>
          <Typography fontSize={"12px"}>وضعیت اتصال به ربات تلگرام</Typography>
          <CustomButton
            variant="contained"
            sx={{ backgroundColor: "#4DB2D2", fontWeight: 500 }}
          >
            اتصال به تلگــــــــــــرام
          </CustomButton>
        </Box>
        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          sx={{
            width: "222px",
            height: "34px",
            fontSize: "16px",
            fontWeight: 500,
            backgroundColor: theme.palette.primary[600],
          }}
        >
          ذخیره تغییــــــــــرات{" "}
        </Button>
      </Box>
    </Box>
  );
};
