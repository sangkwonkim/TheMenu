import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { WholeContainer, UserInfoContainer, PageContainer } from './AppStyle.js';
import LoginPage from './pages/LoginPage';
import IntroPage from './pages/IntroPage';
import MapPage from './pages/MapPage';
import MyPage from './pages/MyPage';
import SurveyPage from './pages/SurveyPage';
import SignupPage from './pages/SignupPage';
import ResultPage from './pages/ResultPage.js';
import Kakao from './pages/kakao'

function App () {
  const [userInfo, setUserInfo] = useState({email : '', nickName : ''});
  const [isLogin, setIsLogin] = useState(false);

  return (
    <WholeContainer>
      {isLogin === false
      ? <UserInfoContainer>가입 후 이용하시면 선택한 메뉴 저장할 수 있습니다.</ UserInfoContainer>
      : <UserInfoContainer>환영합니다. {userInfo.nickName}님</ UserInfoContainer> }
      <PageContainer >
        <Routes>
          <Route path='/' element={<IntroPage />} />
          <Route path='/survey' element={<SurveyPage />} />
          <Route path='/kakao' element={<Kakao setUserInfo={setUserInfo} setIsLogin={setIsLogin} />} />
          <Route path='/login' element={<LoginPage setUserInfo={setUserInfo} setIsLogin={setIsLogin} />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/mypage' element={<MyPage userInfo={userInfo} setUserInfo={setUserInfo} />} />
          <Route path='/result' element={<ResultPage userInfo={userInfo} />} />
          <Route path='/map' element={<MapPage userInfo={userInfo} />} />
        </Routes>
      </ PageContainer>
    </WholeContainer>
  );
}

export default App;
