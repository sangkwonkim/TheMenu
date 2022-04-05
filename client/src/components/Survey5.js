import React from 'react';

export default function Survey5 ({ setType }) {
  return (
    <>
      <div>
        <div>5. 어떤 종류의 메뉴가 끌리시나요?</div>
        <br />
        <button onClick={() => setType('rice')}>
          밥
        </button>
        <button onClick={() => setType('noodle')}>
          면
        </button>
        <button onClick={() => setType('bread')}>
          빵
        </button>
        <button onClick={() => setType('others')}>
          기타(샐러드 등)
        </button>
        <br />
        <button>
          지금까지 결과로 메뉴랑 식당 찾기
        </button>
      </div>
    </>
  );
}