import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const AuthWrapper = ({ children }) => {
  const { isLoading, isError } = useAuth0();

  if (isLoading) {
    return (
      <Wrapper>
        <h2>Loading</h2>
      </Wrapper>
    );
  }
  if (isError) {
    return (
      <Wrapper>
        <h2>Error</h2>
      </Wrapper>
    );
  }
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
`;

export default AuthWrapper;
