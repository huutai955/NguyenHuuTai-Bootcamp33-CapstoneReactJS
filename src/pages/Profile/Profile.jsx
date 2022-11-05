import { useFormik } from 'formik';
import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAPIProfile, updateAPIProfile } from '../../redux/Reducers/userReducer'
import { settings, USERPROFILE } from '../../util/config';
import * as Yup from 'yup'
import { getAPIFavoriteProduct } from '../../redux/Reducers/productReducer';
import { NavLink } from 'react-router-dom';
import WOW from 'wowjs';

export default function Profile() {
  let { profileUser } = useSelector(state => state.userReducer);
  let { arrFavoriteProduct } = useSelector(state => state.productReducer);
  let getAPIFromLocal = settings.getStorageJson(USERPROFILE)
  const dispatch = useDispatch();
  const newProfileUser = {
    email: getAPIFromLocal?.email,
    phone: getAPIFromLocal?.phone,
    name: getAPIFromLocal?.name,
    password: "",
    gender: ""
  }


  useEffect(() => {
    const action = getAPIFavoriteProduct();
    dispatch(action)
    const actionProfile = getAPIProfile();
    dispatch(actionProfile)
    new WOW.WOW({
      live: false
    }).init();
    // eslint-disable-next-line
  }, [])





  const formik = useFormik({
    initialValues: newProfileUser,
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email không đúng định dạng!!")
        .required("Email không được để trống!!"),
      password: Yup.string()
        .required("Password không được để trống!!")
        .min(6, "Password phải dài hơn 6 ký tự!!")
        .max(15, "Password phải ít hơn 15 ký tự!!"),
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
      const action = updateAPIProfile(values)
      dispatch(action);
    }
  })





  return (
    <div className='profile'>
      <div className="container">
        <h3 className='profileText'>Profile</h3>
        <div className="row">
          <div className="col-2">
            <img src="https://i.pravatar.cc/?u=tainguyen201507021@gmail.com" className='w-100' alt="" />
          </div>
          <div className="col-10">
            <form className='form' onSubmit={formik.handleSubmit}>
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <p>Email</p>
                    <input type="text" className='form-control' placeholder='Email' name='email' value={formik.values?.email} onChange={formik.handleChange} />
                    <p className='errorsTextInput'>{formik.errors.email}</p>
                  </div>
                  <div className="form-group">
                    <p>Phone</p>
                    <input type="text" className='form-control' placeholder='Phone' name='phone' value={formik.values?.phone} onChange={formik.handleChange} />
                    <p className='errorsTextInput'>{formik.errors.phone}</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <p>Name</p>
                    <input type="text" className='form-control' placeholder='Name' name='name' value={formik.values?.name} onChange={formik.handleChange} />
                    <p className='errorsTextInput'>{formik.errors.name}</p>
                  </div>
                  <div className="form-group">
                    <p>Password</p>
                    <input type="password" className='form-control' placeholder='Password' name='password' value={formik.values?.password} onChange={formik.handleChange} />
                    <p className='errorsTextInput'>{formik.errors.password}</p>
                  </div>
                  <div className="form-group d-flex flex-wrap">
                    <p className="genderNameRadio">Gender</p>
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
                  <div className="form-group d-flex justify-content-between align-items-center">
                    <NavLink to={"/changepassword"}>You want to change password?</NavLink>
                    <button className='btnSubmit'>Update</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="orderhistory">
          <div className="container">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="orderhistory" aria-selected="true">Order history</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="favourite" aria-selected="false">Favourite</button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                {profileUser.ordersHistory?.map((profile, index) => {
                  return <div className='wow bounceInUp'  data-wow-duration="1s" data-wow-delay="1s" key={index}>
                    <h4>+ Orders have been placed on {profile.date}</h4>
                    <table className='w-100'>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>IMG</th>
                          <th>Name</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      {profile.orderDetail?.map((product, index) => {
                        return <tbody key={index}>
                          <tr>
                            <td>{index + 1}</td>
                            <td>
                              <img src={product.image} width={100} alt="" />
                            </td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>
                              {product.quantity}
                            </td>
                            <td>{product.quantity * product.price}</td>
                          </tr>
                        </tbody>
                      })}
                    </table>
                  </div>

                })}

              </div>
              <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                <h5>The Favorite Shoes</h5>
                <div className="row">
                  {arrFavoriteProduct.map((prod, index) => {
                    return <div className="col-4 animate__animated animate__backInUp" key={index}>
                      <img src="./img/heartLike.png" className='heart' alt="" />
                      <img src={prod.image} className="w-100" alt="" />
                      <div className="product__body">
                        <h3>{prod.name}</h3>
                        <div className="product__footer">
                          <NavLink to={`/detail/${prod.id}`}>Detail</NavLink>
                        </div>
                      </div>
                    </div>
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
