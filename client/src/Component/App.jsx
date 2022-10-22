import React from 'react'
import { BrowserRouter as BR, Routes, Route } from 'react-router-dom'
import "../asset/css/style.css"
import Home from './Home'
import Navbar from './Navbar'
import Footer from './Footer'
import Shop from './Shop'
import Contact from './Contact'
import Login from './Login'
import Signup from './Signup'
import Profile from './Profile'
import Singlepage from './Singlepage'
import Cart from './Cart'
import Wishlist from './Wishlist'
import UpdateProfile from './UpdateProfile'
import Checkout from './Checkout'
import AdminHome from './Admin/AdminHome'
import Users from './Admin/Users'
import AdminMainCategory from './Admin/AdminMainCategory'
import AddMc from './Admin/AddMc'
import AdminSubCategory from './Admin/AdminSubCategory'
import AddSc from './Admin/AddSc'
import AdminBrand from './Admin/AdminBrand'
import AddBrand from './Admin/AddBrand'
import AdminProducts from './Admin/AdminProducts'
import AddProducts from './Admin/AddProducts'
import AdminCheckout from './Admin/AdminCheckout'
import AdminUpdateProduct from './Admin/AdminUpdateProduct'
import ResetPassword from './ResetPassword'
import AdminNewsLetters from './Admin/AdminNewsLetters'
import AdminContact from './Admin/AdminContact'
import Search from './Search'
import UpdatePassword from './UpdatePassword'
export default function App() {

    return (
        <>

            <BR>

                <Navbar />
                <Search/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Shop/:mc/:sc/:brand/:search" element={<Shop />} />
                    <Route path="/Contact" element={<Contact />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Signup" element={<Signup />} />
                    <Route path="/Profile" element={<Profile />} />
                    <Route path="/single-product/:_id" element={<Singlepage />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/updateprofile" element={<UpdateProfile />} />
                    <Route path="/updatepassword" element={<UpdatePassword/>} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/Admin" element={<AdminHome />} />
                    <Route path="/admin-users" element={<Users />} />
                    <Route path="/admin-mc" element={<AdminMainCategory />} />
                    <Route path="/add-mc" element={<AddMc />} />
                    <Route path="/admin-sc" element={<AdminSubCategory />} />
                    <Route path="/add-sc" element={<AddSc />} />
                    <Route path="/admin-brand" element={<AdminBrand />} />
                    <Route path="/add-brand" element={<AddBrand />} />
                    <Route path="/admin-products" element={<AdminProducts />} />
                    <Route path="/add-products" element={<AddProducts />} />
                    <Route path="/admin-checkouts" element={<AdminCheckout />} />
                    <Route path="/admin-update-product/:_id" element={<AdminUpdateProduct />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/admin-newsletters" element={<AdminNewsLetters />} />
                    <Route path="/admin-contact" element={<AdminContact />} />
                    <Route path="*" element={<Home />} />


                </Routes>
            </BR>
            <Footer />
        </>
    )
}
