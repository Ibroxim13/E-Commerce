import React, { useEffect, useRef, useState } from 'react'
import BreadCrumb from '../Components/BreadCrumb'
import { FaTrash } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useContextProvider } from '../Context/MainContext';
import { ErrorNotification } from '../Notifications/ErrorNotification';


export default function Cart() {
    const location = useLocation();
    const navigate = useNavigate()
    const cart = useRef();
    const modalChecklist = useRef();
    const [totalPrice, setTotalPrice] = useState(0)
    let [, , , , cartProducts, setCartProducts, cartProductsCount, setCartProductsCount] = useContextProvider()

    useEffect(() => {
        cartProducts.forEach(element => {
            setTotalPrice(prev => (prev + (element.price * element.quantity)))
            modalChecklist.current.style.display = "none"
        });
    }, [])

    const deleteProduct = product => {
        let arr1 = cartProducts.filter(item => {
            if (item.id !== product.id) {
                return item
            }
        })
        setCartProducts(arr1)
        localStorage.setItem("cart-products", JSON.stringify(arr1))
        setCartProductsCount(prev => prev - product.quantity)
        localStorage.setItem("cart-products-count", JSON.stringify(JSON.parse(localStorage.getItem("cart-products-count")) - product.quantity))
        setTotalPrice(totalPrice - (product.price * product.quantity))
        ErrorNotification(`${product.title} deleted from cart`)
    }

    const increaseQuan = (product) => {
        product.quantity = ++product.quantity;
        let arr = cartProducts.filter(prd => {
            if (prd.id !== product.id) {
                return prd
            }
        })
        setCartProducts([...arr, product])
        localStorage.setItem("cart-products", JSON.stringify([...arr, product]))
        setCartProductsCount(++cartProductsCount)
        localStorage.setItem("cart-products-count", JSON.stringify(cartProductsCount))
        setTotalPrice(prev => prev + product.price)
    }

    const decreQuan = (product) => {
        if (product.quantity !== 1) {
            product.quantity = --product.quantity;
            let arr = cartProducts.filter(prd => {
                if (prd.id !== product.id) {
                    return prd
                }
            })
            setCartProducts([...arr, product])
            localStorage.setItem("cart-products", JSON.stringify([...arr, product]))
            setCartProductsCount(--cartProductsCount)
            localStorage.setItem("cart-products-count", JSON.stringify(cartProductsCount))
            setTotalPrice(prev => prev - product.price)
        }
    }

    const showModalChecklist = () => {
        cart.current.style.display = "none";
        modalChecklist.current.style.display = "block";
    }

    const goToHome = () => {
        setCartProducts([])
        localStorage.setItem("cart-products", JSON.stringify([]))
        setCartProductsCount(0)
        localStorage.setItem("cart-products-count", JSON.stringify(0))
        setTotalPrice(0)
        navigate("/home")
        cart.current.style.display = "block";
        modalChecklist.current.style.display = "none";
    }

    return (
        <>
            <BreadCrumb page={location.pathname.slice(1)} />
            <section className="cart-wrapper">
                <div className="container">
                    <h2 style={{ textAlign: "center" }} className="wishlist-title">Your Cart</h2>
                    {
                        cartProducts.length > 0 ?
                            <>
                                <div ref={cart} className="cart-wrapper-content">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Image</th>
                                                <th>Count</th>
                                                <th>Price</th>
                                                <th>Total Price</th>
                                                <th>-/-</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                cartProducts.map(product =>
                                                    <tr key={product.id}>
                                                        <td>{product.title}</td>
                                                        <td><Link to={product.images[0]} target='_blank'><img src={product.images[0]} alt={product.title} /></Link></td>
                                                        <td>
                                                            <div>
                                                                <button onClick={() => decreQuan(product)}>-</button>
                                                                <span>{product.quantity}</span>
                                                                <button onClick={() => increaseQuan(product)}>+</button>
                                                            </div>
                                                        </td>
                                                        <td>${product.price}</td>
                                                        <td>${product.price * product.quantity}</td>
                                                        <td><FaTrash onClick={() => deleteProduct(product)} /></td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                    <div className='cart-activities'>
                                        <div className='total-price-products'>Total Price: <span>${totalPrice}</span></div>
                                        <div className='cart-checkout'>
                                            <button onClick={showModalChecklist}>Buy Now</button>
                                        </div>
                                    </div>
                                </div>
                                <div className='modal-product-cart-checkout' ref={modalChecklist}>
                                    <h2>Checklist</h2>
                                    <p>Thank's for shopping! We will deliver your products as soon as...</p>
                                    {
                                        cartProducts.map(prd =>
                                            <div key={prd.id} className="modal-product-row">
                                                <div className="modal-product-col"><img src={prd.images[0]} alt={prd.title} /></div>
                                                <div className="modal-product-col">
                                                    <span>{prd.title}</span>
                                                    <div className='modal-product-details'>
                                                        <span>Count: {prd.quantity}</span>
                                                        <span>Price: <p>${prd.price * prd.quantity}</p></span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    <ul>
                                        <li>
                                            <span>Total price</span>
                                            <span>${totalPrice}</span>
                                        </li>
                                    </ul>
                                    <div className='modal-product-cart-btn'>
                                        <button onClick={goToHome}>Continue Shopping</button>
                                    </div>
                                </div>
                            </>
                            :
                            <div className='cart-wrapper-content'>
                                <div className='empty-notification'>
                                    <div className='empty-heart'><Link to={"/home"}><FaCartPlus /></Link></div>
                                    <span>You haven't added products yet! Add by clicking "Add to Cart"</span>
                                    <Link to={"/home"}><button>Go to Add</button></Link>
                                </div>
                            </div>
                    }
                </div>
            </section>
        </>
    )
}
