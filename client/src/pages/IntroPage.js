import React from 'react';
import { Link } from 'react-router-dom';
import { MainContainer } from './IntroPageStyle';

export default function IntroPage () {
  return (
    <>
      <MainContainer>
        <div>점심 메뉴 고르기</div>
        <span>직장인들의 영원한 숙제 점심 메뉴!</span>
        <span>the Menu를 통해서 원하는 메뉴, 근처 식당까지 한 번에 찾아보세요!</span>
        <div>
          <button>
            <Link to='/question'>비회원 메뉴 고르기</Link>
          </button>
          <button>
            <Link to='/login'>회원 로그인</Link>
          </button>
        </div>
      </MainContainer>
    </>
  );
}
