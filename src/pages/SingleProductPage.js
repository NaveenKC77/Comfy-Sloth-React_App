import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
import { single_product_url as url } from "../utils/constants";
import { formatPrice } from "../utils/helpers";
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from "../components";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SingleProductPage = () => {
  const { id } = useParams();
  const {
    getSingleProduct,
    singleProduct: product,
    is_single_Error,
    is_single_Loading,
  } = useProductsContext();
  const { navigate } = useNavigate();

  useEffect(() => {
    getSingleProduct(`${url}${id}`);
    //eslint-disable-next-line
  }, [id]);
  useEffect(() => {
    if (is_single_Error) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
    // eslint-disable-next-line
  }, [is_single_Error]);

  if (is_single_Loading) {
    return (
      <Wrapper className="section">
        <Loading></Loading>
      </Wrapper>
    );
  }
  if (is_single_Error) {
    return (
      <Wrapper className="section">
        <Error></Error>
      </Wrapper>
    );
  }
  const {
    id: sku,
    colors,
    company,
    price,
    name,
    images,
    description,
    stars,
    reviews,
    stock,
  } = product;

  return (
    <Wrapper>
      <PageHero title={name} product></PageHero>
      <div className="section section-center page">
        <Link to="/products" className="btn">
          Back to products
        </Link>
        <section className="product-center">
          <div>
            <ProductImages images={images}></ProductImages>
          </div>

          <div className="content">
            <h2>{name}</h2>
            <Stars stars={stars} reviews={reviews}></Stars>
            <h4 className="price">{formatPrice(price) || "Not assigned"}</h4>
            <p>{description}</p>

            <div className="info">
              <p>
                <span>Available:</span>
              </p>
              <p>{`${stock > 0 ? "In-stock" : "Out of stock"}`}</p>
            </div>
            <div className="info">
              <p>
                <span>SKU</span>
              </p>
              <p>{sku}</p>
            </div>
            <div className="info">
              <p>
                <span>Brand:</span>
              </p>
              <p>{company}</p>
            </div>
            <hr />
            {stock >= 1 && <AddToCart product={product}></AddToCart>}
          </div>
        </section>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }
  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
