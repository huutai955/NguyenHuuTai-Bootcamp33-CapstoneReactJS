import React from 'react';
import ReactDOM from 'react-dom/client';
import HomeTemplate from './templates/HomeTemplate/HomeTemplate';
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/Login.jsx';
import Cart from './pages/Cart/Cart.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Register from './pages/Register/Register.jsx';
import Search from './pages/Search/Search.jsx';
import Detail from './pages/Detail/Detail.jsx';
// Import css tất cả vào file index.js
import './index.scss'
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter, Route, Routes, Navigate } from 'react-router-dom'
import { store } from './redux/configStore';
import { createBrowserHistory } from 'history';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import Map from './pages/Map/Map';
import 'animate.css';
export const history = createBrowserHistory();



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path='' element={<HomeTemplate />}>
          <Route index element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/detail' >
            <Route path=':id' element={<Detail />} />
          </Route>
          <Route path='/profile' element={<Profile />} />
          <Route path='/register' element={<Register />} />
          <Route path='/search' element={<Search />} />
          <Route path='/changepassword' element={<ChangePassword />} />
          <Route path='/map' element={<Map />} />
          <Route path='*' element={<Navigate to={""} />} />
        </Route>
      </Routes>
    </HistoryRouter>
  </Provider>
);
