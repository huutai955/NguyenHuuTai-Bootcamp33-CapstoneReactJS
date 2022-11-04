import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { getAPIFavoriteProduct, getAPIProduct } from '../../redux/Reducers/productReducer';

export default function Home() {
  const { arrProduct, arrFavoriteProduct } = useSelector(state => state.productReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    const action = getAPIProduct();
    dispatch(action)
    const action2 = getAPIFavoriteProduct();
    dispatch(action2);
    // eslint-disable-next-line
  }, [])

  return (
    <div className="home">
      <div className="container">
        <div className="carousel">
          <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={1} aria-label="Slide 2" />
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={2} aria-label="Slide 3" />
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="row">
                  <div className="col-8">
                    <img src={arrProduct[8]?.image} className="d-block w-61" alt="..." />
                  </div>
                  <div className="col-4">
                    <h3>{arrProduct[8]?.name}</h3>
                    <p>{arrProduct[8]?.shortDescription}</p>
                    <NavLink className="btnBuyNow" to={`/detail/${arrProduct[8]?.id}`}>Buy now</NavLink>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="row">
                  <div className="col-8">
                    <img src={arrProduct[7]?.image} className="d-block w-61" alt="..." />
                  </div>
                  <div className="col-4">
                    <h3>{arrProduct[7]?.name}</h3>
                    <p>{arrProduct[7]?.shortDescription}</p>
                    <NavLink className="btnBuyNow" to={`/detail/${arrProduct[7]?.id}`}>Buy now</NavLink>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="row">
                  <div className="col-8">
                    <img src={arrProduct[12]?.image} className="d-block w-61" alt="..." />
                  </div>
                  <div className="col-4">
                    <h3>{arrProduct[12]?.name}</h3>
                    <p>{arrProduct[12]?.shortDescription}</p>
                    <NavLink className="btnBuyNow" to={`/detail/${arrProduct[12]?.id}`}>Buy now</NavLink>
                  </div>
                </div>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
              <img src="./img/btnarrow-left.png" alt="" />
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
              <img src="./img/btnarrow-right.png" alt="" />
            </button>
          </div>
        </div>

        <div className="productfeature">
          <h3 className='text-center'>-Product Feature -</h3>
          <div className="row">
            {arrProduct.map((prod, index) => {
              let imgTag
              let indexFavorite = arrFavoriteProduct?.findIndex((product) => {
                return product.id === prod.id
              })
              if (indexFavorite !== -1) {
                imgTag = <img src="./img/heartLike.png" className='heart' alt="" />
              } else {
                imgTag = <img src="./img/heartUnlike.png" className='heart' alt="" />
              }
              return <div className="col-4" key={index}>
                {imgTag}
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
            })}
          </div>
        </div>
      </div>
    </div>

  )
}
