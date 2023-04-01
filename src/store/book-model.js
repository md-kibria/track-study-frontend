import { createBook, deleteBook, getBookApi, getBooksApi, updateBook, updateChapter, updateMilestone } from "../apis/books";

import { persist, action, thunk } from "easy-peasy";

const bookModel = persist({
    data: [],
    book: {},
    error: {},
    message: {},
    isLoading: false,
    setData: action((state, payload) => {
        // console.log(payload)
        state.data = payload;
    }),
    setLoading: action((state, payload) => {
        state.isLoading = payload;
    }),
    setError: action((state, payload) => {
        state.error = payload;
    }),
    setMessage: action((state, payload) => {
        state.message = payload;
    }),
    setBook: action((state, payload) => {
        state.book = payload
    }),
    getBooks: thunk(async ({ setLoading,setData, setError }, payload) => {
        setLoading(true);
        setError({});
        try {
            const {data} = await getBooksApi();
            setData(data);
            setError({})
        } catch (error) {
            setError({msg: error?.message, status: 400});
        } finally {
            setLoading(false);
        }
    }),
    getBook: thunk(async ({setBook, setLoading, setError, setMessage}, payload) => {
        setLoading(true)
        setMessage({})
        try {
            const {data} = await getBookApi(payload)
            setBook(data)
            setError({})
        } catch (error) {
            let err = error?.response?.data;
            setError(err);
        } finally {
            setLoading(false)
        }
    }),
    addBook: thunk(async({data, setData, setLoading, setError}, payload) => {
        try {
            setLoading(true)
            setError({});
            const {data: rData} = await createBook(payload)
            setData([...data, rData])
            setError({})
        } catch (error) {
            setError({msg: error?.message, status: 400});
        } finally {
            setLoading(false)
        }
    }),
    updateBook: thunk(async({data, book, setData, setBook, setLoading, setError}, payload) => { 
        try {
            const {data: rData} = await updateBook(payload.bookId, payload.data)
            setData(data.map(d => {
                if(d._id === rData._id) return rData
            }))
            if(rData._id === book._id) {
                setBook(rData)
            }
            setError({})
        } catch (error) {
            setError(error?.response?.data)
        } finally {
            setLoading(false)
        }
    }),
    updateChapter: thunk(async({data, setData, setBook, setLoading, setError}, payload) => { 
        try {
            const {data: rData} = await updateChapter(payload.bookId, payload.chapterId, payload.data)
            setBook(rData)
            setData(data.map(d => {
                if(d._id === rData._id) return rData
            }))
            setError({})
        } catch (error) {
            setError(error?.response?.data)
        } finally {
            setLoading(false)
        }
    }),
    updateMilestone: thunk(async({data, setData, setBook, setLoading, setError, setMessage}, payload) => { 
        try {
            setLoading(true)
            const {data: rData} = await updateMilestone(payload.bookId, payload.chapterId, payload.milestoneId, payload.data)
            setBook(rData)
            if(payload.data.isDone) {
                setMessage({msg: "Milestone done", status: 240})
            }
            setData(data.map(d => {
                if(d._id === rData._id) return rData
            }))
            setError({})
        } catch (error) {
            setError(error?.response?.data)
        } finally {
            setLoading(false)
        }
    }),
    deleteBook: thunk(async ({data, book, setData, setBook, setLoading, setError}, payload) => {
        try {
            setLoading(true)
            const {rData} = await deleteBook(payload)

            setData(data.filter(d => d._id !== rData._id))
            if(rData._id === book._id) {
                setBook({})
            }
            setError({})
        } catch (error) {
            setError(error?.response?.data)
        } finally {
            setLoading(false)
        }
    })
});

export default bookModel;
