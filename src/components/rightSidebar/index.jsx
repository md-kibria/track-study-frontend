import Clock from "../clock";
import Calender from "../calender";
import { Box, Button, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Close, EventNote } from "@mui/icons-material";

const RightSidebar = () => {
    const [isShow, setIsShow] = useState(false);
    const [isRes, setIsRes] = useState(false);

    const [isMob, setIsMob] = useState(false);

    useEffect(() => {
        window.addEventListener("resize", () => {
            if (window.innerWidth < 600) {
                setIsMob(true);
            } else if (window.innerWidth > 600) {
                setIsMob(false);
            }
        });

        if (window.innerWidth < 600) {
            setIsMob(true);
        } else if (window.innerWidth > 600) {
            setIsMob(false);
        }
    }, []);

    useEffect(() => {
        window.addEventListener("resize", () => {
            if (window.innerWidth < 1200) {
                setIsRes(true);
            } else if (window.innerWidth > 1200) {
                setIsRes(false);
            }
        });

        if (window.innerWidth < 1200) {
            setIsRes(true);
        } else if (window.innerWidth > 1200) {
            setIsRes(false);
        }
    }, []);

    const style = {
        position: "absolute",
        top: isMob ? 57 : 65,
        right: 0,
        background: "white",
        height: "100%",
        display: isShow ? "block" : "none",
    };

    return (
        <>
            <IconButton
                sx={{ position: "absolute", top: isMob ? 57 : 65, right: 0, m: '10px',display: isRes ? '' : 'none' }}
                onClick={() => setIsShow(!isShow)}
                color="primary"
            >
                <EventNote />
            </IconButton>
            <Box sx={isRes ? style : {}}>
                <IconButton
                    sx={{ position: "absolute", top: 0, right: 0, m: '10px',display: isRes ? '' : 'none' }}
                    onClick={() => setIsShow(!isShow)}
                    color="primary"
                >
                    <Close />
                </IconButton>
                <Clock />
                <Calender />
            </Box>
        </>
    );
};

export default RightSidebar;
