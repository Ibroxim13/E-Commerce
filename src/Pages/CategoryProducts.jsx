import React, { useEffect, useRef, useState } from 'react'
import BreadCrumb from '../Components/BreadCrumb'
import { useLocation, Link } from 'react-router-dom'
import { Rate } from 'antd';
import { FaRegEye } from "react-icons/fa";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoCart } from "react-icons/io5";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { SuccessNotification } from '../Notifications/SuccessNotification'
import { ErrorNotification } from '../Notifications/ErrorNotification'
import { useContextProvider } from '../Context/MainContext'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import axios from 'axios'

export default function CategoryProducts() {
    const media1150px = window.matchMedia("(max-width: 1150px)")
    const media860px = window.matchMedia("(max-width: 860px)")
    const media550px = window.matchMedia("(max-width: 550px)")
    const location = useLocation()
    const swiperNavPrevRef = useRef(null);
    const swiperNavNextRef = useRef(null);
    const [categoryProducts, setCategoryProducts] = useState([])
    let [wishlist, setWishlist, wishlistProducts, setWishlistProducts, cartProducts,
        setCartProducts, cartProductsCount, setCartProductsCount, dep, setDep] = useContextProvider()

    useEffect(() => {
        axios(`https://dummyjson.com/products/category/${location.pathname.slice(13)}`)
            .then(res => setCategoryProducts
                (res.data.products))
    }, [dep])

    const addToWishlist = (product) => {
        if (wishlistProducts.length === 0) {
            setWishlistProducts([...wishlistProducts, product])
            localStorage.setItem("wishlist-products", JSON.stringify([...wishlistProducts, product]))
            setWishlist(++wishlist)
            localStorage.setItem("wishlist", JSON.stringify(wishlist))
            SuccessNotification(`Added ${product.title} to wishlist`)
        } else {
            let arr = wishlistProducts.filter(item => {
                if (item.id == product.id) {
                    return item
                }
            })
            if (!(arr.length > 0)) {
                setWishlistProducts([...wishlistProducts, product])
                localStorage.setItem("wishlist-products", JSON.stringify([...wishlistProducts, product]))
                setWishlist(++wishlist)
                localStorage.setItem("wishlist", JSON.stringify(wishlist))
                SuccessNotification(`Added ${product.title} to wishlist`)
            } else {
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
        }
    }

    const addToCart = (product) => {
        if (cartProducts.length === 0) {
            setCartProducts([...cartProducts, { ...product, quantity: 1 }])
            localStorage.setItem("cart-products", JSON.stringify([...cartProducts, { ...product, quantity: 1 }]))
            setCartProductsCount(++cartProductsCount)
            localStorage.setItem("cart-products-count", JSON.stringify(cartProductsCount))
            SuccessNotification(`Added ${product.title} to cart`)
        } else {
            let arr = cartProducts.filter(item => {
                if (item.id == product.id) {
                    return item
                }
            })
            if (!(arr.length > 0)) {
                setCartProducts([...cartProducts, { ...product, quantity: 1 }])
                localStorage.setItem("cart-products", JSON.stringify([...cartProducts, { ...product, quantity: 1 }]))
                setCartProductsCount(++cartProductsCount)
                localStorage.setItem("cart-products-count", JSON.stringify(cartProductsCount))
                SuccessNotification(`Added ${product.title} to cart`)
            }
            else {
                SuccessNotification(`You have already added ${product.title} to cart!`)
            }
        }
    }

    return (
        <>
            <BreadCrumb page={location.pathname.slice(13)} />
            <div className="container">
                <section className='new-products-wrapper'>
                    <h2 className="wrapper-title"><span style={{ textTransform: "capitalize" }}>{location.pathname.slice(13)}</span> Products</h2>
                    <main>
                        <Swiper
                            slidesPerView={media1150px.matches ? (media860px.matches ? (media550px.matches ? 1 : 2) : 3) : 4}
                            spaceBetween={26}
                            className='new-products-content'
                            modules={[Autoplay, Navigation]}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true
                            }}
                            navigation={{
                                prevEl: swiperNavPrevRef.current,
                                nextEl: swiperNavNextRef.current,
                                prevEl: 'swiperNavPrev',
                                nextEl: 'swiperNavNext',
                            }}
                            onInit={(swiper) => {
                                swiper.params.navigation.prevEl = swiperNavPrevRef.current;
                                swiper.params.navigation.nextEl = swiperNavNextRef.current;
                                swiper.navigation.init();
                                swiper.navigation.update();
                            }}
                        >
                            {
                                categoryProducts.map(product =>
                                    <SwiperSlide key={product.id}>
                                        <div className="new-product-card">
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
                                                    <span><IoIosHeartEmpty onClick={() => addToWishlist(product)} /></span>
                                                    <span><Link to={`/product/:${product.id}`}><FaRegEye /></Link></span>
                                                </div>
                                            </div>
                                            <div className="new-product-card-add-cart">
                                                <button onClick={() => addToCart(product)} className='new-product-card-btn-add'><IoCart /><span>add to cart</span></button>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            }


                            <div className={'swiperNavPrev'} ref={swiperNavPrevRef}><FaArrowLeft /></div>
                            <div className={'swiperNavNext'} ref={swiperNavNextRef}><FaArrowRight /></div>
                        </Swiper>
                    </main>
                </section>
            </div>
        </>
    )
}
