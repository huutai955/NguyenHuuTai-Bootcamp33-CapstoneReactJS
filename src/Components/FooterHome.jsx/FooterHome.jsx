import React from 'react'
import { NavLink } from 'react-router-dom'

export default function FooterHome() {
  return (
  <div className="footer">
    <div className="footer__top">
      <div className="row container">
        <div className="col-4 footer__first">
          <h3>GET HELP</h3>
          <ul>
            <li><NavLink to={""}>Home</NavLink></li>
            <li><NavLink to={""}>Nike</NavLink></li>
            <li><NavLink to={""}>Adidas</NavLink></li>
            <li><NavLink to={""}>Contact</NavLink></li>
          </ul>
        </div>

        <div className="col-4 footer__middle">
          <h3>SUPPORT</h3>
          <ul>
            <li><NavLink to={""}>About</NavLink></li>
            <li><NavLink to={"/map"}>Contact</NavLink></li>
            <li><NavLink to={""}>Help</NavLink></li>
            <li><NavLink to={""}>Phone</NavLink></li>
          </ul>
        </div>

        <div className="col-4 footer__end">
          <h3>REGISTER</h3>
          <ul>
            <li><NavLink to={""}>Register</NavLink></li>
            <li><NavLink to={""}>Login</NavLink></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="footer__bottom  p-4" >
      <p>© 2022 Cybersoft All Rights Reserved | Design Theme by Trương Tấn Khải.</p>
    </div>
  </div>
  )
}
