import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Survey1 from '../components/Survey1';
import Survey2 from '../components/Survey2';
import Survey3 from '../components/Survey3';
import Survey4 from '../components/Survey4';
import Survey5 from '../components/Survey5';
import axios from 'axios';

export default function QuestionPage () {
  // 각 질문 페이지에서 받은 결과를 모은다
  // 페이지 분할을 어떻게 하냐?
  // null 이라면 페이지를 띄운다
  // 지금까지의 결과로 검색을 한다면 서버에 요청이 들어간다 이 페이지에서 state로 값을 가지고 있고 각 페이지 별로 누른 결과 값이 전달이 된다.
  // const [surveyResult, setServeyResult] = useState({ isSpicy : null, isMeat : null, isSoup : null, isType : null, isStyle : null });
  const [ spicy, setSpicy ] = useState();
  const [ meat, setMeat ] = useState();
  const [ soup, setSoup ] = useState();
  const [ type, setType ] = useState();
  const [ style, setStyle ] = useState();
  const navigate = useNavigate();

  const requestSurveyResult = () => {
    const result = {spicy, meat, soup, type, style};
    let query = '';
    for( const key in result ) {
      if(result[key] === undefined) {
        delete result[key]
      }
      else {
        query += key + '=' + result[key] + '&'
      }
    }
    query = query.slice(0, query.length - 1);
    // axios({
    //   method: 'GET',
    //   url: `http://localhost:4000/menu?${query}`
    // })
    // .then((result) => {
      navigate('/result', { state : query });
    // })
  }  

  if ( spicy === undefined ) {
    return < Survey1 setSpicy={setSpicy} requestSurveyResult={requestSurveyResult} />
  } 
  if ( soup === undefined ) {
    return <Survey2 setSoup={setSoup} requestSurveyResult={requestSurveyResult} />
  }  
  if ( meat === undefined ) {
    return <Survey3 setMeat={setMeat} requestSurveyResult={requestSurveyResult} />
  }  
  if ( style === undefined ) {
    return <Survey4 setStyle={setStyle} requestSurveyResult={requestSurveyResult} />
  } 
  if ( type === undefined ) {
    return <Survey5 setType={setType} requestSurveyResult={requestSurveyResult} />
  }
}
