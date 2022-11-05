import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom'
import { addOrderProduct, addProductToCart, getAmountProduct, getAPiDetailProduct } from '../../redux/Reducers/productReducer'
import { settings } from '../../util/config';

export default function Detail() {
  const { detailProduct, amount, arrCart } = useSelector(state => state.productReducer)
  const param = useParams();
  const dispatch = useDispatch()

  useEffect(() => {
    const action = getAPiDetailProduct(param.id);
    dispatch(action)
  }, [param.id])

  useEffect(() => {
    settings.setStorageJson(arrCart, 'arrCart');
  }, [arrCart])

  return (
    <div className='detail'>
      <div className="container">
        <div className="detail__product">
          <div className="row">
            <div className="col-4" >
              <img src={detailProduct.image} className="w-100" alt="" />
            </div>
            <div className="col-8">
              <h3>{detailProduct.name}</h3>
              <p>{detailProduct.description}</p>
              <h4>Available size</h4>
              <div className="buttonSize">
              {detailProduct.size?.map((size, index) => {
                return <button className='btnsize' key={index}>{size}</button>
              })}
              </div>
              <span>{detailProduct.price}$</span>
              <div className="amount">
                <button onClick={() => {
                    const action = getAmountProduct(1)
                    dispatch(action)
                }}>+</button>
                <span>{amount}</span>
                <button className='decreasebtn' onClick={() => {
                  const action = getAmountProduct(-1)
                  dispatch(action)
                }}>-</button>
              </div>
              <button className='btnAddtocart' onClick={() => {
                const product = {
                  id: detailProduct.id,
                  img: detailProduct.image,
                  name: detailProduct.name,
                  price: detailProduct.price,
                  amount: amount
                }
                const action = addProductToCart(product)
                dispatch(action)
                
              }}>Add to cart</button>
            </div>
          </div>
        </div>

        <div className="relatedproduct">
          <h3>-Realate Product -</h3>
          <div className="row">
            {detailProduct.relatedProducts?.map((prod, index) => {
              return <div className="col-4" key={index}>
                <div className="card">
                  <img src={prod.image} className="w-100" alt="" />
                  <div className="product__body">
                    <h3>{prod.name}</h3>
                    <p>{prod.shortDescription}</p>
                  </div>
                  <div className="product__footer">
                    <NavLink to={`/detail/${prod.id}`}>Buy now</NavLink>
                    <span>{prod.price}$</span>
                  </div>
                </div>
              </div>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
