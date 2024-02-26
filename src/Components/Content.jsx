import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import SingleProduct from '../Pages/SingleProduct'
import CategoryProducts from '../Pages/CategoryProducts'
import WishList from '../Pages/WishList'

export default function Content() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/wishlist' element={<WishList />} />
      <Route path='/categories/:category' element={<CategoryProducts />} />
      <Route path='/product/:id' element={<SingleProduct />} />
    </Routes>
  )
}
