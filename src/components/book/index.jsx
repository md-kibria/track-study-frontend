import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { pink } from "@mui/material/colors";

import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Book = ({ book}) => {
    const [isFavourite, setIsFavourite] = useState(false);
    const [isBookmark, setIsBookmark] = useState(false);

    const {addFavourite, removeFavourite} = useStoreActions((state) => state.favourites);
    const {addBookmark, removeBookmark} = useStoreActions((state) => state.bookmarks);

    const { data: favourites, loading:favLoading } = useStoreState((state) => state.favourites);
    const { data: bookmarks, loading:bmkLoading } = useStoreState((state) => state.bookmarks);

    const { _id, name, description, completed, time, extra } = book;

    useEffect(() => {
        favourites.map((fav) => {
            if(fav._id === _id) {
                setIsFavourite(true)
            }
        });
    }, [favLoading]);
    
    useEffect(() => {
        bookmarks.map((bmk) => {
            if(bmk._id === _id) {
                setIsBookmark(true)
            }
        });
    }, [bmkLoading]);

    const handleFavourite = () => {
        setIsFavourite(!isFavourite)
        if(isFavourite) {
            removeFavourite(_id)
            toast.info("Removed from favourites", {
                position: "bottom-left",
                autoClose: 2000
            });
        } else {
            addFavourite(_id)
            toast.success("Added to favourites", {
                position: "bottom-left",
                autoClose: 2000
            });
        }
    }

    const handleBookmark = () => {
        setIsBookmark(!isBookmark)
        if(isBookmark) {
            removeBookmark(_id)
            toast.info("Removed from bookmarks", {
                position: "bottom-left",
                autoClose: 2000
            });
        } else {
            addBookmark(_id)
            toast.success("Added to bookmarks", {
                position: "bottom-left",
                autoClose: 2000
            });
        }
    }

    // maxWidth: 345
    return (
        <Card >
            <CardContent>
                <Link
                    to={`/book/${_id}`}
                    color="inherit"
                    sx={{ textDecoration: "none" }}
                    component={RouterLink}
                >
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description.substr(0, 126)}
                    </Typography>
                </Link>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box sx={{ width: "100%", mr: 1 }}>
                        <LinearProgress
                            variant="determinate"
                            value={completed}
                        />
                    </Box>
                    <Box sx={{ minWidth: 35 }}>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >{`${Math.round(completed)}%`}</Typography>
                    </Box>
                </Box>
            </CardContent>
            <CardActions>
                <Checkbox
                    size="small"
                    {...label}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    sx={{
                        color: pink[800],
                        "&.Mui-checked": {
                            color: pink[600],
                        },
                    }}
                    checked={isFavourite}
                    onChange={handleFavourite}
                />
                <Checkbox
                    size="small"
                    // color="secondary"
                    {...label}
                    icon={<BookmarkBorderIcon />}
                    checkedIcon={<BookmarkIcon />}
                    checked={isBookmark}
                    onChange={handleBookmark}
                />
                <Typography
                    style={{ textAlign: "right", paddingRight: 5, flexGrow: 1 }}
                >{`${time}${
                    extra !== 0 ? "(+" + extra + ")days" : "days"
                }`}</Typography>
            </CardActions>
        </Card>
    );
};

export default Book;
