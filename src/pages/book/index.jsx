import {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import {differenceInDays, formatDistance, isAfter, toDate} from 'date-fns'
import * as React from 'react'

import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

import Box from "@mui/material/Box"
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Grid from "@mui/material/Grid";

import PageHeader from "../../components/ui/PageHeader"
import Note from "../../components/note";
import ChapterItem from "../../components/chapter-item";
import { Link, TextField } from '@mui/material';
import {Link as RouterLink} from 'react-router-dom'
import Backdrop from '../../components/backdrop';
import { lineHeight } from '@mui/system';
import { useStoreActions, useStoreState } from 'easy-peasy';
import setStatus from '../../utils/setStatus';
import dateDiff from '../../utils/dateDistance'
import { toast } from 'react-toastify';

const ExpandMore = styled(({ expand, ...other }) => {
    return <IconButton sx={{position: 'absolute', bottom: -12, right: 0}} {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));



const Book = () => {
    const {getBook, deleteBook} = useStoreActions(state => state.books)
    const updateBook = useStoreActions(state => state.books.updateBook)
    const {book: rawBook, isLoading} = useStoreState(state => state.books)
    const [book, setBook] = useState({
        name: 'Loading...',
        chapters: [],
        left: 0,
        extra: 0,
        completed: 0,
        endDate: null,
        startDate: null,
        description: '',
        isBookmark: '',
        isFavourite: '',
        note: '',
        time: 0
    })

    const navigate = useNavigate()

    const [expanded, setExpanded] = useState(false);
    const [open, setOpen] = useState(false);
    const [isForm, setIsForm] = useState(false);
    const [desc, setDesc] = useState('book.description')
    const {id} = useParams()

    const [openDD, setOpenDD] = React.useState(false);
    const anchorRef = React.useRef(null);

    useEffect(() => {
        getBook(id)
    }, [])

    useEffect(() => {
        if(Object.keys(rawBook).length !== 0) {
            setBook(rawBook)
        }
    }, [isLoading])
    
    const handleToggle = () => {
      setOpenDD((prevOpen) => !prevOpen);
    };
  
    const handleCloseDD = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
  
      setOpenDD(false);
    };

    useEffect(() => {
        setDesc(book.description);
    }, [book])

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    
    const {name, chapters, time, description, completed, extra, end, start, note} = book

    const handleToggleForm = () => {
        setIsForm(!isForm);
    }

    const handleSaveDSC = () => {
        updateBook({bookId: id, data: {description: desc}})
        // updateBookDesc(id, desc)
        handleToggleForm()
        toast.success("Description updated successfully", {
            position: "bottom-left",
            autoClose: 2000
        })
    }

    const handleDelete = () => {
        if(confirm('Are you sure?')) {
            deleteBook(id)
            navigate('/books')
            toast.success("Book deleted successfully", {
                position: "bottom-left",
                autoClose: 2000
            })
        }
    }

    return (
        <>
            <PageHeader title={name} isTitle={true} />
            <Box>
                <Typography>
                    Chapters: {chapters.length}
                </Typography>
                <Typography>
                    Left: {`${dateDiff(end)}${extra !== 0 ? '(+'+extra+')' : ''}days`}
                </Typography>
                <Typography>
                    Target: {`${time}${extra !== 0 ? '(+'+extra+')' : ''}days`}
                </Typography>
                <Typography>
                    Status: <Typography variant='p' sx={{color: setStatus(completed, start, end).color}}>{setStatus(completed, start, end).msg}</Typography>

                    {/* comming, running, completed(on percent), Time Out */}
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


                {isForm 
                ? (
                    <Box>
                        <textarea
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            style={{
                                width: '100%',
                                minHeight: '200px',
                                padding: 10,
                                fontFamily: 'Roboto, sans-serif',
                                resize: 'vertical',
                                fontSize: 16,
                                color: 'rgba(0, 0, 0, 0.87)',
                                lineHeight: '22px'
                            }}
                        />
                        <Button variant='contained' onClick={handleSaveDSC}>Save</Button>
                    </Box>
                    ) 
                : (
                    <Typography onDoubleClick={handleToggleForm} sx={{my: 1, position: 'relative'}} variant="body1" color={''}>
                        {desc.substring(0, 252)}
                        
                        {desc.length > 252 && (
                            <>
                                <ExpandMore
                                    expand={expanded}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                <ExpandMoreIcon />
                                </ExpandMore>
                                <Collapse in={expanded} timeout="auto" unmountOnExit>
                                    {desc.substring(252)}
                                </Collapse>
                            </>
                        )}
                    </Typography>
                )}


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
                                        <Button variant="text" size="small" onClick={() => alert("Please double click on book name")}>
                                            Edit Book Name
                                        </Button>
                                    </MenuItem>
                                    <MenuItem>
                                        <Button variant="text" size="small" onClick={() => alert("Please double click on description")}>
                                            Edit Description
                                        </Button>
                                    </MenuItem>
                                    <MenuItem>
                                        <Button onClick={handleDelete} variant="text" color="error" size="small">
                                            Delete
                                        </Button>
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                            </Paper>
                        </Grow>
                        )}
                    </Popper>

                    <Note open={open} handleClose={handleClose} bookId={id} note={note} />
                </Box>
            </Box>
                
            <Box sx={{my: 5}}>
                <Typography variant="h5" sx={{my: 2}}>
                    Chapters
                </Typography>
                <Grid container spacing={2}>
                    {book.chapters.map(chapter => (
                        <Grid item lg={4} key={chapter._id}>
                            <Link  to={`/book/${id}/chapter/${chapter._id}`} component={RouterLink} color="inherit" sx={{textDecoration: 'none'}}>
                                <ChapterItem chapter={chapter} />
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    )
}

export default Book