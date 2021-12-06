import React from 'react'
import { Route } from 'react-router-dom'
import axios from 'axios'
import Header from './components/Header.jsx'
import Cart from './components/Cart'
import Home from './pages/Home'
import Favourite from './pages/Favourite'
import AppContext from './context'
import Orders from './pages/Orders.jsx'

function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [favouriteItems, setFavouriteItems] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favouriteResponse, itemsResponse] =
          await Promise.all([
            axios.get('http://localhost:3000/cart'),
            axios.get('http://localhost:3000/favourite'),
            axios.get('http://localhost:3000/items'),
          ])

        setIsLoading(false)

        setCartItems(cartResponse.data)
        setFavouriteItems(favouriteResponse.data)
        setItems(itemsResponse.data)
      } catch (error) {
        alert('Ошибка запроса данных!')
      }
    }
    fetchData()
  }, [])

  const onAddToCart = async obj => {
    try {
      const findCartItem = cartItems.find(
        cartObj => Number(cartObj.id) === Number(obj.id)
      )
      if (findCartItem) {
        setCartItems(prev =>
          prev.filter(item => Number(item.id) !== Number(obj.id))
        )
        await axios.delete(`http://localhost:3000/cart/${findCartItem.id}`)
      } else {
        setCartItems(prev => [...prev, obj])
        const { data } = await axios.post('http://localhost:3000/cart', obj)
        setCartItems(prev =>
          prev.map(item => {
            if (item.id === data.id) {
              return {
                ...item,
                id: data.id,
              }
            }
            return item
          })
        )
      }
    } catch (error) {
      alert('Ошибка добавления в корзину!')
    }
  }

  const onAddToFavourite = async obj => {
    try {
      const findFavItem = favouriteItems.find(
        favObj => Number(favObj.id) === Number(obj.id)
      )
      if (findFavItem) {
        setFavouriteItems(prev =>
          prev.filter(item => Number(item.id) !== Number(obj.id))
        )
        await axios.delete(`http://localhost:3000/favourite/${findFavItem.id}`)
      } else {
        setFavouriteItems(prev => [...prev, obj])
        const { data } = await axios.post(
          'http://localhost:3000/favourite',
          obj
        )
        setFavouriteItems(prev =>
          prev.map(item => {
            if (item.id === data.perentId) {
              return {
                ...item,
                id: data.id,
              }
            }
            return item
          })
        )
      }
    } catch (error) {
      alert('Ошибка добавления в закладки!')
    }
  }

  const onRemoveItem = id => {
    try {
      axios.delete(`http://localhost:3000/cart/${id}`)
      setCartItems(prev => prev.filter(item => Number(item.id) !== Number(id)))
    } catch (error) {
      alert('Ошибка удаления с корзины!')
    }
  }

  const isItemAdded = id => {
    return cartItems.some(obj => Number(obj.id) === Number(id))
  }

  const isItemFavorited = id => {
    return favouriteItems.some(obj => Number(obj.id) === Number(id))
  }

  const onChangeInput = e => setSearchValue(e.target.value)

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favouriteItems,
        isItemAdded,
        isItemFavorited,
        setCartOpened,
        setCartItems,
      }}>
      <div className='wrapper'>
        <Cart
          items={cartItems}
          onCloseCart={() => setCartOpened(!cartOpened)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />
        <Header onClickCart={() => setCartOpened(!cartOpened)} />
        <Route path='/' exact>
          <Home
            items={items}
            cartItems={cartItems}
            favouriteItems={favouriteItems}
            searchValue={searchValue}
            isLoading={isLoading}
            setSearchValue={setSearchValue}
            onChangeInput={onChangeInput}
            addToCart={onAddToCart}
            addToFavourite={onAddToFavourite}
          />
        </Route>
        <Route path='/favourite' exact>
          <Favourite
            favouriteItems={favouriteItems}
            addToCart={onAddToCart}
            addToFavourite={onAddToFavourite}
          />
        </Route>
        <Route path='/orders' exact>
          <Orders />
        </Route>
      </div>
    </AppContext.Provider>
  )
}

export default App
