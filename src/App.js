import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Join from './component/Join';
import Login from './component/Login';
import Home from './component/Home';
import Diet from './component/Diet';
import Train from './component/Train';
import Weight from './component/Weight';

function App() {
  return (
    <BrowserRouter>
      <div className='w-full xl:w-10/12 h-screen mx-auto
                      flex flex-col justify-center items-center'>
        <header className='w-full h-28 p-5
                            flex justify-between items-center'>
          <div><Link to='/'><p className='text-4xl mt-1 w-full'>식단 운동 일지</p></Link></div>
          <div>
            <Link to='/login'><button name='로그인' className='bg-red-400'>로그인</button></Link>
            <Link to='/join'><button name='회원가입' className='bg-red-400'>회원가입</button></Link>
          </div>
        </header>
        <main className='w-full h-full
                        flex justify-center items-center'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/diet' element={<Diet />} />
            <Route path='/train' element={<Train />} />
            <Route path='/weight' element={<Weight />} />
            <Route path='/login' element={<Login />} />
            <Route path='/join' element={<Join />} />
          </Routes>
        </main>
        <footer className='w-full h-28 mt-2 flex-shrink-0
                            flex flex-col justify-center items-center'>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
