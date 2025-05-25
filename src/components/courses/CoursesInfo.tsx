import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    Typography,
    IconButton,
    useMediaQuery,
} from "@mui/material";
import { grey } from "@mui/material/colors";

import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { MenuIcon, VideoIcon } from "uiKit";
import theme from "theme";
import PersianTypography from "core/utils/PersianTypoGraphy.utils";
import { useCoursesStore } from "store/useCourses.store";
import { postEditEpisodeCourse } from "core/services";

type Props = {
    courseId: string;
};

export const CourseInfo: React.FC<Props> = ({ courseId }) => {
    const isMobile = useMediaQuery("(max-width:768px)");
    const { fetchCourseByIdData, courseByIdtData } = useCoursesStore();

    const [expanded, setExpanded] = useState<string | false>(false);
    const [items, setItems] = useState(courseByIdtData.headlines || []);

    useEffect(() => {
        fetchCourseByIdData(courseId);
    }, [courseId]);

    useEffect(() => {
        if (courseByIdtData?.headlines) {
            setItems(courseByIdtData.headlines);
        }
    }, [courseByIdtData]);

    const handleDragEnd = async (result: DropResult) => {
        const { source, destination } = result;

        if (!destination) return;

        const sourceIndex = parseInt(source.droppableId);
        const destIndex = parseInt(destination.droppableId);

        if (sourceIndex !== destIndex) return; // Only allow dragging within the same accordion

        const updatedItems = [...items];
        const episodes = [...updatedItems[sourceIndex].episodes];

        const [moved] = episodes.splice(source.index, 1);
        episodes.splice(destination.index, 0, moved);

        updatedItems[sourceIndex].episodes = episodes;
        setItems(updatedItems);
        try {
            await postEditEpisodeCourse(courseId, {
                priority: (destination.index + 1).toString(),
                episode: moved.uuid,
            }).then(() => {
                fetchCourseByIdData(courseId);
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            {items.map((accordion, accordionIndex) => (
                <Accordion
                    key={accordion.uuid}
                    expanded={expanded === accordion.uuid}
                    onChange={() =>
                        setExpanded(expanded === accordion.uuid ? false : accordion.uuid)
                    }
                    sx={{
                        "--Paper-shadow": "unset !important",
                        "&.Mui-expanded": { margin: 0, borderBottom: "unset !important" },
                        "&::before": { display: "none" },
                        boxShadow: "none !important",
                        border: "none !important",
                    }}
                >
                    <AccordionSummary
                        sx={{
                            minHeight: "24px",
                            margin: 0,
                            padding: 0,
                            "&.Mui-expanded": { minHeight: "24px" },
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
                            <Box display="flex" alignItems="center" gap="16px" flex={4}>
                                <Box display="flex" alignItems="center" gap="8px">
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
                                    fontSize={isMobile ? 12 : 14}
                                    color={theme.palette.grey[500]}
                                >
                                    {accordion.display_name}
                                </Typography>
                            </Box>
                            <Box
                                display="flex"
                                gap={isMobile ? "4px" : "16px"}
                                alignItems="center"
                                flex={1}
                                justifyContent="flex-end"
                            >
                                <Box
                                    display="flex"
                                    gap={isMobile ? "2px" : "8px"}
                                    alignItems="center"
                                >
                                    <PersianTypography
                                        color={theme.palette.grey[600]}
                                        fontSize={12}
                                        fontWeight={700}
                                    >
                                        {accordion.episodes?.length || 0}
                                    </PersianTypography>
                                    <Typography color={theme.palette.grey[600]} fontSize={12}>
                                        ویدیو
                                    </Typography>
                                </Box>
                                <IconButton>
                                    {expanded === accordion.uuid ? (
                                        <RemoveIcon sx={{ width: isMobile ? 14 : 18 }} />
                                    ) : (
                                        <AddIcon sx={{ width: isMobile ? 14 : 18 }} />
                                    )}
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
                                    {...provided.droppableProps}
                                >
                                    {(accordion.episodes || []).map((ep, idx) => (
                                        <Draggable key={ep.uuid} draggableId={ep.uuid} index={idx}>
                                            {(provided) => (
                                                <Box
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    display="flex"
                                                    gap="4px"
                                                    alignItems="center"
                                                    mb={1}
                                                >
                                                    <MenuIcon />
                                                    <Box
                                                        width={22}
                                                        height={22}
                                                        bgcolor={grey[300]}
                                                        borderRadius="50%"
                                                        justifyContent="center"
                                                        alignItems="center"
                                                        display="flex"
                                                    >
                                                        <VideoIcon />
                                                    </Box>
                                                    <Typography
                                                        fontSize={12}
                                                        color={theme.palette.grey[500]}
                                                        fontWeight={500}
                                                    >
                                                        {ep.title}
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </Box>
                            )}
                        </Droppable>
                    </AccordionDetails>
                </Accordion>
            ))}
        </DragDropContext>
    );
};
