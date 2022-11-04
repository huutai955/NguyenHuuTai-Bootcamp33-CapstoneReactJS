import { useFormik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import * as Yup from 'yup'
import { loginAPI } from '../../redux/Reducers/userReducer'
import LoginFacebook from '../../Components/LoginFacebook/LoginFacebook'

export default function Login() {
    const { messageLogin} = useSelector(state => state.userReducer)
    const dispatch = useDispatch();
    const formik = useFormik({
      initialValues: {
        email: '',
        password: ''
      },
      validationSchema: Yup.object().shape({
        email: Yup.string()
        .email("Email không đúng định dạng!!")
        .required("Email không được để trống!!"),
        password: Yup.string()
        .required("Password không được để trống!!")
      }),
      onSubmit: values => {
        const action = loginAPI(values);
        dispatch(action);
      }
    })

  return (
    <div className='login'>
      <div className="container">
        <h3>Login</h3>

        <form className='form' onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <p>Email</p>
            <input type="text" name='email' className='form-control' onChange={formik.handleChange}/>
           {formik.errors.email && formik.touched.email && (
             <p className='errorsTextInput'>{formik.errors.email}</p>
           )}
          </div>
          <div className="form-group">
            <p>Password</p>
            <input type="password" name='password' className='form-control' id='password'  onChange={formik.handleChange}/>
            <button className='btn-eye' onClick={(e) => {
              let password = document.getElementById("password")
              console.log(e)
              if (e.target.className === 'fa-sharp fa-solid fa-eye') {
                e.target.className = "fa-sharp fa-solid fa-eye-slash"
                password.setAttribute("type", 'password')
              } else {
                e.target.className = "fa-sharp fa-solid fa-eye"
                password.setAttribute("type", 'text')
              }
            }}>
              <i className="fa-sharp fa-solid fa-eye-slash"></i>
            </button>
            {formik.errors.password && formik.touched.password && (
             <p className='errorsTextInput'>{formik.errors.password}</p>
           )} 
           <p className='errorsTextInput'>{messageLogin}</p>
          </div>
          <div className="form-group registerNow">
            <NavLink to={"/register"}>Register now?</NavLink>
            <button className='btnsubmit' type='submit'>LOGIN</button>
          </div>
          <div className="form-group">
            <LoginFacebook />
          </div>
        </form>

      </div>

    </div>
  )
}
