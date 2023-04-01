import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import SettingsIcon from "@mui/icons-material/Settings";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ReportIcon from "@mui/icons-material/Report";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import LockIcon from "@mui/icons-material/Lock";
import Lock from "@mui/icons-material/Lock";

import Link from "@mui/material/Link";
import { NavLink } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { Close, Menu } from "@mui/icons-material";

const Sidebar = () => {
    const authSignOut = useStoreActions((state) => state.auth.authSignOut);
    const {message} = useStoreState((state) => state.auth);
    const [open, setOpen] = React.useState(false);
    const [isRes, setIsRes] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener("resize", () => {
            if (window.innerWidth < 600) {
                setIsRes(true);
            } else if (window.innerWidth > 600) {
                setIsRes(false);
            }
        });

        if (window.innerWidth < 600) {
            setIsRes(true);
        } else if (window.innerWidth > 600) {
            setIsRes(false);
        }
    }, []);

    const handleSignOut = () => {
        authSignOut();
    };

    const handleClick = () => {
        setOpen(!open);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        if(message?.status === 203) {
            toast.info(message.msg, {
                position: "bottom-left",
                autoClose: 2000,
            });
        }
    }, [message])

    const style = {
        // width: "100%",
        height: "100%",
        // marginTop: 1,
        display: open ? "block" : "none",
        position: "absolute",
        top: 65,
        left: 0,
        background: "white",
        width: 200,
        zIndex: 999,
    };

    return (
        <>
            <IconButton
                onClick={handleClick}
                sx={{ display: isRes ? "" : "none", m: "10px 0 10px -7px" }}
                color="primary"
            >
                <Menu />
            </IconButton>
            <List
                sx={isRes ? style : { width: "100%", marginTop: 1 }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <>
                        <IconButton
                            onClick={handleClick}
                            sx={{ display: isRes ? "" : "none", m: "0 15px 0 7px" }}
                            color="primary"
                        >
                            <Close />
                        </IconButton>
                        <ListSubheader
                            component="div"
                            id="nested-list-subheader"
                        >
                            Sidebar Navigation
                        </ListSubheader>
                    </>
                }
            >
                <Link
                    to="/"
                    component={NavLink}
                    color="inherit"
                    sx={{ textDecoration: "none" }}
                    onClick={handleClose}
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </Link>

                <Link
                    to="/books"
                    component={NavLink}
                    color="inherit"
                    sx={{ textDecoration: "none" }}
                    onClick={handleClose}
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <ImportContactsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Books" />
                    </ListItemButton>
                </Link>

                <Link
                    to="/book/add"
                    component={NavLink}
                    color="inherit"
                    sx={{ textDecoration: "none" }}
                    onClick={handleClose}
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <NoteAddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Add Book" />
                    </ListItemButton>
                </Link>

                <Link
                    to="/favourites"
                    component={NavLink}
                    color="inherit"
                    sx={{ textDecoration: "none" }}
                    onClick={handleClose}
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <FavoriteIcon />
                        </ListItemIcon>
                        <ListItemText primary="Favourites" />
                    </ListItemButton>
                </Link>

                <Link
                    to="/bookmarks"
                    component={NavLink}
                    color="inherit"
                    sx={{ textDecoration: "none" }}
                    onClick={handleClose}
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <BookmarkAddedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Bookmarks" />
                    </ListItemButton>
                </Link>

                <Link
                    to="/setting"
                    component={NavLink}
                    color="inherit"
                    sx={{ textDecoration: "none" }}
                    onClick={handleClose}
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Setting" />
                    </ListItemButton>
                </Link>

                <Link
                    to="/account"
                    component={NavLink}
                    color="inherit"
                    sx={{ textDecoration: "none" }}
                    onClick={handleClose}
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <ManageAccountsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Account" />
                    </ListItemButton>
                </Link>

                <Link
                    to="/password"
                    component={NavLink}
                    color="inherit"
                    sx={{ textDecoration: "none" }}
                    onClick={handleClose}
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <Lock />
                        </ListItemIcon>
                        <ListItemText primary="Password" />
                    </ListItemButton>
                </Link>

                <ListItemButton onClick={handleSignOut}>
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>

                <Link
                    href="mailto:kibriadhaka18@gmail.com"
                    color="inherit"
                    sx={{ textDecoration: "none" }}
                    onClick={handleClose}
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <ReportIcon />
                        </ListItemIcon>
                        <ListItemText primary="Report" />
                    </ListItemButton>
                </Link>
            </List>
        </>
    );
};

export default Sidebar;
