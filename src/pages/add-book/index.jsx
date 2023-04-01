import * as React from "react";
import { IconButton, TextField } from "@mui/material";
import PageHeader from "../../components/ui/PageHeader";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useStoreActions } from "easy-peasy";
import { toast } from "react-toastify";

const steps = ["Basic Info", "Chapters", "Finish"];

const AddBook = () => {
    const addBook = useStoreActions((state) => state.books.addBook);

    const navigate = useNavigate();

    const [activeStep, setActiveStep] = React.useState(0);
    const [bookInfo, setBookInfo] = React.useState({
        name: "",
        description: "",
        time: "",
    });
    const [chapters, setChapters] = React.useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm();

    const addNewChapter = () => {
        const id = chapters.length;
        if (id == 0) {
            setChapters([...chapters, { id, name: `Chapter ${id+1}`, pages: "" }]);
        } else {
            if (chapters[id - 1].name && chapters[id - 1].pages) {
                setChapters([...chapters, { id, name: `Chapter ${id+1}`, pages: "" }]);
            }
        }
    };

    const deleteChapter = (id) => {
        setChapters(chapters.filter((chapter) => chapter.id !== id && chapter));
    };

    const handleChapter = (id, e) => {
        setChapters(
            chapters.map((chp) => {
                if (chp.id === id) {
                    return {
                        ...chp,
                        [e.target.name]: e.target.value,
                    };
                }
                return chp;
            })
        );
    };

    const handleNext = () => {
        handleSubmit((data) => {
            setBookInfo({ ...data });
        })();

        if(chapters.length === 0) {
            if (isValid) setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
            if (chapters[chapters.length - 1].name && chapters[chapters.length - 1].pages) {
                setActiveStep((prevActiveStep) => prevActiveStep + 1)
            }  else {
                return alert("Please fill all from correctly")
            }
        }


        // validate last chapter item (remove last incomplete chapter)
        if (chapters.length !== 0) {
            if (
                !chapters[chapters.length - 1].name ||
                !chapters[chapters.length - 1].pages
            ) {
                setChapters(
                    chapters.filter((chptr) => {
                        return chptr.id !== chapters[chapters.length - 1].id;
                    })
                );
            }
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    /**
     * My main function
     */
    const result = () => {
        const bookInput = {
            ...bookInfo,
            time: Number(bookInfo.time),
            chapters,
        };
        addBook(bookInput);
        toast.success("Book added successfully", {
            position: "bottom-left",
            autoClose: 2000
        });
        navigate("/books");
    };

    const pages = [
        <Box>
            <Typography sx={{ mt: 2, mb: 1 }}>Basic Info About Book</Typography>
            <TextField
                label="Book Name"
                fullWidth
                sx={{ my: 1 }}
                placeholder="The history of Bangladesh"
                {...register("name", { required: true })}
                error={errors.name && errors.name.type === "required"}
                helperText={errors.name && "Name is required"}
            />
            <TextField
                label="Description"
                fullWidth
                sx={{ my: 1 }}
                placeholder="This book about..."
                {...register("description", { required: true })}
                error={
                    errors.description && errors.description.type === "required"
                }
                helperText={errors.description && "Description is required"}
            />
            <TextField
                label="Targeted Days"
                fullWidth
                sx={{ my: 1 }}
                placeholder="Ex: 60"
                type="number"
                {...register("time", { required: true })}
                error={errors.time && errors.time.type === "required"}
                helperText={errors.time && "Targeted days is required"}
            />
        </Box>,
        <Box>
            <Typography sx={{ mt: 2, mb: 1 }}>Add Chapters</Typography>
            {chapters.map((chapter) => (
                <Box
                    sx={{ display: "flex", alignItems: "center" }}
                    key={chapter.id}
                >
                    <IconButton
                        sx={{ width: 50, height: 50 }}
                        color="warning"
                        onClick={() => deleteChapter(chapter.id)}
                    >
                        <ClearIcon />
                    </IconButton>
                    <TextField
                        label="Chapter name"
                        fullWidth
                        sx={{ my: 1, mr: 1 }}
                        placeholder="Chapter name"
                        value={chapter.name}
                        name="name"
                        onChange={(e) => handleChapter(chapter.id, e)}
                    />
                    <TextField
                        label="Chapter pages"
                        fullWidth
                        sx={{ my: 1 }}
                        placeholder="Chapter pages"
                        value={chapter.pages}
                        name="pages"
                        onChange={(e) => handleChapter(chapter.id, e)}
                        type="number"
                    />
                </Box>
            ))}
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    my: 2,
                }}
            >
                <IconButton
                    sx={{
                        width: 60,
                        height: 60,
                        background: "#ede7f6",
                        margin: "auto",
                    }}
                    variant="outlined"
                    color="secondary"
                    onClick={addNewChapter}
                >
                    <AddIcon />
                </IconButton>
            </Box>
        </Box>,
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Button sx={{ p: 5, my: 7 }} color="inherit" onClick={result}>
                <Typography variant="h2">Now Finish!</Typography>
            </Button>
        </Box>,
    ];

    return (
        <>
            <PageHeader title="Add A New Book" />

            <Box sx={{ width: "100%" }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label) => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>

                {/* Pages */}
                {pages[activeStep]}

                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                    >
                        {" "}
                        Back{" "}
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />

                    {activeStep === steps.length - 1 ? (
                        <Button onClick={result}>Finish</Button>
                    ) : (
                        <Button
                            onClick={handleNext}
                            disabled={activeStep === 1 && chapters.length === 0}
                        >
                            Next
                        </Button>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default AddBook;
