import { Switch, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Header from './layout/Header'
import Footer from './layout/Footer'
import PageContent from './layout/PageContent'
import HomePage from './pages/HomePage'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import ContactPage from './pages/ContactPage'
import TeamPage from './pages/TeamPage'
import AboutPage from './pages/AboutPage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import OrdersPage from './pages/OrdersPage'
import AddressesPage from './pages/AddressesPage'
import CardsPage from './pages/CardsPage'
import FavoritesPage from './pages/FavoritesPage'
import ReturnPolicyPage from './pages/ReturnPolicyPage'
import WarrantyPage from './pages/WarrantyPage'
import DeliveryPage from './pages/DeliveryPage'
import FaqPage from './pages/FaqPage'
import CareerPage from './pages/CareerPage'
import BlogPage from './pages/BlogPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import { autoLogin } from './store/actions/clientActions'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(autoLogin())
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <PageContent>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId" component={ProductDetail} />
          <Route path="/shop" component={Shop} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/team" component={TeamPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/orders" component={OrdersPage} />
          <Route path="/addresses" component={AddressesPage} />
          <Route path="/cards" component={CardsPage} />
          <Route path="/favorites" component={FavoritesPage} />
          <Route path="/iade-politikasi" component={ReturnPolicyPage} />
          <Route path="/garanti" component={WarrantyPage} />
          <Route path="/teslimat" component={DeliveryPage} />
          <Route path="/sss" component={FaqPage} />
          <Route path="/kariyer" component={CareerPage} />
          <Route path="/blog" component={BlogPage} />
          <Route path="/gizlilik" component={PrivacyPage} />
          <Route path="/kullanim-sartlari" component={TermsPage} />
        </Switch>
      </PageContent>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default App