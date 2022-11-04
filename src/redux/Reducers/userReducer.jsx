import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd';
import LoginFacebook from '../../Components/LoginFacebook/LoginFacebook';
import { ACCESSTOKEN, http, settings, USERLOGIN, USERPROFILE } from '../../util/config';

const initialState = {
    message: '',
    messageLogin: '',
    messageUpdate: null,
    userAccount: settings.getStorageJson(USERLOGIN) ? settings.getStorageJson(USERLOGIN) : {},
    profileUser: {}

}

const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        createUserAccount: (state, action) => {
            state.message = action.payload
            alert(state.message);
        },
        loginAccount: (state, action) => {
            state.userAccount = action.payload
        },
        sendErrorMessageLogin: (state, action) => {
            state.messageLogin = action.payload
            // alert(state.messageLogin)
        },
        getProfileUser: (state, action) => {
            state.profileUser = action.payload
        },
        updateProfile: (state, action) => {
            state.messageUpdate = action.payload
            alert(state.messageUpdate)
        },
        changePassword: (state, action) => {
            state.message = action.payload;
            alert(state.message)
        }
    }
});

export const {changePassword, updateProfile, getProfileUser, createUserAccount, loginAccount, sendErrorMessageLogin } = userReducer.actions

export default userReducer.reducer


export const postAPIUserAccount = (userAccount) => {
    return async dispatch => {
        try {
            const result = await http.post("api/Users/signup", userAccount);
            const action = createUserAccount(result.data.message);
            dispatch(action)
        } catch (err) {
            const action = createUserAccount(err.response.data.message);
            dispatch(action)
        }
    }
}


export const loginAPI = (user) => {
    return async dispatch => {
        try {
            const result = await http.post("api/Users/signin", user);
            const action = loginAccount(result.data.content);
            await dispatch(action)
            const actionGetProfile = getAPIProfile();
            dispatch(actionGetProfile)
            settings.setCookieJson(ACCESSTOKEN, result.data.content);
            settings.setStorage(result.data.content.accessToken, ACCESSTOKEN);
            settings.setStorageJson(result.data.content, USERLOGIN);
        } catch (err) {
            const action = sendErrorMessageLogin(err.response.data.message + "!!.Vui lòng kiểm tra lại email và mật khẩu");
            dispatch(action)
            console.log(err.response.data.message)
        }
    }
}


export const getAPIProfile = () => {
    return async dispatch => {
        const result = await http.post('api/Users/getProfile');
        const action = getProfileUser(result.data.content);
        settings.setStorageJson(result.data.content, USERPROFILE);
        dispatch(action);
    }
}


export const updateAPIProfile = (user) => {
    return async dispatch => {
        try {
            const result = await http.post('api/Users/updateProfile', user);
            const action = updateProfile(result.data.content)
            dispatch(action)
            console.log(result)
        } catch (err) {
            console.log(err)
        }
    }
}


export const loginFacebookAPI = (tokenFacebookApp) => {
    return async dispatch => {
        const result = await http.post('api/Users/facebooklogin', {
            facebookToken: tokenFacebookApp
        })
        const action = loginAccount(result.data.content);
        await dispatch(action)
        const actionGetProfile = getAPIProfile();
        dispatch(actionGetProfile)
        settings.setCookieJson(ACCESSTOKEN, result.data.content);
        settings.setStorage(result.data.content.accessToken, ACCESSTOKEN);
        settings.setStorageJson(result.data.content, USERLOGIN);
    }
}


export const changePasswordAPI = (newPassword) => {
    return async dispatch => {
        const result = await http.post('api/Users/changePassword', newPassword);
        const action = changePassword(result.data.content);
        dispatch(action);
    }
}