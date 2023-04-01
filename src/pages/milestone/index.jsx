import * as React from 'react';
import PageHeader from "../../components/ui/PageHeader"
import Box from "@mui/material/Box"
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import Note from "../../components/note";
import {useParams} from 'react-router-dom'
import { ButtonGroup } from '@mui/material';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { isAfter, isEqual, differenceInDays, isToday } from 'date-fns';
import { toast } from 'react-toastify';

const Milestone = () => {
    const {getBook, updateMilestone} = useStoreActions(state => state.books)
    const {book, isLoading, error, message} = useStoreState(state => state.books)
    
    const [open, setOpen] = React.useState(false);
    const [milestone, setMilestone] = React.useState({
        endDate: "",
        extra: 0,
        id: "",
        isDone: null,
        name: "",
        note: "",
        pages: 0,
        startDate: "",
        time: 0,
    })
    const [extraTime, setExtraTime] = React.useState(milestone.extra);
    const {bookId, chapterId, milestoneId} = useParams()

    React.useState(() => {
        setMilestone(book.chapters.filter(chap => chap._id === chapterId)[0].milestones.filter(mile => mile._id === milestoneId)[0])
    }, [isLoading, book])

    React.useEffect(() => {
        getBook(bookId)
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDone = () => {
        updateMilestone({bookId, chapterId, milestoneId, data: {isDone: true}})
        setMilestone({...milestone, isDone: true})
    }

    React.useEffect(() => {
        if(message?.status === 240) {
            toast.success(message.msg, {
                position: "bottom-left",
                autoClose: 2000
            })
        } 
    }, [message])

    React.useEffect(() => {
        if(error && Object.keys(error).length !== 0) {
            setMilestone({...milestone, isDone: false})
            // alert(error.message)
            toast.error(error.message, {
                position: "bottom-left",
                autoClose: 2000
            })
        }
    }, [error])

    const handleExtraTime = (type) => {
        if(type === 'increase') {
            setExtraTime(extraTime+1);
            updateMilestone({bookId, chapterId, milestoneId, data: {add: true}})
            toast.info("Extra time increased", {
                position: "bottom-left",
                autoClose: 2000
            })
        } else {
            setExtraTime(extraTime-1);
            updateMilestone({bookId, chapterId, milestoneId, data: {add: false}})
            toast.info("Extra time decreased", {
                position: "bottom-left",
                autoClose: 2000
            })
        }
    }

    

    const {
        extra,
        _id,
        isDone,
        name,
        note,
        pages,
        sPage,
        ePage,
        date,
        time,
    } = milestone

    React.useEffect(() => {
        setExtraTime(extra)
    }, [extra])

    const status = () => {
        if(isDone) {
            return {
                msg: "Completed",
                color: 'green'
            }
        } else 
        if(isToday(new Date(date))) {
            return {
                msg: "Running",
                color: 'green'
            }
        } else if(isAfter(new Date(), new Date(date))) {
            return {
                msg: "Time out",
                color: 'red'
            }
        } else if(!isAfter(new Date(), new Date(date))) {
            return {
                msg: "Comming",
                color: 'blue'
            }
        } else {
            return {
                msg: "error",
                color: 'red'
            }

        }
        
    }

    return (
        <>
            <PageHeader title={name} />
            <Box>
                <Typography>
                    Pages: {pages}
                </Typography>
                <Typography>
                    Start Page: {sPage}
                </Typography>
                <Typography>
                    End Page: {ePage}
                </Typography>
                <Typography>
                    {/* Left: {`${left}${extra !== 0 ? '(+'+extra+')' : ''}days`} */}
                </Typography>
                <Typography>
                    Time: {`${time}${extraTime !== 0 ? '(+'+extraTime+')' : ''}days`}
                </Typography>
                <Typography>
                    Status: <Typography variant='p' sx={{color: status().color}}>{status().msg}</Typography>
                </Typography>
                
                <Typography>
                    Targeted Date: {new Date(date).toDateString()}
                </Typography>
                    
                {/* Buttons */}
                <Box sx={{my: 2}}>
                    <Button 
                        variant="contained" 
                        sx={{mr: 1}} 
                        color={isAfter(new Date(), new Date(date)) || isToday(new Date(date)) === 0 ? "success": "secondary"} 
                        size="small"
                        disabled={isDone}
                        onClick={handleDone}
                    >
                        Done
                    </Button>
                    <Button 
                        variant="contained" 
                        sx={{mr: 1}} 
                        color="success" 
                        size="small"
                        onClick={handleClickOpen}
                    >
                        Note
                    </Button>
                    <ButtonGroup size="small" sx={{mr: 1}} color="primary" aria-label="outlined primary button group">
                        <Button onClick={() => handleExtraTime('increase')}>Extra +</Button>
                        <Button onClick={() => handleExtraTime('decrease')} disabled={!Boolean(extraTime)}>Extra -</Button>
                    </ButtonGroup>
               
                    <Note 
                        open={open} 
                        handleClose={handleClose} 
                        note={note} 
                        bookId={bookId} 
                        chapterId={chapterId} 
                        milestoneId={milestoneId} 
                    />
                </Box>
            </Box>
        </>
    )
}

export default Milestone