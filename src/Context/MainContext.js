import { useContext, createContext, useState } from "react";

const Context = createContext()
export const useContextProvider = () => useContext(Context)

const ContextProvider = ({ children }) => {
    let [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem("wishlist")) ? JSON.parse(localStorage.getItem("wishlist")) : 0)
    let [wishlistProducts, setWishlistProducts] = useState(JSON.parse(localStorage.getItem("wishlist-products")) ? JSON.parse(localStorage.getItem("wishlist-products")) : [])
    let [cartProducts, setCartProducts] = useState(JSON.parse(localStorage.getItem("cart-products")) ? JSON.parse(localStorage.getItem("cart-products")) : [])
    let [cartProductsCount, setCartProductsCount] = useState(JSON.parse(localStorage.getItem("cart-products-count")) ? JSON.parse(localStorage.getItem("cart-products-count")) : 0)
    let [dep, setDep] = useState(false)

    return (
        <Context.Provider value=
            {[
                wishlist, setWishlist,
                wishlistProducts, setWishlistProducts,
                cartProducts, setCartProducts,
                cartProductsCount, setCartProductsCount,
                dep, setDep
            ]}>
            {children}
        </Context.Provider>
    )
}


export default ContextProvider;