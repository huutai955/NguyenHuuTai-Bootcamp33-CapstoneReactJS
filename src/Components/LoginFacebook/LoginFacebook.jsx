import React from 'react'
import FacebookLogin from 'react-facebook-login';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginFacebookAPI } from '../../redux/Reducers/userReducer';

export default function LoginFacebook() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const responseFacebook = (response) => {
        console.log(response);
        const action = loginFacebookAPI(response.accessToken);
         dispatch(action);
        //  navigate('/profile')
    }
    return (
        <>
            <FacebookLogin
                appId="1994793484040698"
                // autoLoad={true}
                fields="name,email,picture"
                // onClick={componentClicked}
                // onClick={responseFacebook}
                callback={responseFacebook}
            />
        </>
    )
}
