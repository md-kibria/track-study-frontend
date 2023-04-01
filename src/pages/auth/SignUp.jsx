import { Box, Typography, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";
import { toast } from "react-toastify";

const SignUp = () => {
    const navigate = useNavigate()

    const authSignUp = useStoreActions((state) => state.auth.authSignUp);
    const { isAuth, error, message } = useStoreState((state) => state.auth);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    });
    const [formError, setFormError] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    });


    const handleChange = (e) => {
        setFormData((state) => {
            return {
                ...state,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleSubmit = () => {
        authSignUp({ ...formData });
    };

    useEffect(() => {
        if(message?.status === 200) {
            toast.success("SignUp successfully", {
                position: "bottom-left",
                autoClose: 2000
            });
        }
    }, [message])

    useEffect(() => {
        setFormError((prev) => {
            return {
                ...prev,
                name: error?.name?.msg,
                email: error?.email?.msg,
                password: error?.password?.msg,
                passwordConfirmation: error?.passwordConfirmation?.msg,
            };
        });
    }, [error]);

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
                    SignUp
                </Typography>
                <TextField
                    label="Name"
                    fullWidth
                    placeholder="Your name"
                    variant="filled"
                    sx={{ my: 1 }}
                    value={formData.name}
                    name="name"
                    onChange={handleChange}
                    error={Boolean(formError.name)}
                    helperText={formError.name}
                />
                <TextField
                    label="Email"
                    fullWidth
                    placeholder="Your email"
                    variant="filled"
                    sx={{ my: 1 }}
                    value={formData.email}
                    name="email"
                    onChange={handleChange}
                    error={Boolean(formError.email)}
                    helperText={formError.email}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    placeholder="Your password"
                    variant="filled"
                    sx={{ my: 1 }}
                    value={formData.password}
                    name="password"
                    onChange={handleChange}
                    error={Boolean(formError.password)}
                    helperText={formError.password}
                />
                <TextField
                    label="Confirmation Password"
                    type="password"
                    fullWidth
                    placeholder="Your confirmation password"
                    variant="filled"
                    sx={{ my: 1 }}
                    value={formData.passwordConfirmation}
                    name="passwordConfirmation"
                    onChange={handleChange}
                    error={Boolean(formError.passwordConfirmation)}
                    helperText={formError.passwordConfirmation}
                />
                <Box sx={{ width: "100%", color: "#555" }}>
                    <Typography my={0.5}>
                        Already have an account? <Link to="/login">Login</Link>{" "}
                        here
                    </Typography>
                    <Button variant="contained" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default SignUp;
