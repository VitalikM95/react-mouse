import Card from './../components/Card'

const Home = ({
  items,
  searchValue,
  isLoading,
  setSearchValue,
  onChangeInput,
  addToCart,
  addToFavourite,
}) => {
  const renderItems = () => {
    const filteredItems = items.filter(elem =>
      elem.name.toLowerCase().includes(searchValue.toLowerCase())
    )
    return (isLoading ? [...Array(8)] : filteredItems).map((elem, index) => (
      <Card
        key={index}
        {...elem}
        onAdd={obj => addToCart(obj)}
        onFavourite={obj => addToFavourite(obj)}
        loading={isLoading}
      />
    ))
  }
  return (
    <div className='content'>
      <div className='content_header'>
        <h1>
          {searchValue ? `Поиск по запросу: ${searchValue}` : 'Все мышки'}
        </h1>
        <div className='search_block'>
          <img src='img/search.svg' alt='#' width={14} height={14} />
          <input
            onChange={onChangeInput}
            value={searchValue}
            placeholder='Поиск...'
          />
          {searchValue && (
            <button
              onClick={() => setSearchValue('')}
              className='button button-close'
              alt='#'>
              <span></span>
            </button>
          )}
        </div>
      </div>

      <div className='content_items'>{renderItems()}</div>
    </div>
  )
}

export default Home
