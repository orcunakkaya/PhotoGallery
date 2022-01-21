import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createUser = createAsyncThunk('user/createUser', async (data) => {
    const users = await axios.get(`${process.env.REACT_APP_API}/username/${data.username}`).then(res => res.data);

    if(users === null) {
        const userDescription = {
            username: data.username,
            fullName: data.fullName.trim(),
            password: data.password,
            avatar: "",
            privacy: "Show",
            images: [],
        }
        await axios.post(process.env.REACT_APP_API, userDescription);
        const getId = await axios.get(`${process.env.REACT_APP_API}/authid/${userDescription.username}`).then(res => res.data);
        localStorage.setItem('id', getId)

        return userDescription;
     }
})

export const findUser= createAsyncThunk('user/findUser', async (values) => {
    const user = await axios.get(`${process.env.REACT_APP_API}/isuser/${values.username}`).then(res => res.data)
    if(user === null){
        return null;
    }
    if((user.username === values.username) && (user.password === values.password)){
        return user._id;
    }else{
        return null;
    }
    
})

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: [],
        isCreated: null,
        isUser: null,
        isLoggin: localStorage.getItem("id") ? true : false
    },
    reducers: {
        setIsUserNull: (state) => {
            state.isUser = null;
            state.isCreated = null;
            state.isLoggin = false;
        }
    },
    extraReducers: {
        [createUser.fulfilled]: (state, action) => {
            state.user = action.payload
            if(action.payload) {
                state.isCreated = true;
                state.isLoggin = true;
            }else{
                state.isCreated = false;
                state.isLoggin = true;
            }
        },
        [createUser.rejected]: (action) => {
            console.log(action.error.message);
        },
        [findUser.fulfilled]: (state, action) => {
            if(action.payload !== null){
                state.isUser = true
                localStorage.setItem('id', action.payload)
                state.isLoggin = true;
            }else{
                state.isUser = false
            }
        },
        [findUser.rejected]: (action) => {
            console.log(action.error.message);
        }
    }
})

export const { setIsUserNull } = authSlice.actions

export default authSlice.reducer;