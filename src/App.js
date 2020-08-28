import React, { useState } from 'react';
import styled from 'styled-components'
// services
import POSTINGS from './services/postings'
// components
import Article from './components/Article'
import Filter from './components/Filter'

function App() {
  const [postingList, setPostingList] = useState(POSTINGS)
  const [operationType, setOperationType] = useState('Todos')

  const directionHandler = (direction) => {
    const newPostingList = POSTINGS.filter(post =>
      post.posting_location.address.toLocaleLowerCase().indexOf(direction.toLocaleLowerCase()) != -1 ||
      post.posting_location.zone.toLocaleLowerCase().indexOf(direction.toLocaleLowerCase()) != -1 ||
      post.posting_location.city.toLocaleLowerCase().indexOf(direction.toLocaleLowerCase()) != -1
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
            .map((post) =>
              <Article
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
              />
            )
        }
      </section>

    </GlobalStyles>
  );
}

const GlobalStyles = styled.main`
  position: relative;
  min-height: 100vh;
  background-color: #f0f0f0;
  padding: 30px;
  display: flex;
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
