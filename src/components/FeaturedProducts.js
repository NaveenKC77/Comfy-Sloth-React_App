import React from "react";
import { useProductsContext } from "../context/products_context";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Error from "./Error";
import Loading from "./Loading";
import Product from "./Product";

const FeaturedProducts = () => {
  const { isLoading, isError, products } = useProductsContext();
  if (isLoading) {
    return (
      <Wrapper className="section">
        <Loading></Loading>
      </Wrapper>
    );
  }
  if (isError) {
    return (
      <Wrapper className="section">
        <Error></Error>
      </Wrapper>
    );
  }
  return (
    <Wrapper className="section">
      <div className="title">
        <h1>Featured products</h1>
        <div className="underline"></div>
      </div>

      <section className="section-center featured">
        {products.slice(0, 3).map((product) => {
          const { id } = product;
          return <Product key={id} {...product}></Product>;
        })}
      </section>

      <Link to="/products">
        <button className="btn">All Products </button>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 160px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`;

export default FeaturedProducts;
