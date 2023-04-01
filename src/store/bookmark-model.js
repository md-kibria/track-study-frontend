import { action, persist, thunk } from "easy-peasy";
import { addToFavourites, getALlFavourites, removeFromFavourites } from "../apis/favourites";
import { addToBookmarks, getALlBookmarks, removeFromBookmarks } from "../apis/bookmarks";

const bookmarkModel = persist({
    data: [],
    error: {},
    isLoading: false,
    setData: action((state, payload) => {
        state.data = payload
    }),
    setLoading: action((state, payload) => {
        state.isLoading = payload
    }),
    setError: action((state, payload) => {
        state.error = payload
    }),
    getBookmarks: thunk(async({setData, setLoading, setError}) => {
        try {
            setLoading(true)
            const {data} = await getALlBookmarks()
            
            setData(data.bookmarks)
            setError({})
        } catch (error) {
            setError(error?.response?.data)
        } finally {
            setLoading(false)
        }
    }),
    addBookmark: thunk(async({ setData, setLoading, setError}, payload) => {
        try {
            setLoading(true)
            const {data} = await addToBookmarks(payload)
            
            setData(data.bookmarks)
            setError({})
        } catch (error) {
            setError(error?.response?.data)
        } finally {
            setLoading(false)
        }
    }),
    removeBookmark: thunk(async({setData, setLoading, setError}, payload) => {
        try {
            setLoading(true)
            const {data} = await removeFromBookmarks(payload)
            
            setData(data.bookmarks)
            setError({})
        } catch (error) {
            setError(error?.response?.data)
        } finally {
            setLoading(false)
        }
    }),
    
})

export default bookmarkModel