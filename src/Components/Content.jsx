import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import SingleProduct from '../Pages/SingleProduct'
import CategoryProducts from '../Pages/CategoryProducts'
import WishList from '../Pages/WishList'
import MyAccount from '../Pages/MyAccount'
import Signup from '../Pages/Signup'
import Cart from '../Pages/Cart'

export default function Content() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/wishlist' element={<WishList />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/my-account' element={<MyAccount />} />
      <Route path='/sign-up' element={<Signup />} />
      <Route path='/categories/:category' element={<CategoryProducts />} />
      <Route path='/product/:id' element={<SingleProduct />} />
    </Routes>
  )
}
