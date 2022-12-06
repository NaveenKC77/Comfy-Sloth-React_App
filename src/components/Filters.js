import React, { useEffect } from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { formatPrice } from "../utils/helpers";
import { FaCheck } from "react-icons/fa";

const Filters = () => {
  const {
    allProducts,
    filteredProducts,
    filters,
    updateFilters,
    clearFilters,
  } = useFilterContext();

  const {
    category,
    color,
    company,
    maxPrice,
    minPrice,
    price,
    searchTag,
    shipping,
  } = filters;

  const categories = Array.from(
    new Set(
      allProducts.map((product) => {
        return product.category;
      })
    )
  );
  const companies = Array.from(
    new Set(
      allProducts.map((product) => {
        return product.company;
      })
    )
  );
  const colors = Array.from(
    new Set(
      allProducts
        .map((product) => {
          return [...product.colors];
        })
        .flat()
    )
  );
  useEffect(() => {}, [filters, filteredProducts]);

  return (
    <Wrapper className="section">
      <div className="content">
        <form action="" onSubmit={(e) => e.preventDefault()}>
          {/* //search */}
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="search-input"
              name="searchTag"
              value={searchTag}
              onChange={updateFilters}
            />
          </div>

          <div className="form-control">
            <h5>Category</h5>
            <button
              className={`${category === "all" ? "all-btn active" : "all-btn"}`}
              name="category"
              onClick={updateFilters}
            >
              all
            </button>
            {categories.map((category) => {
              return (
                <button key={category} onClick={updateFilters} name="category">
                  {category}
                </button>
              );
            })}
          </div>

          <div className="form-control">
            <h5>Company</h5>
            <select
              name="company"
              value={company}
              onChange={updateFilters}
              id=""
            >
              <option key="All" value="all">
                All
              </option>
              {companies.map((company) => {
                return (
                  <option key={company} value={company}>
                    {company}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-control">
            <h5>Colors</h5>
            <div className="colors">
              <button
                name="color"
                data-color="all"
                onClick={updateFilters}
                className={` ${color === "all" ? "all-btn active" : "all-btn"}`}
              >
                All
              </button>
              {colors.map((c) => {
                return (
                  <button
                    key={c}
                    style={{ backgroundColor: `${c}` }}
                    className={`${
                      color === c ? "color-btn active" : "color-btn"
                    }`}
                    name="color"
                    data-color={c}
                    onClick={updateFilters}
                  >
                    {c === color ? <FaCheck></FaCheck> : null}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="form-control">
            <h5>Price</h5>
            <p className="price">${price}</p>
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              className="slider"
              id="myRange"
              value={price}
              onChange={updateFilters}
              name="price"
            ></input>
          </div>

          <div className="form-control">
            <h5> Free Shipping</h5>
            <input
              name="shipping"
              type="checkbox"
              checked={shipping}
              onChange={updateFilters}
            ></input>
          </div>

          <button className="clear-btn" onClick={clearFilters}>
            Clear Filters
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
