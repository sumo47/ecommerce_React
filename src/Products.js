import React from 'react'
import styled from 'styled-components'
import ProductList from './components/ProductList'
import Sort from './components/Sort'
import FilterSection from './components/FilterSection'
import { useGlobalFilterProvider } from './components/context/Filter_Context'

function Products() {
  const { filter_Products } = useGlobalFilterProvider()
  console.log("Filter_Product", filter_Products)
  return (
    <Wrapper>
      <div className='container grid grid-filter-column'>
      <div>
        <FilterSection />
      </div>
      <section className="product-view--short">
        <div className="sort-filter">
          <Sort />
        </div>
        <div className="main-product">
          <ProductList />
        </div>
      </section>

    </div>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  .grid-filter-column {
    grid-template-columns: 0.2fr 1fr;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-filter-column {
      grid-template-columns: 1fr;
    }
  }
`;

export default Products
