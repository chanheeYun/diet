import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';
import Join from './component/Join';
import Foot from './component/Foot';
import Diet from './component/Diet';
import Train from './component/Train';
import Weight from './component/Weight';
import RouteNav from './component/RouteNav';
import Info from './component/Info';
import Welcome from './component/Welcome';
import logo from './img/logo2.svg';
import Asdf from './component/Asdf';
import Search from './component/Search';

function App() {
  let flag = false;

  return (
    <BrowserRouter>
      <div className='w-full h-screen mx-auto
                      flex flex-col justify-center items-center'>
        <header className='w-1/2 h-24'>
          <div className='w-full h-full flex justify-between items-center'>
            <div>
              <Link to='/'>
              <img className='w-16 h-16' src={logo} alt="logo" />
              </Link>
            </div>
            <RouteNav />
            <div className=''>
              <Link to='/login'>
                <button name='로그인(아웃)' className='nav p-3 pt-4 rounded-xl text-base hover:bg-slate-100 text-gray-400'>{!flag ? '로그인' : '로그아웃'}</button>
              </Link>
            </div>
          </div>
        </header>
        <main className='w-full h-full
                        flex justify-center items-center
                        bg-sky-100'>
          <Routes>
            <Route path='/temp' element={<Asdf />} />
            <Route path='/' element={<Home />} />
            <Route path='/diet' element={<Diet />} />
            <Route path='/train' element={<Train />} />
            <Route path='/weight' element={<Weight />} />
            <Route path='/info' element={<Info />} />
            <Route path='/login' element={<Login />} />
            <Route path='/join' element={<Join />} />
            <Route path='/welcome' element={<Welcome />} />
            <Route path='/search/:item' element={<Search />} />
          </Routes>
        </main>
        <footer className='w-full h-24 flex-shrink-0
                          flex flex-col justify-center items-center
                          bg-sky-950'>
          <Foot />
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
