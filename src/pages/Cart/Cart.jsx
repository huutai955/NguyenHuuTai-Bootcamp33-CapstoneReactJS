import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { decreaseAmountProductInCart, deleteProductFormCart, getArrCart, getOrderProduct, increaseAmountProductInCart, submitOrderAPI } from '../../redux/Reducers/productReducer';
import { ACCESSTOKEN, settings } from '../../util/config'

export default function Cart() {
  const navigate = useNavigate();
  const { arrCart, orderProduct } = useSelector(state => state.productReducer);
  const { userAccount } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();


  useEffect(() => {
    if (settings.getStorage(ACCESSTOKEN) === undefined) {
      alert("Bạn phải đăng nhập để vào phần giỏ hàng!!")
      navigate('/login')
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const action = getArrCart(settings.getStorageJson("arrCart"));
    dispatch(action)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    settings.setStorageJson(arrCart, 'arrCart');
  }, [arrCart])

  useEffect(() => {
    const newOrder = {
      orderDetail:
        arrCart.map((product) => {
          return {
            productId: product.id,
            quantity: product.amount
          }
        }),
      email: userAccount.email
    }
    const action = getOrderProduct(newOrder);
    dispatch(action);
    // eslint-disable-next-line
  }, [arrCart])


  return (
    <div className='cart'>
      <div className="container">
        <h3>Carts</h3>
        <table className='w-100'>
          <thead>
            <tr>
              <th className='checkTh'>
                <i className="fa-sharp fa-solid fa-square-check"></i>
              </th>
              <th>ID</th>
              <th>IMG</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {arrCart.map((product, index) => {
              return <tr key={index}>
                <td className='checkTd'>
                  <i className="fa-sharp fa-solid fa-square-check"></i>
                </td>
                <td>{product.id}</td>
                <td>
                  <img src={product.img} alt="" width={100} height={100} />
                </td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td className='btnEditAmount'>
                  <button className='increseAmount' onClick={() => {
                    const action = increaseAmountProductInCart(product);
                    dispatch(action)
                  }}>+</button>
                  <span>{product.amount}</span>
                  <button className='decreaseAmount' onClick={() => {
                    const action = decreaseAmountProductInCart(product);
                    dispatch(action)
                  }}>-</button>
                </td>
                <td>
                  {product.price * product.amount}
                </td>
                <td className='btnDeleteEdit'>
                  <button className='btnEdit'>EDIT</button>
                  <button className='btnDelete' onClick={() => {
                    const action = deleteProductFormCart(product.id)
                    dispatch(action)
                  }}>DELETE</button>
                </td>
              </tr>
            })}
          </tbody>
        </table>
        <div className="submitOrder">
          <button onClick={() => {
            const action  = submitOrderAPI(orderProduct);
            dispatch(action);
          }}>SUBMIT ORDER</button>
        </div>
      </div>
    </div>
  )
}
