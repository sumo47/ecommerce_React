import React from 'react'
import styled from "styled-components"
import { useGlobalFilterProvider } from './context/Filter_Context'
import { FaCheck } from "react-icons/fa";
import FormatPrice from '../Helpers/FormatPrice'
import { Button } from '../styles/Button';



function FilterSection() {
  const { filters: { text, colors, price, maxPrice, minPrice }, updateFilterValue, all_Products,clearFilterValue } = useGlobalFilterProvider()
  // console.log(maxPrice, minPrice, price)
  //To get unique data for all products
  const getUniqueData = (data, property) => {
    let newVal = data.map((curElem) => {
      return curElem[property]
    })

    if (property === "colors") {
      // return (newVal = ["all", ...new Set([].concat(...newVal))]);
      return newVal = ['all', ...new Set(newVal.flat())];
    }
    else {
      return (newVal = ["all", ...new Set(newVal)])
    }

  }

  //For category
  const categoryDataOnly = getUniqueData(all_Products, "category")
  const companyDataOnly = getUniqueData(all_Products, "company")
  const colorsDataOnly = getUniqueData(all_Products, "colors")
  // console.log(colorsDataOnly)
  return (
    <Wrapper>
      <div className="filter-search">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="text"
            placeholder="Search"
            value={text}
            onChange={updateFilterValue}
          />
        </form>
      </div>

      <div className="filter-category">
        <h3>category</h3>
        <div>
          {categoryDataOnly.map((curElem, index) => {
            return (
              <button
                key={index}
                type='button'
                name='category'
                value={curElem}
                onClick={updateFilterValue}
              >
                {curElem}
              </button>
            )
          })}
        </div>
      </div>
      <div className="filter-company">
        <h3>Company</h3>
        <form action="#">
          <select name="company" className='filter-company--select' id="company" onClick={updateFilterValue}>
            {
              companyDataOnly.map((curElem, index) => {
                return (
                  <option key={index} value={curElem} name="company">
                    {curElem}
                  </option>
                )
              })
            }
          </select>
        </form>
      </div>
      <div className="filter-colors colors">
        <h3>Colors</h3>
        <div className="filter-color-style">
          {
            colorsDataOnly.map((curElem, index) => {
              if (curElem === "all") {
                return (
                  <button className='color-all--style' key={index} name='colors' value={curElem} type='button' onClick={updateFilterValue}>
                    All
                  </button>
                )
              } else {
                return (
                  <button className={colors === curElem ? "btnStyle active" : "btnStyle"} key={index} name='colors' value={curElem} type='button' style={{ backgroundColor: curElem }} onClick={updateFilterValue}>
                    {colors === curElem ? <FaCheck className="checkStyle" /> : null}
                  </button>
                )
              }
            })
          }
        </div>
      </div>
      <div className="filter_price">
        <h3>Price</h3>
        <p><FormatPrice price={price} /></p>
        <input type="range" name='price' step="10000" min={minPrice} max={maxPrice} value={price} onChange={updateFilterValue} />
      </div>
      <div className="filter-clear">
        <Button className='btn' onClick={clearFilterValue}>
          Clear filters
        </Button>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  h3 {
    padding: 2rem 0;
    font-size: bold;
  }

  .filter-search {
    input {
      padding: 0.6rem 1rem;
      width: 80%;
    }
  }

  .filter-category {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.4rem;

      button {
        border: none;
        background-color: ${({ theme }) => theme.colors.white};
        text-transform: capitalize;
        cursor: pointer;

        &:hover {
          color: ${({ theme }) => theme.colors.btn};
        }
      }

      .active {
        border-bottom: 1px solid #000;
        color: ${({ theme }) => theme.colors.btn};
      }
    }
  }

  .filter-company--select {
    padding: 0.3rem 1.2rem;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    text-transform: capitalize;
  }

  .filter-color-style {
    display: flex;
    justify-content: center;
  }

  .color-all--style {
    background-color: transparent;
    text-transform: capitalize;
    border: none;
    cursor: pointer;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
    width: 2.5rem;
    height: 2.5rem;
  }

  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }

  .filter_price {
    input {
      margin: 0.5rem 0 1rem 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
    }
  }

  .filter-shipping {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .filter-clear .btn {
    background-color: #ec7063;
    color: #000;
  }
`;
export default FilterSection
