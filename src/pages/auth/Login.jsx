import { Box, Typography, TextField, Button } from "@mui/material";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Login = () => {

    const [formData, setFormData] = useState({email: '', password: ''})
    const [formError, setFormError] = useState({email: '', password: ''})

    const authLogin = useStoreActions(state => state.auth.authLogin)
    const {isAuth, error, message} = useStoreState(state => state.auth)

    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData(state => {
            return {
                ...state,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = () => {
        authLogin({...formData})
    }

    useEffect(() => {
        if(message?.status === 200) {
            toast.success("LoggedIn successfully", {
                position: "bottom-left",
                autoClose: 2000
            });
        }
    }, [message])

    useEffect(() => {
        setFormError((prev) => {
            return {
                ...prev,
                email: error?.email?.msg,
                password: error?.password?.msg,
            }
        })
    }, [error])

    useEffect(() => {
        if(isAuth) {
            navigate('/')
        }
    }, [isAuth])

    if(isAuth) {
        return navigate('/')
    }

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{
                    width: 375,
                    background: "#eee",
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 2,
                    my: 1,
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        borderBottom: "2px solid #555",
                        width: 200,
                        textAlign: "center",
                        color: "#444",
                        my: 1,
                        pb: 1,
                    }}
                >
                    Login
                </Typography>
                <TextField
                    label="Email"
                    fullWidth
                    placeholder="Your email"
                    variant="filled"
                    value={formData.email}
                    name="email"
                    onChange={handleChange}
                    sx={{ my: 1 }}
                    error={Boolean(formError.email)}
                    helperText={formError.email}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    placeholder="Your password"
                    variant="filled"
                    value={formData.password}
                    name="password"
                    onChange={handleChange}
                    sx={{ my: 1 }}
                    error={Boolean(formError.password)}
                    helperText={formError.password}
                />
                <Box sx={{ width: "100%", color: "#555" }}>
                    <Typography my={0.5}>
                        Don't have an account? <Link to="/signup">SignUp</Link>{" "}
                        here
                    </Typography>
                    <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Login;
