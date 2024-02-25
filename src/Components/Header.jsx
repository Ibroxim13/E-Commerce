import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Header() {
  const [allCategories, setAllCategories] = useState([])

  useEffect(() => {
    axios("https://dummyjson.com/products/categories")
      .then(res => setAllCategories(res.data))
  }, [])

  return (
    <>
      <header className="header-top">
        <div className="container">
          <div className="header-top-content">
            <ul className="header-top-col">
              <li>
                <Link to={"tel:+998977041308"}>
                  <i className="bi bi-telephone-fill"></i>
                  <span>+998977041308</span>
                </Link>
              </li>
              <li>
                <Link to={"mailto:ibrohimismoilov738@gmail.com"}>
                  <i className="bi bi-envelope"></i>
                  <span>ibrohimismoilov738@gmail.com</span>
                </Link>
              </li>
              <li>
                <Link to={"https://maps.app.goo.gl/hYbxDNCSvPmqhMMm7"}>
                  <i className="bi bi-geo-alt-fill"></i>
                  <span>Tashkent, Dormon street 35</span>
                </Link>
              </li>
            </ul>
            <ul className="header-top-col">
              <li>
                <Link>
                  <i className="bi bi-currency-dollar"></i>
                  <span>USD</span>
                </Link>
              </li>
              <li>
                <Link>
                  <i className="bi bi-person"></i>
                  <span>My Account</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <header className="header-bottom">
        <div className="container">
          <div className="header-bottom-content">
            <div className="header-bottom-col">
              <Link className='header-logo' to={"/"}>
                <span>Just Buy</span>
                <span>.</span>
              </Link>
            </div>
            <div className="header-bottom-col">
              <select className='header-categories'>
                <option>all products</option>
                {
                  allCategories?.map(category =>
                    <option key={category}>{category}</option>
                  )
                }
              </select>
              <form className='search-form'>
                <input type="text" placeholder='Search here...' />
                <button type='submit'>Search</button>
              </form>
            </div>
            <div className="header-bottom-col">
              <ul className="product-actions">
                <li>
                  <Link to={"#"}>
                    <div className="product-action-icon">
                      <i className="bi bi-heart"></i>
                      <span className="product-counter">2</span>
                    </div>
                    <span className='product-action-text'>Your Wishlist</span>
                  </Link>
                </li>
                <li>
                  <Link to={"#"}>
                    <div className="product-action-icon">
                      <i className="bi bi-cart-fill"></i>
                      <span className="product-counter">0</span>
                    </div>
                    <span className='product-action-text'>Your Cart</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <nav className="navbar">
        <div className="container">
          <ul className="navbar-content">
            <li>
              <NavLink className="navbar-text" to={"/home"}>Home</NavLink>
            </li>
            {
              allCategories.map(category => {
                if (category.length == 15 && category.includes("-")) {
                  console.log(category);
                }
                return (
                  <li key={category}>
                    <NavLink className={
                      `
                        navbar-text
                        ${category.length >= 14 && category.includes("-") ? "navbar-text-w-129" : ""}
                        ${category.length == 12 && category.includes("-") ? "navbar-text-w-120" : ""}
                        ${category.length == 11 && category.includes("-") ? "navbar-text-w-125" : ""}
                        ${category.length == 10 && category.includes("-") ? "navbar-text-w-119" : ""}
                      `
                    }
                      to={`/${category}`}>{category}</NavLink>
                  </li>
                )
              }
              )
            }
          </ul>
        </div>
      </nav >
    </>
  )
}
