import React from 'react'
import { useGlobalFilterProvider } from './context/Filter_Context'
import GridView from './GridView'
import ListView from './ListView'

function ProductList() {
  const { filter_Products,  grid_view } = useGlobalFilterProvider()

  if (grid_view) {
    return <GridView products={filter_Products} />
  } else {
    return <ListView products={filter_Products} />
  }
}

export default ProductList
