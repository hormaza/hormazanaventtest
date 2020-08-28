import React from 'react';
import postingList from './services/postings'
// components
import Article from './components/Article'
import styled from 'styled-components'

function App() {
  return (
    <GlobalStyles>
      {
        postingList.map((post) =>
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
    </GlobalStyles>
  );
}

const GlobalStyles = styled.main`
  position: relative;
  min-height: 100vh;
  background-color: #f0f0f0;
  padding: 30px;
`

export default App;
