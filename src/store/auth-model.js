import { action, persist, thunk } from "easy-peasy";
import { editPass, getUser, login, registation, updateUser } from "../apis/auth";
import {setItem, getItem, removeItem} from "../utils/storage";
import decode from "jwt-decode";

const AuthModel = persist({
    isAuth: false,
    message: {},
    user: {},
    token: null,
    error: {},
    isLoading: false,
    setLoading: action((state, payload) => {
        state.isLoading = payload
    }),
    setMessage: action((state, payload) => {
        state.message = payload
    }),
    setUser: action((state, payload) => {
        state.user = payload;
    }),
    setData: action((state, payload) => {
        state.isAuth = payload.auth;
        state.user = payload.user;
        state.token = payload.token;
    }),
    setError: action((state, payload) => {
        state.error = payload;
    }),
    // fetchUser: action(async(state, payload) => {
    //     try {
    //         const {data} = await getUser(payload)
    //         state.user = data
    //     } catch (err) {
    //         state.setError(err?.response?.data.errors);
    //     }
    // }),
    setAuth: thunk(({setData}, payload) => {
        let token = getItem("LOCAL_TOKEN")
        if(token) {
            token = `Bearer ${token}`
            setData({
                auth: true,
                token: token,
                user: decode(token),
            });
        }
    }),
    authLogin: thunk(async ({ setError, setData, setMessage }, { email, password }) => {
        setError({});
        try {
            setMessage({msg: "", status: null})
            const { data } = await login({
                email,
                password,
            });

            setError({});
            setItem("LOCAL_TOKEN", data.token);
            setData({
                auth: true,
                token: data.token,
                user: decode(data.token),
            });
            setMessage({msg: "Loggedin successfully", status: 200})
        } catch (err) {
            setError(err?.response?.data.errors);
        }
    }),
    authSignUp: thunk(
        async (
            { setError, setData, setMessage },
            { name, email, password, passwordConfirmation }
        ) => {
            try {
                setMessage({msg: "", status: null})
                const { data } = await registation({
                    name,
                    email,
                    password,
                    passwordConfirmation,
                });

                setError({});
                setItem("LOCAL_TOKEN", data.token);
                setData({
                    auth: true,
                    token: data.token,
                    user: decode(data.token),
                });
                setMessage({msg: "SignUp successfully", status: 200})
            } catch (err) {
                setError(err?.response?.data.errors);
            }
        }
    ),
    authSignOut: thunk(({ setData, setMessage }) => {
        if(confirm("Are you sure, want to logout?")) {
            setMessage({msg: "", status: null})
            removeItem('LOCAL_TOKEN')
            setData({
                auth: false,
                token: null,
                user: {},
            });
            setMessage({msg: "Loggedout successfully", status: 203})
        }
    }),
    editUser: thunk(async({setData,setError, setLoading, setMessage}, payload) => {
        setMessage({msg: "", status: null})
        try {
            setLoading(true)
            // console.log(state.user)
            await updateUser(payload.id, payload.data)
            removeItem('LOCAL_TOKEN')
            setData({
                auth: false,
                token: null,
                user: {},
            });
            setMessage({msg: "User updated successfully, Please login again", status: 205})
        } catch (err) {
            setError({...err?.response?.data,type: Object.keys(payload.data)[0]});
        } finally {
            setLoading(false)
        }
    }),
    changePassword: thunk(async({setLoading,setMessage, setError}, payload) => {
        try {
            setMessage({msg: "", status: null})
            setError({})
            setLoading(true)
            const {data} = await editPass(payload)
            setMessage({msg: data.message, status: 202})
        } catch (err) {
            setError(err?.response?.data.errors);
        } finally {
            setLoading(false)
        }
    })
});

export default AuthModel;
