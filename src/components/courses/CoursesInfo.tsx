import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    Typography,
    IconButton,
} from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { MenuIcon, VideoIcon } from "uiKit";
import { grey } from "@mui/material/colors";
import theme from "theme";
import PersianTypography from "core/utils/PersianTypoGraphy.utils";

// Sample data
const accordionData = [
    {
        id: "1",
        title: "پروفایل من",
        level: "سطــح ۱",
        content: [
            "آموزش آپلود عکس و توضیحات تکمیلی",
            "چگونگی ساخت ویدئو و انتخاب نیچ",
        ],
    },
    {
        id: "2",
        title: "بررسی مدل‌های رقابتی و انتخاب نیچ",
        level: "سطــح ۲",
        content: ["درصد ", " پرپلی"],
    },
    { id: "3", title: "شروع تدریس", level: "سطــح ۳", content: ["اموزش", "تست"] },
];

export const CourseInfo = () => {
    const [expanded, setExpanded] = useState<string | false>(false); // Manage which accordion is expanded
    const [items, setItems] = useState(accordionData); // Accordion data state

    // Handle drag end event
    const handleDragEnd = (result: any) => {
        const { source, destination } = result;

        // If the item was dropped outside, return early
        if (!destination) return;

        // Reorder the content inside the accordion only
        const updatedItems = [...items];
        const [movedItem] = updatedItems[source.droppableId].content.splice(
            source.index,
            1
        );
        updatedItems[source.droppableId].content.splice(
            destination.index,
            0,
            movedItem
        );

        setItems(updatedItems); // Update state with the new order
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            {items.map((accordion, accordionIndex) => (
                <Accordion
                    key={accordion.id}
                    expanded={expanded === accordion.id} // Expand based on the ID
                    onChange={() =>
                        setExpanded(expanded === accordion.id ? false : accordion.id)
                    }
                    sx={{
                        "--Paper-shadow": "unset !important",
                        "&.Mui-expanded": {
                            margin: 0,
                            borderBottom: "unset !important",
                        },
                        "&::before": {
                            display: "none",
                        },
                        boxShadow: "none !important",
                        border: "none !important",
                        borderBottom: "none",
                        borderTop: "none",
                    }}
                >
                    <AccordionSummary
                        sx={{
                            minHeight: "24px",
                            margin: 0,
                            padding: 0,
                            "&.Mui-expanded": {
                                minHeight: "24px",
                            },

                            "& .MuiAccordionSummary-content": {
                                minHeight: "24px",
                                alignItems: "center",
                                margin: "0 !important",
                                padding: 0,
                            },
                        }}
                    >
                        <Box
                            display="flex"
                            alignItems="center"
                            width="100%"
                            justifyContent="space-between"
                        >
                            <Box display="flex" alignItems="center" gap={"16px"}>
                                <Box display="flex" alignItems="center" gap={"8px"}>
                                    <MenuIcon />
                                    <Typography
                                        fontWeight="500"
                                        fontSize={12}
                                        color={theme.palette.grey[600]}
                                    >
                                        {accordion.level}
                                    </Typography>
                                </Box>
                                <Typography
                                    fontWeight="700"
                                    fontSize={14}
                                    color={theme.palette.grey[500]}
                                >
                                    {accordion.title}
                                </Typography>
                            </Box>
                            <Box display={"flex"} gap={"16px"} alignItems={"center"}>
                                <Box display={"flex"} gap={"8px"} alignItems={"center"}>
                                    <PersianTypography
                                        color={theme.palette.grey[600]}
                                        fontSize={12}
                                        fontWeight={700}
                                    >
                                        10
                                    </PersianTypography>
                                    <Typography color={theme.palette.grey[600]} fontSize={12}>
                                        ویــــدیـــــو
                                    </Typography>
                                </Box>

                                <IconButton>
                                    {expanded === accordion.id ? <RemoveIcon /> : <AddIcon />}
                                </IconButton>
                            </Box>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Droppable
                            droppableId={accordionIndex.toString()}
                            direction="vertical"
                        >
                            {(provided) => (
                                <Box
                                    ref={provided.innerRef}
                                    {...provided.droppableProps} // Necessary props for the droppable area
                                >
                                    {accordion.content.map((item, idx) => (
                                        <Draggable key={item} draggableId={item} index={idx}>
                                            {(provided) => (
                                                <Box
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps} // Allow dragging by grabbing handle
                                                    display="flex"
                                                    gap="4px"
                                                    alignItems="center"
                                                    mb={1} // Add margin between items
                                                >
                                                    <MenuIcon />
                                                    <Box
                                                        width={22}
                                                        height={22}
                                                        bgcolor={grey[300]}
                                                        borderRadius={"50%"}
                                                        justifyContent={"center"}
                                                        alignItems={"center"}
                                                        display={"flex"}
                                                    >
                                                        <VideoIcon />
                                                    </Box>
                                                    <Typography
                                                        fontSize={12}
                                                        color={theme.palette.grey[500]}
                                                        fontWeight={500}
                                                    >
                                                        {item}
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}{" "}
                                    {/* This is required for correct spacing */}
                                </Box>
                            )}
                        </Droppable>
                    </AccordionDetails>
                </Accordion>
            ))}
        </DragDropContext>
    );
};
