import React from 'react';

export default function Survey4 ({ setStyle, requestSurveyResult }) {
  return (
    <>
      <div>
        <div>4. 어떤 종류의 메뉴가 끌리시나요?</div>
        <br />
        <button onClick={() => setStyle('korean')}>
          한식
        </button>
        <button onClick={() => setStyle('chinese')}>
          중식
        </button>
        <button onClick={() => setStyle('japanese')}>
          일식
        </button>
        <button onClick={() => setStyle('western')}>
          양식
        </button>
        <button onClick={() => setStyle('others')}>
          기타 (분식 등)
        </button>
        <br />
        <button onClick={() => requestSurveyResult()}>
          지금까지 결과로 메뉴랑 식당 찾기
        </button>
      </div>
    </>
  );
}
