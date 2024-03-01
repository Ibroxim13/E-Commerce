import React from 'react'
import { Link } from 'react-router-dom'
import { useContextProvider } from '../Context/MainContext';

export default function Footer() {
  const [,,,,,,,,dep, setDep] = useContextProvider()
  const goToShop = () => {
    if (window.location.href == "" && window.location.href == "/home") {
      window.scrollTo({
        top: 800,
        behavior: "smooth",
      });
    } else {
      window.location.href = "/home"
    }
  }

  return (
    <footer className='footer-wrapper'>
      <div className="footer-lists">
        <div className="container">
          <div className="footer-lists-content">
            <ul>
              <li><h1>about us</h1></li>
              <li>We are the online store with 10 years of experience.You can see more info in about page</li>
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
            <ul>
              <li><h1>categories</h1></li>
              <li><Link onClick={goToShop}>All Products</Link></li>
              <li><Link to={"/categories/:laptops"} onClick={() => setDep(!dep)}>Laptops</Link></li>
              <li><Link to={"/categories/:furniture"} onClick={() => setDep(!dep)}>Furniture</Link></li>
              <li><Link to={"/categories/:motorcycle"} onClick={() => setDep(!dep)}>Motorcycle</Link></li>
            </ul>
            <ul>
              <li><h1>information</h1></li>
              <li><Link>About Us</Link></li>
              <li><Link to={"mailto:ibrohimismoilov738@gmail.com"}>Contact Us</Link></li>
              <li><Link>Privacy Policy</Link></li>
              <li><Link>Orders and Returns</Link></li>
            </ul>
            <ul>
              <li><h1>service</h1></li>
              <li><Link to={"/my-account"}>My Account</Link></li>
              <li><Link to={"/cart"}>View Cart</Link></li>
              <li><Link to={"/wishlist"}>Wishlist</Link></li>
              <li><Link>Help</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <section className='footer-end'>
        <span>Copyright &copy; 2024 All rights reserved | This is made by <b>Ibroxim</b></span>
      </section>
    </footer>
  )
}
