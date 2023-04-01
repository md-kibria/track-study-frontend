import { createStore } from "easy-peasy";
import AuthModel from "./auth-model";
import bookModel from "./book-model";
import bookmarkModel from "./bookmark-model";
import favouriteModel from "./favourite-model";

const store = createStore({
    books: bookModel,
    auth: AuthModel,
    favourites: favouriteModel,
    bookmarks: bookmarkModel,
})

export default store