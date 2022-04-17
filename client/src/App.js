import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { WholeContainer } from './AppStyle.js';
import LoginPage from './pages/LoginPage';
import IntroPage from './pages/IntroPage';
import MapPage from './pages/MapPage';
import MyPage from './pages/MyPage';
import SurveyPage from './pages/SurveyPage';
import SignupPage from './pages/SignupPage';
import ResultPage from './pages/ResultPage.js';
import Kakao from './pages/kakao'

function App () {
  const [userInfo, setUserInfo] = useState({email : '', nickName : ''})

  return (
    <WholeContainer>
      <Routes>
        <Route path='/' element={<IntroPage />} />
        <Route path='/survey' element={<SurveyPage userInfo={userInfo} />} />
        <Route path='/kakao' element={<Kakao userInfo={userInfo} />} />
        <Route path='/login' element={<LoginPage setUserInfo={setUserInfo} />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/mypage' element={<MyPage userInfo={userInfo} setUserInfo={setUserInfo} />} />
        <Route path='/result' element={<ResultPage userInfo={userInfo} />} />
        <Route path='/map' element={<MapPage userInfo={userInfo} />} />
      </Routes>
    </WholeContainer>
  );
}

export default App;
