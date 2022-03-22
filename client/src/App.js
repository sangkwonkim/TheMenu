import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { WholeContainer } from './AppStyle.js';
import LoginPage from './pages/LoginPage';
import IntroPage from './pages/IntroPage';
import MapPage from './pages/MapPage';
import MyPage from './pages/MyPage';
import QuestionPage from './pages/QuestionPage';
import SignupPage from './pages/SignupPage';

function App () {
  return (
    <WholeContainer>
      <Routes>
        <Route exact path='/' element={<IntroPage />} />
        <Route path='/question' element={<QuestionPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/myPage' element={<MyPage />} />
        <Route path='/map' element={<MapPage />} />
      </Routes>
    </WholeContainer>
  );
}

export default App;
