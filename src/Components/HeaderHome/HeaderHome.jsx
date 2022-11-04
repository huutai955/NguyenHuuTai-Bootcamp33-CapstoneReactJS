import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { ACCESSTOKEN, settings, USERLOGIN, USERPROFILE } from '../../util/config';

export default function HeaderHome() {
  const { userAccount } = useSelector(state => state.userReducer);
  const { arrCart } = useSelector(state => state.productReducer);
  const renderLoginOrProfile = (user) => {
    if (user.email) {
      return <>
        <li className="nav-item"><NavLink className="nav-link" to={"/profile"}>Profile</NavLink></li>
        <button className='btnLogout' onClick={() => {
          settings.eraseCookie(ACCESSTOKEN, 0);
          localStorage.removeItem(USERPROFILE)
          localStorage.removeItem(USERLOGIN)
          localStorage.removeItem(ACCESSTOKEN)
          window.location.href = '/login'
        }}>Logout</button>
      </>
    } else {
      return <li className="nav-item"><NavLink className="nav-link" to={"/login"}>Login</NavLink></li>
    }
  }

  const total = arrCart?.reduce((total, currentProduct) => {
    return total += currentProduct.amount;
  }, 0)

  return (
    <div className='header'>
      <nav className="header__top navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <div className="navbar-brand">
            <img src="./img/logo.png" alt="" />
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="header__second collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul className='navbar-nav m-0 d-flex'>
              <li className="nav-item">
                <NavLink className="nav-link header__search " to={"/search"}>
                  <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
                  Search
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={"/cart"}>
                  <img src="./img/cart.png" alt="" />
                  ({total})
                </NavLink>
              </li>
              {renderLoginOrProfile(userAccount)}
              <li className="nav-item">
                <NavLink className="nav-link" to={"/register"}>
                  Register</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="header__bottom container">
        <ul>
          <li>
            <NavLink to={""}>Home</NavLink>
          </li>
          <li>
            <NavLink to={""}>Men</NavLink>
          </li>
          <li>
            <NavLink to={""}>Woman</NavLink>
          </li>
          <li>
            <NavLink to={""}>Kid</NavLink>
          </li>
          <li>
            <NavLink to={""}>Sport</NavLink>
          </li>
        </ul>
      </div>
    </div>

  )
}
