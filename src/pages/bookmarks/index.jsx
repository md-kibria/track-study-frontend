import PageHeader from "../../components/ui/PageHeader"
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Book from "../../components/book";
import { useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";

const Bookmarks = () => {

  const getBookmarks = useStoreActions(state => state.bookmarks.getBookmarks)
  const {data:books, isLoading} = useStoreState(state => state.bookmarks)

  // console.log(books);
  useEffect(() => {
    getBookmarks()
  }, [])
  
    return (
        <>
            <PageHeader title="Bookmarks" />
            {books.length === 0 
            ? (
              <Alert severity="info">No bookmark is available!</Alert>
            ) : (
              <Grid container spacing={2} sx={{display: 'flex'}}>
                {books.map(book => (
                  <Grid key={book._id} item lg={4} sx={{flex: "1 0 235px"}}>
                      <Book
                        book={book}
                      />
                  </Grid>
                ))}
              </Grid>
            )}
        </>
    )
}

export default Bookmarks