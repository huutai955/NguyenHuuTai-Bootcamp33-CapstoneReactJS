import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import HomeTemplate from './templates/HomeTemplate/HomeTemplate';
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/Login.jsx';
import Cart from './pages/Cart/Cart.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Register from './pages/Register/Register.jsx';
import Search from './pages/Search/Search.jsx';
import Detail from './pages/Detail/Detail.jsx';
// Import css tất cả vào file index.js

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='' element={<HomeTemplate />}>
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/detail' >
            <Route path=':id'  element={<Detail />}/>
            </Route> 
          <Route path='/home' element={<Profile />} />
          <Route path='/home' element={<Register />} />
          <Route path='/home' element={<Search />} />
      </Route>  
    </Routes>
  </BrowserRouter>
);
