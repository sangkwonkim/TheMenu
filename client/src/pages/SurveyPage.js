import React, { useState } from 'react';
import Survey1 from '../components/Survey1';
import Survey2 from '../components/Survey2';
import Survey3 from '../components/Survey3';
import Survey4 from '../components/Survey4';
import Survey5 from '../components/Survey5';

export default function QuestionPage () {
  // 각 질문 페이지에서 받은 결과를 모은다
  // 페이지 분할을 어떻게 하냐?
  // null 이라면 페이지를 띄운다
  // 지금까지의 결과로 검색을 한다면 서버에 요청이 들어간다 이 페이지에서 state로 값을 가지고 있고 각 페이지 별로 누른 결과 값이 전달이 된다.
  // const [surveyResult, setServeyResult] = useState({ isSpicy : null, isMeat : null, isSoup : null, isType : null, isStyle : null });
  const [ spicy, setSpicy ] = useState({ isSpicy : null });
  const [ meat, setMeat ] = useState({ isMeat : null });
  const [ soup, setSoup ] = useState({ isSoup : null });
  const [ type, setType ] = useState({ isType : null });
  const [ style, setStyle ] = useState({ isStyle : null });

  if ( spicy.isSpicy === null ) {
    return < Survey1 setSpicy={setSpicy} />
  } 
  if ( soup.isSoup === null ) {
    return <Survey2 setSoup={setSoup} />
  }  
  if ( meat.isMeat === null ) {
    return <Survey3 setMeat={setMeat} />
  }  
  if ( style.isStyle === null ) {
    return <Survey4 setStyle={setStyle} />
  } 
  if ( type.isType === null ) {
    return <Survey5 setType={setType} />
  }
}