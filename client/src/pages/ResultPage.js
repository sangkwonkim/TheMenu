import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const MenuContainer = styled.button`
background-color: whitesmoke;
border: 1px solid ${props => props.theme.main};
`;

export default function ResultPage () {
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleClickResult = (e) => {
    navigate('/map', { state : e.target.textContent })
  }

  return (
    <div>
      {state.map((data) => {
        return (
          <div>
            <MenuContainer onClick ={handleClickResult}>
              {data.name}
            </MenuContainer>
          </div>
      )})}
    </div>
  );
}
