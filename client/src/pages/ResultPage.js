import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

export const MenuContainer = styled.div`
background-color: whitesmoke;
border: 1px solid ${props => props.theme.main};
`;

export default function ResultPage () {
  const { state } = useLocation();

  return (
    <>
      {state.map((data) => {
        return (
          <div>
            <MenuContainer>
              {data.name}
            </MenuContainer>
            <br />
          </div>
      )})}
    </>
  );
}
