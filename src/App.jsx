import CssBaseline from "@mui/material/CssBaseline"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {handleMilestoneComplete, increateTime} from './utils/milestone'

import OutletPage from "./components/outlet/page";
import Book from "./pages/book";
import Chapter from "./pages/chapter";
import Milestone from "./pages/milestone";
import AddBook from "./pages/add-book";
import Dashboard from "./pages/dashboard";
import Books from "./pages/books";
import Bookmarks from "./pages/bookmarks";
import Favourites from "./pages/favourites";
import SignUp from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import { useStoreActions } from "easy-peasy";
import { useEffect } from "react";
import Account from "./pages/account";
import Password from "./pages/password";
import Setting from "./pages/setting";
import { ToastContainer } from "react-toastify";


const App = () => {
  const setAuth = useStoreActions(state => state.auth.setAuth)

  useEffect(() => {
    setAuth()
  }, [])

  return (
    <BrowserRouter>
      <CssBaseline/>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/*" element={<OutletPage />}>
          <Route path="" element={<Dashboard />} />
          <Route path="books" element={<Books />} />
          <Route path="bookmarks" element={<Bookmarks />} />
          <Route path="favourites" element={<Favourites />} />
          <Route path="book/:id" element={<Book />} />
          <Route path="book/add" element={<AddBook />} />
          <Route path="book/:bookId/chapter/:chapterId" element={<Chapter />} />
          <Route path="book/:bookId/chapter/:chapterId/milestone/:milestoneId" element={<Milestone />} />
          <Route path="account" element={<Account />} />
          <Route path="password" element={<Password />} />
          <Route path="setting" element={<Setting />} />
          <Route path="*" element={<h1>404 - Not found!</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App



{/* <Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="/books" element={<Books books={data.books} handleFavourite={handleFavourite} handleBookmark={handleBookmark} />} />
  <Route path="/bookmarks" element={<Bookmarks books={data.books.filter(book => book.isBookmark)} handleFavourite={handleFavourite} handleBookmark={handleBookmark} />} />
  <Route path="/favourites" element={<Favourites books={data.books.filter(book => book.isFavourite)} handleFavourite={handleFavourite} handleBookmark={handleBookmark} />} />
  <Route path="/book/:id" element={<Book changeBookName={changeBookName} updateBookDesc={updateBookDesc} deleteBook={deleteBook} findById={findById} handleNote={handleNote} loading={loading} handleMilestoneDone={handleMilestoneDone} />} />
  <Route path="/book/add" element={<AddBook addBook={addBook}/>} />
  <Route path="/book/:bookId/chapter/:chapterId" element={<Chapter changeChapterName={changeChapterName} loading={loading} handleNote={handleNote} findChapterById={findChapterById} />} />
  <Route path="/book/:bookId/chapter/:chapterId/milestone/:milestoneId" element={<Milestone loading={loading} findMilestoneById={findMilestoneById} handleNote={handleNote} handleMilestoneDone={handleMilestoneDone} handleIncreateTime={handleIncreateTime} />} />
  <Route path="*" element={<h1>404 - Not found!</h1>} />
</Routes> */}