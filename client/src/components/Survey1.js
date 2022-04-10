import React from 'react';

export default function Survey1 ({ setSpicy, requestSurveyResult }) {

  return (
    <>
      <div>
        <div>1. 매운 메뉴가 끌리시나요?</div>
        <br />
        <button onClick={() => setSpicy(1)}>
          네
        </button>
        <button onClick={() => setSpicy(0)}>
          아니요
        </button>
        <br />
        <button onClick={() => requestSurveyResult()}>
          지금까지 결과로 메뉴랑 식당 찾기
        </button>
      </div>
    </>
  );
}
