import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import store from './store/configureStore';
import DetailPage from './pages/DetailPage';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import MyPage from './pages/MyPage';
import PostPage from './pages/PostPage';
import SignUpPage from './pages/SignUpPage';
import RoomListPage from './pages/RoomListPage';
import ChatPage from './pages/ChatPage';
import SearchPage from './pages/SearchPage';

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
          <Route path="/roomlist" element={<RoomListPage />} />
          <Route path="/chat/:roomId/:myid/:yourid/*" element={<ChatPage />} />
          <Route path="/search/:searchWord/*" element={<SearchPage />} />
        </Routes>
        <ToastContainer />
      </Router>
    </Provider>
  );
}

export default App;
