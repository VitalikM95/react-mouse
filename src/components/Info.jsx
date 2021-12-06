import React from 'react'
import { Link } from 'react-router-dom'

const Info = ({ imageUrl, title, text, onClose }) => {
  return (
    <div className='info'>
      <img src={imageUrl} width={120} alt='#' />
      <h3>{title}</h3>
      <div>{text}</div>
      {onClose ? (
        <button onClick={onClose} className='button-green'>
          <img src='img/arrow.svg' alt='#' />
          Вернуться назад
        </button>
      ) : (
        <Link to='/'>
          <button className='button-green'>
            <img src='img/arrow.svg' alt='#' />
            Вернуться назад
          </button>
        </Link>
      )}
    </div>
  )
}

export default Info
