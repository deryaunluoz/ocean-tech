import {
  SET_CATEGORIES, SET_PRODUCT_LIST, SET_TOTAL,
  SET_FETCH_STATE, SET_LIMIT, SET_OFFSET, SET_FILTER
} from '../reducers/productReducer'
import api from '../../api/axios'

export const setCategories = (categories) => ({ type: SET_CATEGORIES, payload: categories })
export const setProductList = (list) => ({ type: SET_PRODUCT_LIST, payload: list })
export const setTotal = (total) => ({ type: SET_TOTAL, payload: total })
export const setFetchState = (state) => ({ type: SET_FETCH_STATE, payload: state })
export const setLimit = (limit) => ({ type: SET_LIMIT, payload: limit })
export const setOffset = (offset) => ({ type: SET_OFFSET, payload: offset })
export const setFilter = (filter) => ({ type: SET_FILTER, payload: filter })

// T12 - Kategorileri çek
export const fetchCategories = () => async (dispatch) => {
  try {
    const response = await api.get('/categories')
    dispatch(setCategories(response.data))
  } catch (error) {
    console.error('Kategoriler alınamadı:', error)
  }
}

// T13-T14 - Ürünleri çek (filtre, sort, kategori, limit, offset)
export const fetchProducts = (params = {}) => async (dispatch) => {
  dispatch(setFetchState('FETCHING'))
  try {
    const response = await api.get('/products', { params })
    dispatch(setProductList(response.data.products))
    dispatch(setTotal(response.data.total))
    dispatch(setFetchState('FETCHED'))
  } catch (error) {
    console.error('Ürünler alınamadı:', error)
    dispatch(setFetchState('FAILED'))
  }
}