import { SET_USER, SET_ROLES, SET_THEME, SET_LANGUAGE, SET_FAVORITES } from '../reducers/clientReducer'
import api from '../../api/axios'

export const setUser = (user) => ({ type: SET_USER, payload: user })
export const setRoles = (roles) => ({ type: SET_ROLES, payload: roles })
export const setTheme = (theme) => ({ type: SET_THEME, payload: theme })
export const setLanguage = (language) => ({ type: SET_LANGUAGE, payload: language })
export const setFavorites = (favorites) => ({ type: SET_FAVORITES, payload: favorites })

// Favoriye ekle / çıkar
export const toggleFavorite = (product) => (dispatch, getState) => {
  const { favorites } = getState().client
  const exists = favorites.find(p => p.id === product.id)
  if (exists) {
    dispatch(setFavorites(favorites.filter(p => p.id !== product.id)))
  } else {
    dispatch(setFavorites([...favorites, product]))
  }
}

export const fetchRoles = () => async (dispatch, getState) => {
  const { roles } = getState().client
  if (roles.length > 0) return
  try {
    const response = await api.get('/roles')
    dispatch(setRoles(response.data))
  } catch (error) {
    console.error('Roller alınamadı:', error)
  }
}

export const autoLogin = () => async (dispatch) => {
  const token = localStorage.getItem('token')
  if (!token) return
  try {
    api.defaults.headers.common['Authorization'] = token
    const response = await api.get('/verify')
    dispatch(setUser(response.data))
    localStorage.setItem('token', response.data.token || token)
    api.defaults.headers.common['Authorization'] = response.data.token || token
  } catch (error) {
    localStorage.removeItem('token')
    delete api.defaults.headers.common['Authorization']
  }
}