import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'

const Header = ({ onClickCart }) => {
  const { totalPrice } = useCart()

  return (
    <header className='header'>
      <Link to='/'>
        <div className='header_left'>
          <img src='img/logo.png' alt='#' width={40} height={40} />
          <div className='header_left__info'>
            <h3>REACT MOUSE</h3>
            <p>Магазин игровых мышек</p>
          </div>
        </div>
      </Link>
      <ul className='header_right'>
        <li onClick={onClickCart}>
          <img src='img/cart.svg' alt='#' width={18} height={17} />
          <span>{totalPrice} грн.</span>
        </li>
        <li>
          <Link to='/favourite'>
            <img src='img/favourite.svg' alt='#' width={21} height={19} />
          </Link>
        </li>
        <li>
          <Link to='/orders'>
            <img src='img/user.svg' alt='#' width={20} height={20} />
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default Header
