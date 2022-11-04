import { useFormik } from 'formik';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup'
import { postAPIUserAccount } from '../../redux/Reducers/userReducer';

export default function Register() {
  const { message } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      name: '',
      phone: '',
      gender: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email không đúng định dạng!!")
        .required("Email không được để trống!!"),
      password: Yup.string()
        .required("Password không được để trống!!")
        .min(6, "Password phải dài hơn 6 ký tự!!")
        .max(15, "Password phải ít hơn 15 ký tự!!"),
      passwordConfirm: Yup.string()
        .required("Xác nhận mật khẩu không được bỏ trống")
        .oneOf([Yup.ref('password')], "Xác nhận mật khẩu không khớp với mật khẩu")
      ,
      name: Yup.string()
        .matches(/^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$/, "Tên không được chứa ký tự đặc biệt!!")
        .required("Tên không được bỏ trống!!"),
      phone: Yup.string()
        .required("Số điện thoại không được bỏ trống !!")
        .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, "Số điện thoại không hợp lệ!!"),
      gender: Yup.string()
        .required("Vui lòng chọn giới tính của bạn!!")
    }),
    onSubmit: values => {
      const valuesAPI = {
        email: values.email,
        password: values.password,
        name: values.name,
        gender: values.gender,
        phone: values.phone
      }
      const action = postAPIUserAccount(valuesAPI);
      dispatch(action)
    }
  })


  return (
    <div className='register'>
      <div className="container">
        <h3>Register</h3>
        <form className="form" onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <p>Email</p>
                <input type="text" className='form-control' name='email' placeholder='email' value={formik.values.email} onChange={formik.handleChange} />
                <p className='errorsTextInput'>{formik.errors.email}</p>

              </div>
              <div className="form-group">
                <p>Password</p>
                <input type="password" className='form-control' id="password" name='password' placeholder='password' value={formik.values.password} onChange={formik.handleChange} />
                <button className='btn-eye' onClick={(e) => {
                  let password = document.getElementById("password")
                  console.log(password)
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

                <p className='errorsTextInput'>{formik.errors.password}</p>
              </div>
              <div className="form-group">
                <p>Password confirm</p>
                <input type="password" className='form-control' id='passwordConfirm' name='passwordConfirm' placeholder='password confirm' value={formik.values.passwordConfirm} onChange={formik.handleChange} />
                <button className='btn-eye' onClick={(e) => {
                  let passwordConfirm = document.getElementById("passwordConfirm")
                  if (e.target.className === 'fa-sharp fa-solid fa-eye') {
                    e.target.className = "fa-sharp fa-solid fa-eye-slash"
                    passwordConfirm.setAttribute("type", 'password')
                  } else {
                    e.target.className = "fa-sharp fa-solid fa-eye"
                    passwordConfirm.setAttribute("type", 'text')
                  }
                }}>
                  <i className="fa-sharp fa-solid fa-eye-slash"></i>
                </button>
                <p className='errorsTextInput'>{formik.errors.passwordConfirm}</p>

              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <p>Name</p>
                <input type="text" className='form-control' name='name' placeholder='Name' value={formik.values.name} onChange={formik.handleChange} />
                <p className='errorsTextInput'>{formik.errors.name}</p>

              </div>
              <div className="form-group">
                <p>Phone</p>
                <input type="text" className='form-control' name='phone' placeholder='Phone' value={formik.values.phone} onChange={formik.handleChange} />
                <p className='errorsTextInput'>{formik.errors.phone}</p>

              </div>
              <div className="form-group d-flex align-items-center flex-wrap">
                <p  className="genderNameRadio">Gender</p>
                <div className='radioinput'>
                  <div className="male">
                    <input type="radio" name="gender" defaultValue={true} style={{ width: 24 }} onChange={formik.handleChange} />
                    <p>Male</p>
                  </div>
                  <div className="female">
                    <input type="radio" name="gender" defaultValue={false} style={{ width: 24 }} onChange={formik.handleChange} />
                    <p>Female</p>
                  </div>
                </div>
                <br />
                <p className='errorsTextInput'>{formik.errors.gender}</p>
              </div>
              <div className="form-group registerBtnForm">
                <button type='submit' className='btnSubmit'>Submit</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
