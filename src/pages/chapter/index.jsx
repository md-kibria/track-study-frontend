import * as React from 'react'

import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Box from "@mui/material/Box"
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import PageHeader from "../../components/ui/PageHeader"
import Note from "../../components/note";
import ChapterItem from "../../components/chapter-item";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from '@mui/material';
import {Link as RouterLink} from 'react-router-dom'
import MilestoneItem from "../../components/milestone-item";
import { useStoreActions, useStoreState } from 'easy-peasy';
import setStatus from '../../utils/setStatus';

const Chapter = () => {
    const {getBook} = useStoreActions(state => state.books)
    const {book, isLoading} = useStoreState(state => state.books)

    const [open, setOpen] = useState(false);
    const [chapter, setChapter] = useState({
        name: '',
        pages: 0,
        left: 0,
        extra: 0,
        completed: 0,
        startDate: '',
        endDate: '',
        time: '',
        milestones: []
    })
    const {bookId, chapterId} = useParams()

    const [openDD, setOpenDD] = React.useState(false);
    const anchorRef = React.useRef(null);

    useState(() => {
        setChapter(book.chapters.filter(chap => chap._id === chapterId)[0])
    }, [isLoading, book])

    useEffect(() => {
        getBook(bookId)
    }, [])
  
    const handleToggle = () => {
      setOpenDD((prevOpen) => !prevOpen);
    };
  
    const handleCloseDD = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
  
      setOpenDD(false);
    };

    // useEffect(() => {
    //     const chapterById = findChapterById(bookId, chapterId);
    //     if(chapterById) {
    //         setChapter(chapterById)
    //     }

    // }, [loading])
    
    // console.log(chapter);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // console.log(chapter.completed)

    if(isLoading) {
        return 'Loading...'
    }

    const {
        name,
        pages,
        left,
        extra,
        completed,
        start,
        end,
        time,
        milestones,
        note
    } = chapter

    return (
        <>
            <PageHeader title={name} isTitle={true} />
            <Box>
                <Typography>
                    Pages: {pages}
                </Typography>
                <Typography>
                    Milestones: {milestones.length}
                </Typography>
                <Typography>
                    Left: {`${Math.floor(left)}${extra !== 0 ? '(+'+extra+')' : ''}days`}
                </Typography>
                <Typography>
                    Target: {`${Math.floor(time)}${extra !== 0 ? '(+'+extra+')' : ''}days`}
                </Typography>
                <Typography>
                    Status: <Typography variant='p' sx={{color: setStatus(completed, start, end).color}}>{setStatus(completed, start, end).msg}</Typography>
                </Typography>
                <Typography>
                    Start Date: {new Date(start).toDateString()}
                </Typography>
                <Typography>
                    End Date: {new Date(end).toDateString()}
                </Typography>   
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ mr: 1 }}>
                        <Typography variant="body2" color="text.secondary">Completed:</Typography>
                    </Box>
                    <Box sx={{ width: '200px', mr: 1 }}>
                        <LinearProgress variant="determinate" value={completed} />
                    </Box>
                    <Box sx={{ minWidth: 35 }}>
                        <Typography variant="body2" color="text.secondary">{`${Math.round(completed)}%`}</Typography>
                    </Box>
                </Box>

                {/* Buttons */}
                <Box sx={{my: 2}}>
                    <Button 
                        variant="contained" 
                        sx={{mr: 1}} 
                        color="success" 
                        size="small"
                        onClick={handleClickOpen}
                    >
                        Note
                    </Button>
                    <Button
                        size="small"
                        aria-controls={openDD ? 'split-button-menu' : undefined}
                        aria-expanded={openDD ? 'true' : undefined}
                        aria-label="select merge strategy"
                        aria-haspopup="menu"
                        onClick={handleToggle}
                        ref={anchorRef}
                        variant="outlined" 
                        sx={{mr: 1}} 
                        > More
                        <ArrowDropDownIcon />
                    </Button>

                    <Popper
                        sx={{
                        zIndex: 1,
                        }}
                        open={openDD}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        transition
                        disablePortal
                    >
                        {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                            transformOrigin:
                                placement === 'bottom' ? 'center top' : 'center bottom',
                            }}
                        >
                            <Paper>
                            <ClickAwayListener onClickAway={handleCloseDD}>
                                <MenuList id="split-button-menu" autoFocusItem>
                                    <MenuItem>
                                        <Button variant="text" size="small" onClick={() => alert("Please, double click on chapter name")}>
                                            Edit Chapter Name
                                        </Button>
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                            </Paper>
                        </Grow>
                        )}
                    </Popper>

                    <Note open={open} bookId={bookId} chapterId={chapterId} note={note} handleClose={handleClose} />
                </Box>
            </Box>
                
            <Box sx={{my: 5}}>
                <Typography variant="h5" sx={{my: 2}}>
                    Milestones
                </Typography>
                <Grid container spacing={2}>
                    {
                        milestones.map(milestone => (
                            <Grid item lg={4} key={milestone._id}>
                                <Link  to={`/book/${bookId}/chapter/${chapterId}/milestone/${milestone._id}`} component={RouterLink} color="inherit" sx={{textDecoration: 'none'}}>
                                    <MilestoneItem milestone={milestone} />
                                    {/* 
                                        I need to create a deferent 
                                        milestoneItem component
                                        1. There no persentage of completaitn
                                          just show done icon
                                        2. targeted time and pages(instead of left days) 

                                    */}
                                </Link>
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </>
    )
}

export default Chapter