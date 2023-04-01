import PageHeader from "../../components/ui/PageHeader";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Book from "../../components/book";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Books = () => {
    const getBooks = useStoreActions((state) => state.books.getBooks);
    const { data: books, isLoading, error } = useStoreState((state) => state.books);

    useEffect(() => {
        if(Object.keys(error).length !== 0) {
            toast.error(error.msg, {
                position: "bottom-left",
                autoClose: 2000
            })
        }
    }, [])

    useEffect(() => {
        getBooks();
    }, []);

    return (
        <>
            <PageHeader title="Books" />
            {books.length === 0 ? (
                <Alert severity="info">No book is available for now!</Alert>
            ) : (
                <Grid container spacing={2} sx={{display: 'flex'}}>
                    {books.map((book) => (
                        <Grid key={book._id} item lg={4} sx={{flex: "1 0 235px"}}>
                            <Book
                                book={book}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    );
};

export default Books;
