import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store/configureStore';
import DetailPage from './pages/DetailPage';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import MyPage from './pages/MyPage';
import PostPage from './pages/PostPage';
import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path="/" element={<MainPage />}/>
          <Route path="/detail/:postId/*" element={<DetailPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/post" element={<PostPage/>} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
