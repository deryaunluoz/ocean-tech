import { SET_CART, SET_PAYMENT, SET_ADDRESS } from '../reducers/shoppingCartReducer'

export const setCart = (cart) => ({ type: SET_CART, payload: cart })
export const setPayment = (payment) => ({ type: SET_PAYMENT, payload: payment })
export const setAddress = (address) => ({ type: SET_ADDRESS, payload: address })

// Sepete ürün ekle
export const addToCart = (product) => (dispatch, getState) => {
  const { cart } = getState().shoppingCart
  const existing = cart.find(item => item.product.id === product.id)

  let newCart
  if (existing) {
    newCart = cart.map(item =>
      item.product.id === product.id
        ? { ...item, count: item.count + 1 }
        : item
    )
  } else {
    newCart = [...cart, { count: 1, checked: true, product }]
  }
  dispatch(setCart(newCart))
}

// Sepetten ürün çıkar
export const removeFromCart = (productId) => (dispatch, getState) => {
  const { cart } = getState().shoppingCart
  const newCart = cart.filter(item => item.product.id !== productId)
  dispatch(setCart(newCart))
}

// Ürün miktarını güncelle
export const updateCartCount = (productId, count) => (dispatch, getState) => {
  const { cart } = getState().shoppingCart
  if (count < 1) return
  const newCart = cart.map(item =>
    item.product.id === productId ? { ...item, count } : item
  )
  dispatch(setCart(newCart))
}

// Ürün seçim durumunu değiştir
export const toggleCartItem = (productId) => (dispatch, getState) => {
  const { cart } = getState().shoppingCart
  const newCart = cart.map(item =>
    item.product.id === productId ? { ...item, checked: !item.checked } : item
  )
  dispatch(setCart(newCart))
}
