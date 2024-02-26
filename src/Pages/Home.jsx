import React, { useEffect, useRef, useState } from 'react'
import smartphones from "../Assets/images/banner-phones.png"
import laptops from "../Assets/images/banner-laptops.png"
import parfumes from "../Assets/images/banner-parfume.png"
import skincare from "../Assets/images/banner-skincare.png"
import groceries from "../Assets/images/banner-groceries.png"
import homeDecoration from "../Assets/images/banner-home-d.png"
import { Carousel, Rate } from 'antd';
import { FaArrowAltCircleRight, FaRegEye, FaTelegramPlane, FaFacebookF, FaGithub, FaLinkedin } from "react-icons/fa";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoCart } from "react-icons/io5";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { MdEmail, MdOutlineEmail } from "react-icons/md";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Home() {
  const swiperNavPrevRef = useRef(null);
  const swiperNavNextRef = useRef(null);
  const [allProducts, setAllProducts] = useState([])
  const [topRatedProducts, setTopRatedProducts] = useState([])

  useEffect(() => {
    axios("https://dummyjson.com/products?limit=100")
      .then(res => {
        setAllProducts(res.data.products);
        let arr = res.data.products.filter(item => {
          if (item.rating >= 4.5) {
            return item
          }
        })
        setTopRatedProducts(arr)
      })
  }, [])

  let [days, setDays] = useState("");
  let [hours, setHours] = useState("00");
  let [minutes, setMinutes] = useState("00");
  let [seconds, setSeconds] = useState("00");

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
      total,
      hours,
      minutes,
      seconds,
      days
    };
  };

  const startTimer = (e) => {
    let { total, hours, minutes, seconds, days } = getTimeRemaining(e);
    if (total >= 0) {
      setDays(days)
      setHours(hours > 9 ? hours : "0" + hours)
      setMinutes(minutes > 9 ? minutes : "0" + minutes)
      setSeconds(seconds > 9 ? seconds : "0" + seconds)
    }
  };

  const clearTimer = (e) => {
    setDays("")
    setHours("00")
    setMinutes("00")
    setSeconds("00")
    const id = setInterval(() => { startTimer(e) }, 1000);
  };

  useEffect(() => {
    let deadline = "2024-03-01";
    clearTimer(deadline);
  }, []);


  return (
    <section className='home-wrapper'>
      <div className="container">
        <Carousel className='category-banners' autoplay autoplaySpeed={5000} effect='fade'>
          <div className="category-banner">
            <img src={smartphones} alt="smartphones" />
            <div className="category-banner-content">
              <h3>Smartphones <br /> Collection</h3>
              <button>Shop now <FaArrowAltCircleRight className='to-shop-icon' /></button>
            </div>
          </div>
          <div className="category-banner">
            <img src={laptops} alt="smartphones" />
            <div className="category-banner-content">
              <h3>Laptops <br /> Collection</h3>
              <button>Shop now <FaArrowAltCircleRight className='to-shop-icon' /></button>
            </div>
          </div>
          <div className="category-banner">
            <img src={parfumes} alt="smartphones" />
            <div className="category-banner-content">
              <h3>Fragrances <br /> Collection</h3>
              <button>Shop now <FaArrowAltCircleRight className='to-shop-icon' /></button>
            </div>
          </div>
          <div className="category-banner">
            <img src={skincare} alt="smartphones" />
            <div className="category-banner-content">
              <h3>Skincare <br /> Collection</h3>
              <button>Shop now <FaArrowAltCircleRight className='to-shop-icon' /></button>
            </div>
          </div>
          <div className="category-banner">
            <img src={groceries} alt="smartphones" />
            <div className="category-banner-content">
              <h3>Groceries <br /> Collection</h3>
              <button>Shop now <FaArrowAltCircleRight className='to-shop-icon' /></button>
            </div>
          </div>
          <div className="category-banner">
            <img src={homeDecoration} alt="smartphones" />
            <div className="category-banner-content">
              <h3>Home Decoration <br /> Collection</h3>
              <button>Shop now <FaArrowAltCircleRight className='to-shop-icon' /></button>
            </div>
          </div>
        </Carousel>
      </div >
      <div className="container">
        <section className='new-products-wrapper'>
          <h2 className="wrapper-title">All Products</h2>
          <main>
            <Swiper
              slidesPerView={4}
              spaceBetween={36}
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
                allProducts.map(product =>
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
                          <span><IoIosHeartEmpty /></span>
                          <span><Link to={`/product/:${product.id}`}><FaRegEye /></Link></span>
                        </div>
                      </div>
                      <div className="new-product-card-add-cart">
                        <button className='new-product-card-btn-add'><IoCart /><span>add to cart</span></button>
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
      <section className="sale-banner-wrapper">
        <div className="container">
          <div className="sale-banner-content">
            <ul className="sale-deadline">
              <li>
                <span>{days}</span>
                <span>days</span>
              </li>
              <li>
                <span>{hours}</span>
                <span>hours</span>
              </li>
              <li>
                <span>{minutes}</span>
                <span>minutes</span>
              </li>
              <li>
                <span>{seconds}</span>
                <span>seconds</span>
              </li>
            </ul>
            <h1>HOT DEAL THIS WEEK</h1>
            <p>NEW COLLECTION UP TO 50% OFF</p>
            <button>shop now</button>
          </div>
        </div>
      </section>
      <div className="container">
        <section className='new-products-wrapper'>
          <h2 className="wrapper-title">Top Rated Products</h2>
          <main>
            <Swiper
              slidesPerView={4}
              spaceBetween={36}
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
                topRatedProducts.map(product =>
                  <SwiperSlide key={product.id} >
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
                          <span><IoIosHeartEmpty /></span>
                          <span><Link to={`/product/:${product.id}`}><FaRegEye /></Link></span>
                        </div>
                      </div>
                      <div className="new-product-card-add-cart">
                        <button className='new-product-card-btn-add'><IoCart /><span>add to cart</span></button>
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
      </div >
      <div className="newslatter-wrapper">
        <div className="container">
          <div className="newslatter-wrapper-content">
            <MdOutlineEmail className='back-email-img' />
            <p>Sign Up for the <strong>NEWSLETTER</strong></p>
            <form className="newslatter-form">
              <input type="email" placeholder='Enter Your Email' />
              <button type='submit'><MdEmail className='newslatter-email-iocn' /> Subscribe</button>
            </form>
            <div className="social-links">
              <div><Link to={"https://telegram.me/IsmoilovIbroxim"}><FaTelegramPlane /></Link></div>
              <div><Link to={"https://www.facebook.com/ibrohim.ismoilov.1232?mibextid=ZbWKwL"}><FaFacebookF /></Link></div>
              <div><Link to={"https://github.com/Ibroxim13"}><FaGithub /></Link></div>
              <div><Link to={"https://www.linkedin.com/in/ibrohim-ismoilov-2bb086246?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"}><FaLinkedin /></Link></div>
            </div>
          </div>
        </div>
      </div>
    </section >
  )
}
