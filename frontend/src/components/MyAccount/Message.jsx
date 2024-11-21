import React from "react";
import MyAccount from "./MyAccount";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Page404 from "../Page404/Page404";

const drawerWidth = 240;

export default function Message() {
    return (
        <div>
            <Box sx={{ display: "flex" }}>
                <MyAccount />
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, marginTop: "30px" }}
                >
                    <Toolbar />
                    <Page404 />
                </Box>
            </Box>
        </div>
    )
}