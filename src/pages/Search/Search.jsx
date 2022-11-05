import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom'
import { clearArrSearchProduct, decreaseArrSearchProduct, getAPICategory, getAPISearchProduct, increaseArrSearchProduct } from '../../redux/Reducers/productReducer';
import { NavLink } from 'react-router-dom';
import _ from 'lodash'

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keywordRef = useRef('');
  let { arrSearchProduct, arrCategory } = useSelector(state => state.productReducer);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { value } = e.target;
    keywordRef.current = value;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({
      keyword: keywordRef.current
    })
  }

  const handleSelect = (e) => {
    let { value } = e.target;
    keywordRef.current = value;

    setSearchParams({
      keyword: keywordRef.current
    })
    const keyword = searchParams.get("keyword");
    if (keyword) {
      const action = getAPICategory(keyword);
      dispatch(action);
    }
  }

  useEffect(() => {
    const keyword = searchParams.get("keyword")
    if (keyword) {
      const action = getAPISearchProduct(keyword);
      dispatch(action);
    }
    // eslint-disable-next-line
  }, [keywordRef.current])

  useEffect(() => {
    const action = clearArrSearchProduct(null);
    dispatch(action)
    // eslint-disable-next-line
  }, [arrCategory])

  return (
    <div className="search">
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group searchInput w-100 me-5 ms-4">
            <p>Search</p>
            <input type="text" className='form-control' onChange={handleChange} />
          </div>
          <div className="form-group">
            <button type='submit'>Search</button>
          </div>
        </form>
        <h3 className='searchText'>Search result</h3>
        <div className="searchResult">
          <h4>Price</h4>
          <button className='btnsort' onClick={() => {
            let sortArr = []
            if (arrSearchProduct) {
              sortArr = _.sortBy(arrSearchProduct, ['price'])
              sortArr = _.reverse(sortArr)
            } else {
              sortArr = _.sortBy(arrCategory, ['price'])
              sortArr = _.reverse(sortArr)
            }
            const action = decreaseArrSearchProduct(sortArr);
            dispatch(action)
          }}>decrease
            <img src="./img/AngleDown.png" alt="" />
          </button>
          <br />
          <button className='btnsort' onClick={() => {
            let sortArr = []
            if (arrSearchProduct) {
              sortArr = _.sortBy(arrSearchProduct, ['price'])
            } else {
              sortArr = _.sortBy(arrCategory, ['price'])
            }
            const action = increaseArrSearchProduct(sortArr);
            dispatch(action)
          }}>ascending
            <img src="./img/AngleUp.png" alt="" />
          </button>
          <br />
          <div className="search__select">
            <label className="form-label">Category</label>
            <select className="form-select form-select-lg" onChange={handleSelect}>
              <option value="">Select one</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
            </select>
          </div>
          <div className="row">
            {arrSearchProduct ? arrSearchProduct?.map((prod, index) => {
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
            }) : arrCategory?.map((prod, index) => {
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
