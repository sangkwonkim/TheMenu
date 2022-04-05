import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { WholeContainer } from './AppStyle.js';
import LoginPage from './pages/LoginPage';
import IntroPage from './pages/IntroPage';
import MapPage from './pages/MapPage';
import MyPage from './pages/MyPage';
import SurveyPage from './pages/SurveyPage';
import SignupPage from './pages/SignupPage';

function App () {
  const [userInfo, setUserInfo] = useState({email : '', nickName : ''})

  return (
    <WholeContainer>
      <Routes>
        <Route path='/' element={<IntroPage />} />
        <Route path='/survey' element={<SurveyPage userInfo={userInfo} />} />
        <Route path='/login' element={<LoginPage setUserInfo={setUserInfo} />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/myPage' element={<MyPage userInfo={userInfo} setUserInfo={setUserInfo} />} />
        <Route path='/map' element={<MapPage userInfo={userInfo} />} />
      </Routes>
    </WholeContainer>
  );
}

export default App;
