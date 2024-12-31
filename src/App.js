import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isLogined } from './recoil/Atoms';
import Home from './component/Home';
import Login from './component/Login';
import Join from './component/Join';
import Foot from './component/Foot';
import Diet from './component/Diet';
import Train from './component/Train';
import RouteNav from './component/RouteNav';
import Info from './component/Info';
import Welcome from './component/Welcome';
import logo from './img/logo2.svg';
import Asdf from './component/Asdf';
import Search from './component/Search';
import Logout from './component/Logout';
import { useEffect } from 'react';
import Management from './component/Management';

function App() {
  const [loginFlag, setLoginFlag] = useRecoilState(isLogined);

  useEffect(() => {
    // 앱이 로드될 때 JWT를 확인
    const token = sessionStorage.getItem('JWT');
    setLoginFlag(token !== null);
  }, [setLoginFlag]);

  const handleLogout = () => {
    sessionStorage.removeItem('JWT');
    setLoginFlag(false);
  };

  return (
    <BrowserRouter>
      <div className='w-full h-screen mx-auto
                      flex flex-col justify-center items-center'>
        <header className='w-2/5 flex-shrink-0'>
          <div className='w-full h-full flex justify-between items-center'>
            <div>
              <Link to='/'>
              <img className='w-16 h-16' src={logo} alt="logo" />
              </Link>
            </div>
            <RouteNav />
            <div className=''>
              {!loginFlag ?
                <Link to='/login'>
                  <button name='로그인' 
                          className='nav w-24 px-2 pt-1.5 
                                    rounded-xl text-base 
                                    hover:text-blue-500 text-gray-400'>
                    로그인
                  </button>
                </Link> : 
                <Logout handleClick={handleLogout} />
              }
            </div>
          </div>
        </header>
        <main className='w-full main 
                        flex justify-center items-center
                        bg-sky-100'>
          <Routes>
            <Route path='/temp' element={<Asdf />} />
            <Route path='/' element={<Home />} />
            <Route path='/diet' element={<Diet />} />
            <Route path='/train' element={<Train />} />
            <Route path='/manage' element={<Management />} />
            <Route path='/info' element={<Info />} />
            <Route path='/login' element={<Login />} />
            <Route path='/join' element={<Join />} />
            <Route path='/welcome' element={<Welcome />} />
            <Route path='/search/:item' element={<Search />} />
          </Routes>
        </main>
        <footer className='w-full flex-shrink-0
                          flex flex-col justify-center items-center
                          bg-sky-950'>
          <Foot />
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
