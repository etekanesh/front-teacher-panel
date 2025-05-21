import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Paper } from "@mui/material";

import theme from "theme";
import { HeaderLayout } from "layouts/header.layout";
import { BreadCrumbsModel } from "core/types";
import { AssignmentList } from "components";
import { useStudentsStore } from "store/useStudents.store";

const breadcrumbData: BreadCrumbsModel[] = [
    {
        title: "مدیریت دانشجویان",
        link: "/students",
        id: "0",
        color: theme.palette.grey[600],
        active: false,
    },
    {
        title: "لیست دانشجویان",
        link: "/students",
        id: "1",
        color: theme.palette.grey[600],
        active: true,
    },
];

export const AssignmentPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { fetchStudentLevelData, fetching } =
        useStudentsStore();

    useEffect(() => {
        fetchStudentLevelData(id);
    }, []);

    return (
        <>
            <HeaderLayout title="مدیریت دانشجویان" breadcrumb={breadcrumbData} />
            <Paper
                elevation={0}
                sx={{
                    width: "100%",
                    bgcolor: "white",
                    [theme.breakpoints.up("sm")]: {
                        borderRadius: "10px",
                    },
                    padding: "21px 28px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "13px"
                }}

            >

                {!fetching && <AssignmentList />}
            </Paper>
        </>
    );
};
