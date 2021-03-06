import React, { useState } from 'react';
import styled from 'styled-components'
// services
import POSTINGS from './services/postings'
// components
import Article from './components/Article'
import Filter from './components/Filter'

const KEY_FAVORITES = 'userFavorites'
const getFavoritesLS = () => JSON.parse(localStorage.getItem(KEY_FAVORITES) || '[]')
const addToFavoritesLS = (id) => {
  const favorites = getFavoritesLS()
  const newFavorites = favorites.indexOf(id) > -1 ? [...favorites] : [...favorites, id]
  localStorage.setItem(KEY_FAVORITES, JSON.stringify(newFavorites))
}
const removeToFavoritesLS = (id) => {
  const favorites = getFavoritesLS()
  const newFavorites = favorites.filter(fav => fav !== id)
  localStorage.setItem(KEY_FAVORITES, JSON.stringify(newFavorites))
}
function App() {
  const [postingList, setPostingList] = useState(POSTINGS)
  const [operationType, setOperationType] = useState('Todos')
  const [userFavorites, setUserFavorites] = useState(getFavoritesLS())

  const addToFavorites = (id) => {
    addToFavoritesLS(id)
    setUserFavorites(getFavoritesLS())
  }

  const removeToFavorites = (id) => {
    removeToFavoritesLS(id)
    setUserFavorites(getFavoritesLS())
  }

  const directionHandler = (direction) => {
    const newPostingList = POSTINGS.filter(post =>
      post.posting_location.address.toLocaleLowerCase().indexOf(direction.toLocaleLowerCase()) !== -1 ||
      post.posting_location.zone.toLocaleLowerCase().indexOf(direction.toLocaleLowerCase()) !== -1 ||
      post.posting_location.city.toLocaleLowerCase().indexOf(direction.toLocaleLowerCase()) !== -1
    )
    setPostingList(newPostingList)
  }

  const getOperationTypeId = type => type === 'Alquiler' ? 1 :
    type === 'Comprar' ? 2 :
      type === 'Temporal' ? 3 :
        0

  const operationTypeHandler = (type) => {
    const newPostingList = POSTINGS.filter(post =>
      post.operation_type.operation_type_id === getOperationTypeId(type) ||
      getOperationTypeId(type) === 0)
    setOperationType(type)
    setPostingList(newPostingList)
  }
  const compareFunction = (curr, next) => curr.publication_plan === 'SUPERHIGHLIGHTED' ? -1 :
    curr.publication_plan === 'HIGHLIGHTED' && next.publication_plan !== 'SUPERHIGHLIGHTED' ? -1 :
      0
  return (
    <GlobalStyles>
      <div className='container'>
        <section id='filter'>
          <Filter
            operationType={operationType}
            onChangeDirection={directionHandler}
            onOperationTypeChange={operationTypeHandler} />
        </section>
        <section id='results'>
          {
            postingList
              .sort(compareFunction)
              .map((post, i) =>
                <Article
                  key={post.posting_id + i}
                  title={post.title}
                  address={post.posting_location.address}
                  zone={post.posting_location.zone}
                  city={post.posting_location.city}
                  description={post.posting_description}
                  publishDate={post.publish_date}
                  picture={post.posting_picture}
                  price={post.posting_prices[0].price.amount}
                  currency={post.posting_prices[0].price.currency}
                  plan={post.publication_plan}
                  expenses={
                    post.posting_prices[0].expenses &&
                    post.posting_prices[0].expenses.amount
                  }
                  isOnFavorites={userFavorites.find(id => id === post.posting_id)}
                  setIsOnFavorites={
                    (status) => status ?
                      addToFavorites(post.posting_id) :
                      removeToFavorites(post.posting_id)
                  } />
              )
          }
        </section>
      </div>

    </GlobalStyles>
  );
}

const GlobalStyles = styled.main`
  position: relative;
  min-height: 100vh;
  background-color: #f0f0f0;
  display: flex;
  width: 100%;
  padding: 30px;
  
  .container {
    display: flex;
    max-width: 1500px;
    width: 100%;
    margin: 0 auto;

  }
  #filter{
    flex-grow: 1;
  }

  #results{
    flex-grow: 2;
  }
  section {
    margin: 0 5px;
  }
`

export default App;
