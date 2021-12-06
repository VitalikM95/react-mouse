import React from 'react'
import Info from '../components/Info'
import Card from './../components/Card'

const Favourite = ({ addToCart, addToFavourite, favouriteItems }) => {
  return (
    <div className='content'>
      <div className='content_header'>
        <h1>Мои закладки</h1>
      </div>
      {favouriteItems.length > 0 ? (
        <div className='content_items'>
          {favouriteItems.map((item, index) => (
            <Card
              key={index}
              {...item}
              onAdd={obj => addToCart(obj)}
              onFavourite={obj => addToFavourite(obj)}
            />
          ))}
        </div>
      ) : (
        <Info
          imageUrl={'img/favouriteEmpty.png'}
          title={'Закладок нет :('}
          text={'Вы ничего не добавляли в закладки'}
        />
      )}
    </div>
  )
}

export default Favourite
