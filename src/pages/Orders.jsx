import axios from 'axios'
import React from 'react'
import Card from '../components/Card'
import Info from '../components/Info'

const Orders = () => {
  const [orders, setOrders] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          'https://react-mouse.herokuapp.com/orders'
        )
        setOrders(data)
        setIsLoading(false)
      } catch (error) {
        alert('Ошибка при запросе заказов!')
      }
    }
    fetchData()
  }, [])

  return (
    <div className='content'>
      <div className='content_header'>
        <h1>Мои заказы</h1>
      </div>
      {orders.length > 0 ? (
        <div className='content_items content_items-order'>
          {orders.map((order, index) => (
            <div key={index} className='order'>
              <h3 className='order_header'>Заказ №{order.id}</h3>
              <div className='order_cards'>
                {order.items.map((arr, index) => (
                  <Card key={index} loading={isLoading} {...arr} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Info
          imageUrl={'img/orderEmpty.png'}
          title={'Заказов нет :('}
          text={'Вы не оформляли заказы'}
        />
      )}
    </div>
  )
}

export default Orders
