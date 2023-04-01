import {
    Avatar,
    Box,
    Card,
    CardContent,
    CardHeader,
    IconButton,
    TextField,
    Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { useStoreActions, useStoreState } from "easy-peasy";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import PageHeader from "../../components/ui/PageHeader";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Account = () => {
    const { user, error, isLoading, message } = useStoreState((state) => state.auth);
    const {editUser} = useStoreActions(state => state.auth)

    const [isNameForm, setIsNameForm] = useState(false);
    const [nameInput, setNameInput] = useState('')

    const [isEmailForm, setIsEmailForm] = useState(false);
    const [emailInput, setEmailInput] = useState('')

    const handleOpen = (form) => {
        if(form==='name') {
            setIsNameForm(true)
        } else if(form === 'email') {
            setIsEmailForm(true)
        }
    }
    
    const handleClose = (form) => {
        if(form==='name') {
            setIsNameForm(false)
        } else if(form === 'email') {
            setIsEmailForm(false)
        }
    }

    const handleSaveName = () => {
        editUser({id: user._id, data:{name: nameInput}})
    }
    
    const handleSaveEmail = () => {
        editUser({id: user._id, data:{email: emailInput}})
    }

    useEffect(() => {
        setNameInput(user.name)
        setEmailInput(user.email)
    }, [])

    useEffect(() => {
        if(message?.status === 205) {
            toast.success(message.msg, {
                position: "bottom-left",
                autoClose: 2000
            })
        }
    }, [message])

    return (
        <>
            <PageHeader title="Account" />
            <Box>
                <Card sx={{ maxWidth: 345 }}>
                    {/* <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }}>
                                {user.name[0]}
                            </Avatar>
                        }
                    /> */}
                    <CardContent>
                        {!isNameForm ? (
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography>Name: {user.name}</Typography>
                                <IconButton ml={2} onClick={() => handleOpen('name')}>
                                    <EditIcon sx={{ fontSize: 20 }} />
                                </IconButton>
                                {/* sx={{color: 'white', '&:hover': {color: '#555'}}} */}
                            </Box>
                        ) : (
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                Name: <TextField 
                                label="Your Name"
                                value={nameInput}
                                onChange={(e) => setNameInput(e.target.value)}
                                sx={{m:1}}
                                size="small"
                                />
                                <IconButton onClick={handleSaveName}>
                                    <DoneIcon fontSize="10" />
                                </IconButton>
                                <IconButton onClick={() => handleClose('name')}>
                                    <CloseIcon fontSize="10" />
                                </IconButton>
                            </Box>
                        )}
                        {!isEmailForm ? (
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography>Email: {user.email}</Typography>
                                <IconButton m={2} onClick={() => handleOpen('email')}>
                                    <EditIcon sx={{ fontSize: 20 }} />
                                </IconButton>
                            </Box>
                        ) : (
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                Email: <TextField 
                                label="Your Email"
                                value={emailInput}
                                onChange={(e) => setEmailInput(e.target.value)}
                                sx={{m:1}}
                                size="small"
                                error={error.type === 'email'}
                                helperText={error.type === 'email' ? error.message : ''}
                                />
                                <IconButton>
                                    <DoneIcon fontSize="10" onClick={handleSaveEmail}/>
                                </IconButton>
                                <IconButton onClick={() => handleClose('email')}>
                                    <CloseIcon fontSize="10" />
                                </IconButton>
                            </Box>
                        )}
                        <Typography sx={{my: 1}}>Status: {user.accountStatus}</Typography>
                        <Typography sx={{my: 1}}>Role: {user.roles}</Typography>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
};

export default Account;
