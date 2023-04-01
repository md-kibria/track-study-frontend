import PageHeader from "../../components/ui/PageHeader"
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Book from "../../components/book";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";

const Favourites = () => {
  const getFavourites = useStoreActions(state => state.favourites.getFavourites)
  const {data:books, isLoading} = useStoreState(state => state.favourites)

  useEffect(() => {
    getFavourites()
  }, [])
    return (
        <>
            <PageHeader title="Favourites" />
            {books.length === 0 
            ? (
              <Alert severity="info">No favourite book is available!</Alert>
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

export default Favourites