import React from 'react';

export default function Survey2 ({ setSoup, requestSurveyResult }) {
  return (
    <>
      <div>
        <div>2. 국물이 있는 메뉴가 끌리시나요?</div>
        <br />
        <button onClick={() => setSoup(1)}>
          네
        </button>
        <button onClick={() => setSoup(0)}>
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
