import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const searchProfile = createAsyncThunk("search/searchProfile", async (username) => {
    const data = await axios.get(`${process.env.REACT_APP_API}/username/${username}`)
                            .then(res => res.data);
    return data;
})

export const getSearcherProfile = createAsyncThunk("searcherprofile/getSearcherProfile", async (username) => {
    const data = await axios.get(`${process.env.REACT_APP_API}/username/${username}`)
                            .then(res => res.data);
    return data;
})

export const searchSlice = createSlice({
    name: "search",
    initialState: {
        Profile: [],
        isUser: null,
    },
    reducers: {
        setIsUserNull: (state) => {
            state.isUser = false;
            state.Profile = [];
        }
    },
    extraReducers: {
        [searchProfile.fulfilled]: (state, action) => {
            
            if(action.payload !== null){
                state.Profile =  action.payload;
                state.isUser = true;
            }else{
                state.isUser = false;
            }
        },
        [getSearcherProfile.fulfilled]: (state, action) => {
            if(action.payload !== null){
                state.Profile =  action.payload
                state.isUser = null;
            }else{
                state.Profile = {
                    fullName: "err",
                    avatar: "err",
                    privacy: "err"
                }
            }
        },
        [getSearcherProfile.rejected]: (action) => {
            console.log(action.error);
        }
    }
})
export const { setIsUserNull } = searchSlice.actions;
export default searchSlice.reducer;