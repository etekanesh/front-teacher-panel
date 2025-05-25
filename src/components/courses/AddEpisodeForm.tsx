import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    Box,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";

import { CustomButton, DocumentCourseIcon, DocumentUploadIcon } from "uiKit";
import { postNewEpisodeCourse } from "core/services";
import theme from "theme";
import { useCoursesStore } from "store/useCourses.store";

type FormValues = {
    title: string;
    headline: string;
    description: string;
    file: FileList;
    priority: number;
};

type Props = {
    courseId: string;
    setOpenSectionModal: (status: boolean) => void;
};

export const AddEpisodeForm: React.FC<Props> = ({
    courseId,
    setOpenSectionModal,
}) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormValues>();
    const { courseByIdtData } = useCoursesStore();

    const { ref, ...restRegister } = register("file", {
        required: "فایل ویدیو الزامی است",
    });
    const [priority, setPriority] = React.useState<number>(1);

    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: FormValues) => {
        const file = data.file[0];
        setLoading(true);
        if (!file || file.type !== "video/mp4") {
            alert("فقط فایل MP4 مجاز است.");
            return;
        }
        try {
            await postNewEpisodeCourse(courseId, {
                file,
                headline: data.headline,
                title: data.title,
                priority: priority,
                description: data.description,
            }).finally(() => setLoading(false));

            setOpenSectionModal(false);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <Box
                display={"flex"}
                flexDirection={"column"}
                gap={"22px"}
                alignItems={"center"}
                justifyContent={"center"}
            >
                {/* آیکون و تیتر */}
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
                        ایجـــــــاد بخش جدیـــــــــــــد
                    </Typography>
                </Box>

                {/* آپلود ویدیو */}
                <Box
                    sx={{
                        p: "8px 18px",
                        border: "1px dashed",
                        borderColor: theme.palette.grey[600],
                        width: "100%",
                        borderRadius: "10px",
                        cursor: "pointer",
                        overflow: "hidden",
                    }}
                    component="label"
                    htmlFor="upload-input"
                >
                    <Box display="flex" gap="9px" alignItems="center">
                        <Box
                            borderRadius="50%"
                            width={31}
                            height={31}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            bgcolor={theme.palette.primary[100]}
                        >
                            <DocumentUploadIcon width={16} height={16} />
                        </Box>
                        <Typography
                            fontSize={12}
                            color={theme.palette.primary[600]}
                            fontWeight={700}
                        >
                            آپلود فایل
                        </Typography>
                        <input
                            type="file"
                            accept="video/mp4"
                            id="upload-input"
                            {...restRegister}
                            ref={(e) => {
                                ref(e);
                            }}
                            onChange={(e) => {
                                restRegister.onChange(e);
                                const file = e.target.files?.[0];
                                if (file) {
                                    setUploadedFileName(file.name);
                                    setUploadProgress(0);
                                }
                            }}
                            style={{ display: "none" }}
                        />
                        {uploadProgress > 0 && uploadProgress < 100 && (
                            <Typography fontSize={11} mt={1} color="text.secondary">
                                در حال آپلود: {uploadProgress}٪
                            </Typography>
                        )}

                        {uploadedFileName && uploadProgress === 100 && (
                            <Typography fontSize={11} mt={1} color={theme.palette.grey[700]}>
                                فایل آپلود شده: {uploadedFileName}
                            </Typography>
                        )}
                        {errors.file && (
                            <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                                {errors.file.message}
                            </Typography>
                        )}
                    </Box>
                </Box>

                {/* عنوان سطح */}
                <Box display="flex" flexDirection="column" gap={"7px"} width={"100%"}>
                    <Typography
                        fontWeight={600}
                        fontSize={12}
                        color={theme.palette.grey[500]}
                    >
                        عنوان بخش *
                    </Typography>
                    <TextField
                        fullWidth
                        placeholder="عنوان بخش"
                        {...register("title", { required: "عنوان الزامی است" })}
                        error={!!errors.title}
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
                            "& .MuiInputBase-input": { fontSize: "11px" },
                            "& .MuiInputBase-input::placeholder": { fontSize: "11px" },
                        }}
                    />
                </Box>

                <Box
                    width={"100%"}
                    display={"flex"}
                    flexDirection={"column"}
                    gap={"8px"}
                >
                    <InputLabel
                        id="level-select-label"
                        sx={{
                            fontSize: 12,
                            color: theme.palette.grey[500],
                            fontWeight: 700,
                        }}
                    >
                        کدام سطح از دوره *
                    </InputLabel>
                    <Controller
                        name="headline"
                        control={control}
                        rules={{ required: "انتخاب سطح الزامی است" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                labelId="level-select-label"
                                sx={{
                                    fontSize: 11,
                                    height: 34,
                                    width: "100%",
                                    borderRadius: "10px",
                                    "& .MuiSelect-select": {
                                        paddingTop: "6px",
                                        paddingBottom: "6px",
                                    },
                                }}
                                error={!!errors.headline}
                                onChange={(e) => {
                                    field.onChange(e);

                                    const selectedUuid = e.target.value;
                                    const selectedHeadline = courseByIdtData?.headlines.find(
                                        (hl) => hl.uuid === selectedUuid
                                    );
                                    if (selectedHeadline) {
                                        setPriority(selectedHeadline.episodes.length + 1);
                                    } else {
                                        setPriority(1);
                                    }
                                }}
                            >
                                {courseByIdtData?.headlines.map((level) => (
                                    <MenuItem
                                        key={level.uuid}
                                        value={level.uuid}
                                        sx={{
                                            borderRadius: "15px",
                                            fontSize: "12px",
                                            "& .MuiList-root": {
                                                paddingBottom: "0px !important",
                                            },
                                        }}
                                    >
                                        {level.display_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                    />
                    {errors.headline && (
                        <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                            {errors.headline.message}
                        </Typography>
                    )}
                </Box>

                {/* توضیحات */}
                <Box display="flex" flexDirection="column" gap={1} width={"100%"}>
                    <Typography
                        fontWeight={600}
                        fontSize={12}
                        color={theme.palette.grey[500]}
                    >
                        توضیحات *
                    </Typography>
                    <TextField
                        fullWidth
                        multiline
                        minRows={6}
                        placeholder="توضیحات سطح"
                        {...register("description", { required: "توضیحات الزامی است" })}
                        error={!!errors.description}

                        sx={{
                            borderRadius: "8px",
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "8px",
                                borderColor: theme.palette.grey[400],
                                "& fieldset": { borderColor: theme.palette.grey[400] },
                                "&:hover fieldset": { borderColor: theme.palette.grey[600] },
                                "&.Mui-focused fieldset": {
                                    borderColor: theme.palette.primary.main,
                                },
                            },
                            "& .MuiInputBase-input": { fontSize: "11px" },
                            "& .MuiInputBase-input::placeholder": { fontSize: "11px" },
                        }}
                    />
                </Box>

                {/* دکمه‌ها */}
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
                        onClick={() => setOpenSectionModal(false)}
                    >
                        انصراف
                    </CustomButton>
                    <CustomButton
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        loading={loading}
                    >
                        ثبت
                    </CustomButton>
                </Box>
            </Box>
        </form>
    );
};
