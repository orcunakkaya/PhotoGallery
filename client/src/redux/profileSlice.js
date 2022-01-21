import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProfile = createAsyncThunk("profile/getProfile", async (_id) => {
    const data = await axios.get(`${process.env.REACT_APP_API}/${_id}`)
                            .then(res => res.data)
    return data; 
})

export const createImage = createAsyncThunk("image/createImage", async (image) => {
    const serverImages = await axios.get(`${process.env.REACT_APP_API}/queryimages/${localStorage.getItem("id")}`)
                                    .then(res => res.data)

    await axios.patch(`${process.env.REACT_APP_API}/image/${localStorage.getItem("id")}`, {
        images: [image,...serverImages]
    })
    return image;
})

export const changeAvatar = createAsyncThunk("avatar/changeAvatar", async (avatar) => {
    await axios.patch(`${process.env.REACT_APP_API}/avatar/${localStorage.getItem("id")}`, {
        avatar: avatar
    })
    return avatar;
})

export const getUsername = createAsyncThunk("username/getUsername", async (_username) => {
    const data = await axios.get(`${process.env.REACT_APP_API}/queryusername/${_username}`).then(res => res.data);
    return data
})


export const changeUsername= createAsyncThunk("changeuser/changeUsername",  async (username) => {
    await axios.patch(`${process.env.REACT_APP_API}/changeusername/${localStorage.getItem("id")}`, {
        username: username
    })
    return username
})

export const changePassword = createAsyncThunk("password/changePassword", async (password) => {
    await axios.patch(`${process.env.REACT_APP_API}/changepassword/${localStorage.getItem("id")}`, {
        password: password
    })
})

export const changeFullname = createAsyncThunk("fullname/changeFullname", async (fullname) => {
    await axios.patch(`${process.env.REACT_APP_API}/changefullname/${localStorage.getItem("id")}`, {
        fullName: fullname
    })
    return fullname;
})

export const deletePhoto = createAsyncThunk("delete/deletePhoto", async (images) => {
    await axios.patch(`${process.env.REACT_APP_API}/deletephoto/${localStorage.getItem("id")}`, {
        images: images
    })
    return images;
})

export const changePrivacy = createAsyncThunk("privacy/changePrivacy", async (privacy) => {
    await axios.patch(`${process.env.REACT_APP_API}/privacy/${localStorage.getItem("id")}`, {
        privacy: privacy
    })
    return privacy;
})

export const deleteProfile = createAsyncThunk("delete/deleteProfile", async (id) => {
    await axios.delete(`${process.env.REACT_APP_API}/deleteprofile/${id}`)
})

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profile: [],
        isUsedUsername: null,
    },
    reducers: {
        deleteUser: (state) => {
            state.profile = [];
        }
    },
    extraReducers: {
        [getProfile.fulfilled]: (state, action) => {
            if(action.payload !== undefined){
                state.profile = {
                    username: action.payload.username,
                    fullName: action.payload.fullName,
                    password: action.payload.password,
                    avatar  : action.payload.avatar,
                    privacy : action.payload.privacy,
                    images  : action.payload.images
                }
            }
        },
        [getProfile.rejected]: (action) => {
            console.log(action.error.message);
        },
        [createImage.fulfilled]: (state, action) => {
            state.profile.images.unshift(action.payload);
        },
        [createImage.rejected]: (action) => {
            console.log(action.error);
        },
        [changeAvatar.fulfilled]: (state, action) => {
            state.profile.avatar = action.payload;
        },
        [changeAvatar.rejected]: (action) => {
            console.log(action.error.message);
        },
        [getUsername.fulfilled]: (state, action) => {
            if (action.payload === null){
                state.isUsedUsername = false;
            }else{
                state.isUsedUsername = true;
            }
        },
        [getUsername.rejected]: (action) => {
            console.log(action.error);
        },
        [changeUsername.fulfilled]: (state, action) => {
            state.profile.username = action.payload;
        },
        [changeUsername.rejected]: (action) => {
            console.log(action.error);
        },
        [changeFullname.fulfilled]: (state, action) => {
            state.profile.fullName = action.payload;
        },
        [deletePhoto.fulfilled]: (state, action) => {
            state.profile.images = action.payload;
        },
        [changePrivacy.fulfilled]: (state, action) => {
            state.profile.privacy = action.payload;
        }
    }
})
export const { deleteUser, addImage } = profileSlice.actions;
export default profileSlice.reducer;