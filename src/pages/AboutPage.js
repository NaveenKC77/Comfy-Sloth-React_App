import React from "react";
import styled from "styled-components";
import { PageHero } from "../components";
import aboutImg from "../assets/hero-bcg.jpeg";

const AboutPage = () => {
  return (
    <>
      <PageHero title="About"></PageHero>
      <section className="section">
        <Wrapper className="section-center">
          <img src={aboutImg} alt="" />

          <article>
            <div className="title">
              <h1>Our Story</h1>
              <div className="underline"></div>
            </div>

            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui, ad
              autem! Animi officiis vitae ratione cupiditate sapiente eum et
              sequi expedita at porro consequuntur voluptatem, saepe autem
              asperiores esse doloribus recusandae hic sunt culpa magni fugiat!
              Possimus nostrum repellat doloremque explicabo tenetur facilis
              quas harum? Pariatur illum ipsum mollitia quibusdam.
            </p>
          </article>
        </Wrapper>
      </section>
    </>
  );
};

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;
export default AboutPage;
