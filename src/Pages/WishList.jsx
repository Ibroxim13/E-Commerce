import React from 'react'
import { Rate } from 'antd'
import BreadCrumb from '../Components/BreadCrumb'
import { useLocation } from 'react-router-dom'
import { useContextProvider } from '../Context/MainContext'
import { IoIosHeartEmpty } from "react-icons/io";
import { IoCart } from "react-icons/io5";
import { FaRegEye } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { ErrorNotification } from '../Notifications/ErrorNotification'

export default function WishList() {
    const location = useLocation()
    let [wishlist, setWishlist, wishlistProducts, setWishlistProducts] = useContextProvider()

    const deleteProductWishlist = product => {
        let arr1 = wishlistProducts.filter(item => {
            if (item.id !== product.id) {
                return item
            }
        })
        setWishlistProducts(arr1)
        localStorage.setItem("wishlist-products", JSON.stringify(arr1))
        setWishlist(--wishlist)
        localStorage.setItem("wishlist", JSON.stringify(wishlist))
        ErrorNotification(`${product.title} deleted from wishlist`)
    }


    return (
        <>
            <BreadCrumb page={location.pathname.slice(1)} />
            <section className='wishlist-wrapper'>
                <div className="container">
                    <h2 className="wishlist-title">Your Wishlist Products</h2>
                    <main className='wishlist-products-content'>
                        {
                            wishlistProducts.length > 0 ?
                                wishlistProducts.map(product =>
                                    <div key={product.id} className="new-product-card">
                                        <span className="new-product-card-discount-percentage">-{Math.round(product.discountPercentage)}%</span>
                                        <div className="new-product-card-img">
                                            <img src={product.images[0]} alt={product.title} />
                                        </div>
                                        <div className="new-product-card-content">
                                            <h5>{product.category} {product.brand}</h5>
                                            <h4>{product.title}</h4>
                                            <div className='new-product-card-price'>{product.price}$ <span>{(product.price * (100 + Math.round(product.discountPercentage)) / 100).toFixed()}$</span></div>
                                            <Rate disabled defaultValue={Math.round(product.rating)} className='new-product-card-rate' />
                                            <div className="new-product-card-actions">
                                                <span><IoIosHeartEmpty onClick={() => deleteProductWishlist(product)} /></span>
                                                <span><Link to={`/product/:${product.id}`}><FaRegEye /></Link></span>
                                            </div>
                                        </div>
                                        <div className="new-product-card-add-cart">
                                            <button className='new-product-card-btn-add'><IoCart /><span>add to cart</span></button>
                                        </div>
                                    </div>
                                ) : <h3>Empty</h3>
                        }

                    </main>
                </div>
            </section>
        </>
    )
}
