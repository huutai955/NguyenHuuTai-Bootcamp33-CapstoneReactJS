import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { http } from '../../util/config';

const initialState = {
  arrProduct: [],
  detailProduct: {},
  arrCart: [],
  amount: 1,
  orderProduct: {},
  messageOrder: '',
  arrSearchProduct: [],
  arrFavoriteProduct: [],
  arrCategory: [],
  arrMap: [],
  arrPagingFirst: [],
  arrPagingSecond: []
}

const productReducer = createSlice({
  name: 'productReducer',
  initialState,
  reducers: {
    getProductList: (state, action) => {
      state.arrProduct = action.payload
    },
    getDetailProduct: (state, action) => {
      state.detailProduct = action.payload
    },
    addProductToCart: (state, action) => {

      const index = state.arrCart.findIndex((product) => {
        return product.id === action.payload.id
      })

      if (index === -1) {
        state.arrCart.push(action.payload)
      } else {
        state.arrCart[index].amount += state.amount;
      }
    },
    getAmountProduct: (state, action) => {
      state.amount += action.payload;
    },
    getArrCart: (state, action) => {
      state.arrCart = action.payload
    },
    increaseAmountProductInCart: (state, action) => {
      const index = state.arrCart.findIndex((product) => {
        return product.id === action.payload.id
      });
      state.arrCart[index].amount += 1
    },
    decreaseAmountProductInCart: (state, action) => {
      const index = state.arrCart.findIndex((product) => {
        return product.id === action.payload.id
      });
      state.arrCart[index].amount -= 1
    },
    deleteProductFormCart: (state, action) => {
      state.arrCart = state.arrCart.filter((product) => {
        return product.id !== action.payload
      })
    },
    getOrderProduct: (state, action) => {
      state.orderProduct = action.payload
    },
    getMessageOrder: (state, action) => {
      state.messageOrder = action.payload
      alert(state.messageOrder)
    },
    getSearchProduct: (state, action) => {
      state.arrSearchProduct = action.payload
    },
    decreaseArrSearchProduct: (state, action) => {
      if (state.arrSearchProduct) {
        state.arrSearchProduct = action.payload;
      }else {
        state.arrCategory = action.payload;
      }
    },
    increaseArrSearchProduct: (state, action) => {
      if (state.arrSearchProduct) {
        state.arrSearchProduct = action.payload;
      }else {
        state.arrCategory = action.payload;
      }
    },
    getFavoriteProduct: (state, action) => {
      state.arrFavoriteProduct = action.payload;
    },
    getCategory: (state, action) => {
      state.arrCategory = action.payload
    },
    clearArrSearchProduct: (state,action) => {
      state.arrSearchProduct = action.payload;
    },
    getArrMap: (state, action) => {
      state.arrMap = action.payload
    },
    getPagingFirst: (state, action) => {
      state.arrPagingFirst = action.payload
    }
  }
});

export const {getPagingFirst,getArrMap,clearArrSearchProduct, getCategory,getFavoriteProduct, increaseArrSearchProduct,decreaseArrSearchProduct,getSearchProduct, getMessageOrder, getOrderProduct, deleteProductFormCart, decreaseAmountProductInCart, increaseAmountProductInCart, getArrCart, getAmountProduct, addProductToCart, getProductList, getDetailProduct } = productReducer.actions

export default productReducer.reducer


export const getAPIProduct = () => {
  return async dispatch => {
    // const result = await http.get("api/Product");
    const result = await axios({
      url: 'https://shop.cyberlearn.vn/api/Product',
      method: 'GET'
    })
    const action = getProductList(result.data.content);
    dispatch(action)
  }
}


export const getAPiDetailProduct = (id) => {
  return async dispatch => {
    // const result = await http.get(`api/Product/getbyid?id=${id}`);
    const result = await axios({
      url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`,
      method: 'GET'
    })
    const action = getDetailProduct(result.data.content);
    dispatch(action)
  }
}


export const submitOrderAPI = (detail) => {
  return async dispatch => {
    try {
      const result = await axios({
        url: 'https://shop.cyberlearn.vn/api/Users/order',
        method: 'POST',
        data: detail
      })

      const action = getMessageOrder(result.data.message);
      dispatch(action)
    } catch (err) {
      console.log(err)
    }
  }
}


export const getAPISearchProduct = (param) => {
  return async dispatch => {
    const result = await axios({
      url: `https://shop.cyberlearn.vn/api/Product?keyword=${param}`,
      method: 'GET',
    })

    const action = getSearchProduct(result.data.content);
    dispatch(action);
  }
}


export const getAPIFavoriteProduct = () => {
  return async dispatch => {
    const result = await http.get('/api/Users/getproductfavorite');

    const action = getFavoriteProduct(result.data.content.productsFavorite);
    dispatch(action)
  }
}


export const getAPICategory = (param) => {
  return async dispatch => {
    const result = await axios({
      url: `https://shop.cyberlearn.vn/api/Product/getProductByCategory?categoryId=${param}`,
      method: 'GET'
    });
    const action  = getCategory(result.data.content);
    dispatch(action)
  }
}

export const getAPIMap = () => {
  return async dispatch => {
    const result = await http.get("api/Product/getAllStore");
    const action = getArrMap(result.data.content);
    dispatch(action);
  }
}
