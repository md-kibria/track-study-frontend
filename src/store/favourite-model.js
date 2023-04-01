import { action, persist, thunk } from "easy-peasy";
import { addToFavourites, getALlFavourites, removeFromFavourites } from "../apis/favourites";

const favouriteModel = persist({
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
    getFavourites: thunk(async({setData, setLoading, setError}) => {
        try {
            setLoading(true)
            const {data} = await getALlFavourites()
            
            setData(data.favourites)
            setError({})
        } catch (error) {
            setError(error?.response?.data)
        } finally {
            setLoading(false)
        }
    }),
    addFavourite: thunk(async({setData, getFavourites, setLoading, setError}, payload) => {
        try {
            setLoading(true)
            const {data} = await addToFavourites(payload)
            
            setData(data.favourites)
            getFavourites()
            setError({})
        } catch (error) {
            setError(error?.response?.data)
        } finally {
            setLoading(false)
        }
    }),
    removeFavourite: thunk(async({setData, setLoading, setError}, payload) => {
        try {
            setLoading(true)
            const {data} = await removeFromFavourites(payload)
            
            setData(data.favourites)
            setError({})
        } catch (error) {
            setError(error?.response?.data)
        } finally {
            setLoading(false)
        }
    }),
    
})

export default favouriteModel