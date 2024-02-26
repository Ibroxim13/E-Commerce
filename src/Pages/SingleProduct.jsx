import React, { useEffect, useState } from 'react'
import BreadCrumb from '../Components/BreadCrumb'
import axios from 'axios'
import { Rate } from 'antd'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, FreeMode, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';


export default function SingleProduct() {
    const [product, setProduct] = useState({})
    const [comments, setComments] = useState({})
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    let [productCount, setProductCount] = useState(1)
    let [productTotalPrice, setProductTotalPrice] = useState(null)
    const param = useParams()

    useEffect(() => {
        axios(`https://dummyjson.com/products/${param.id.slice(1)}`)
            .then(res => {
                setProductTotalPrice(res.data.price)
                setProduct(res.data)
            })
    }, [])

    useEffect(() => {
        axios(`https://dummyjson.com/comments/post/${param.id.slice(1)}`)
            .then(res => setComments(res.data.comments))
    }, [])

    const incrCount = () => {
        setProductCount(++productCount)
        setProductTotalPrice(productTotalPrice += product.price)
    }

    const decrCount = () => {
        if (productCount !== 0) {
            setProductCount(--productCount)
            setProductTotalPrice(productTotalPrice -= product.price)
        }
    }

    return (
        <>
            <BreadCrumb page={product.title} />
            <section className='product-wrapper'>
                <div className="container">
                    <div className="product-wrapper-row">
                        <div className="product-wrapper-col">
                            <Swiper
                                navigation={true}
                                thumbs={{ swiper: thumbsSwiper }}
                                modules={[Navigation, Autoplay, Thumbs]}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true,
                                }}
                                className='product-main-slider'
                            >
                                {
                                    product?.images?.map(image =>
                                        <SwiperSlide className='product-main-slide' key={image}>
                                            <img src={image} />
                                        </SwiperSlide>
                                    )
                                }
                            </Swiper>
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                spaceBetween={10}
                                slidesPerView={2}
                                freeMode={true}
                                watchSlidesProgress={true}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="mySwiper"
                            >
                                {
                                    product?.images?.map(image =>
                                        <SwiperSlide style={{ textAlign: "center" }} key={image}>
                                            <img width={250} height={150} src={image} />
                                        </SwiperSlide>
                                    )
                                }
                            </Swiper>
                        </div>
                        <div className="product-wrapper-col">
                            <h2>{product.title}</h2>
                            <h3>{product.brand}<span>({product.stock})</span></h3>
                            <Rate disabled value={Math.round(product.rating)} className='new-product-card-rate' />
                            <span className='product-rate'>({product.rating})</span>
                            <p>{product.description}</p>
                            <div className='product-price'>
                                {product.price}$ /
                                <span>{(product.price * (100 + Math.round(product.discountPercentage)) / 100).toFixed()}$</span>
                            </div>
                            <div className='product-add-to-cart'>
                                <div>
                                    <button onClick={decrCount}>-</button>
                                    <span className='product-count'>{productCount}</span>
                                    <button onClick={incrCount}>+</button>
                                    <span>Total Price: {productTotalPrice}$</span>
                                </div>
                                <button className='product-add-to-cart-btn'>Add to Cart</button>
                            </div>
                            <span className='product-category'>Category: <b>{product.category}</b></span>
                        </div>
                    </div>
                    <div className="product-comments">
                        <h2 className="wrapper-title">Reviews to this product</h2>
                        <form className="product-add-comment">
                            <textarea placeholder='Leave comment...'></textarea>
                            <button type='submit'>Add</button>
                        </form>
                        <div className="product-comments-content">
                            {
                                comments.length > 0 ?
                                    comments.map(comment =>
                                        <div className="product-comment" key={comment.id}>
                                            <div>
                                                <h4>{comment.user.username}</h4>
                                                <p>{comment.body}</p>
                                            </div>
                                        </div>
                                    ) : <div className='product-no-comment'>In this product haven't added comments yet!</div>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
