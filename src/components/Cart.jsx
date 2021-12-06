import React from 'react'
import Info from './Info'
import axios from 'axios'
import { useCart } from '../hooks/useCart'

const Cart = ({ onCloseCart, onRemove, opened }) => {
  const { cartItems, setCartItems, totalPrice } = useCart()
  const [orderId, setOrderId] = React.useState(null)
  const [isOrderComplete, setIsOrderComplete] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const onClickOrder = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.post('http://localhost:3000/orders', {
        items: cartItems,
      })
      setOrderId(data.id)
      setIsOrderComplete(true)
      setCartItems([])
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i]
        await axios.delete(`http://localhost:3000/cart/${item.id}`)
      }
    } catch (error) {
      alert('Не удалось создать заказ!')
    }
    setIsLoading(false)
  }

  return (
    <div
      onClick={onCloseCart}
      className={opened ? 'overlay visible' : 'overlay'}>
      <div onClick={e => e.stopPropagation()} className='drawer'>
        <div className='drawer_header'>
          <h2>Корзина</h2>
          <button onClick={onCloseCart} className='button button-close'>
            <span></span>
          </button>
        </div>
        {cartItems.length > 0 ? (
          <div className='drawer_body'>
            <div className='cart'>
              {cartItems.map(obj => (
                <div key={obj.id} className='cart_item'>
                  <img src={obj.image} height={70} width={55} alt='#' />
                  <div className='cart_item__info'>
                    <div>{obj.name}</div>
                    <b>{obj.price} грн.</b>
                  </div>
                  <button
                    onClick={() => onRemove(obj.id)}
                    className='button button-close'>
                    <span></span>
                  </button>
                </div>
              ))}
            </div>
            <div className='drawer_footer'>
              <div className='drawer_footer__total'>
                <span>Сумма:</span>
                <div></div>
                <b>{totalPrice} грн.</b>
              </div>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className='button-green'>
                Оформить заказ
                <img src='img/arrow.svg' alt='#' />
              </button>
            </div>
          </div>
        ) : (
          <Info
            imageUrl={
              isOrderComplete ? 'img/orderCompleted.jpg' : 'img/cartEmpty.jpg'
            }
            title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
            text={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : 'Добавьте хотя бы один товар, чтобы сделать заказ.'
            }
            onClose={onCloseCart}
          />
        )}
      </div>
    </div>
  )
}

export default Cart
