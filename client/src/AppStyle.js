import styled from 'styled-components';

export const WholeContainer = styled.div`
  margin-top: 5%;
  height: 800px;
  width: 1300px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 500px) {
    margin-top: 0%;
    height: 100%;
    width: 500px;
  }
`;

export const UserInfoContainer = styled.div`
  height: 10%;
  width: 100%;
  background: skyblue;
  display: flex;
  align-items: center;
  flex-direction: center;
  justify-content: center;

  @media screen and (max-width: 500px) {
    height: 100%;
    width: 100%;
  }
`;

export const PageContainer = styled.div`
  height: 100%;
  width: 100%;
  background: red;
  display: flex;
  align-items: center;
  flex-direction: center;
  justify-content: center;

  @media screen and (max-width: 500px) {
    height: 100%;
    width: 100%;
    padding-bottom: 10px;
  }
`;