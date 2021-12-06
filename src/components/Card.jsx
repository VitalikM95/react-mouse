import React from 'react'
import ContentLoader from 'react-content-loader'
import AppContext from '../context'

const Card = ({
  id,
  name,
  image,
  price,
  onAdd,
  onFavourite,
  loading = false,
}) => {
  const { isItemAdded, isItemFavorited } = React.useContext(AppContext)
  const obj = { id, name, image, price }
  const onClickFavourite = () => {
    onFavourite(obj)
  }
  const onClickAdd = () => {
    onAdd(obj)
  }
  return (
    <div className='card'>
      {loading ? (
        <ContentLoader
          speed={2}
          width={200}
          height={220}
          viewBox='0 0 210 260'
          backgroundColor='#f3f3f3'
          foregroundColor='#ecebeb'>
          <rect x='0' y='10' rx='10' ry='10' width='150' height='120' />
          <rect x='0' y='148' rx='3' ry='3' width='150' height='17' />
          <rect x='0' y='180' rx='3' ry='3' width='93' height='17' />
          <rect x='0' y='228' rx='8' ry='8' width='80' height='25' />
          <rect x='118' y='220' rx='8' ry='8' width='34' height='34' />
        </ContentLoader>
      ) : (
        <>
          {onFavourite && (
            <button
              onClick={onClickFavourite}
              className={
                isItemFavorited(id)
                  ? 'button button-liked'
                  : 'button button-unliked'
              }></button>
          )}
          <img src={image} alt='#' width={65} height={105} />
          <h5>{name}</h5>
          <div className='card_bottom'>
            <div className='card_price'>
              <div>Цена:</div>
              <b>{price} грн.</b>
            </div>
            {onAdd && (
              <button
                onClick={onClickAdd}
                className={
                  isItemAdded(id) ? 'button button-added' : 'button button-add'
                }></button>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Card
