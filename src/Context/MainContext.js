import { useContext, createContext, useState, useEffect } from "react";

const Context = createContext()
export const useContextProvider = () => useContext(Context)

const ContextProvider = ({ children }) => {
    let [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem("wishlist")) ? JSON.parse(localStorage.getItem("wishlist")) : 0)
    let [wishlistProducts, setWishlistProducts] = useState(JSON.parse(localStorage.getItem("wishlist-products")) ? JSON.parse(localStorage.getItem("wishlist-products")) : [])

    return (
        <Context.Provider value={[wishlist, setWishlist, wishlistProducts, setWishlistProducts]}>
            {children}
        </Context.Provider>
    )
}


export default ContextProvider;