import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className='w-full xl:w-10/12 h-screen mx-auto
                      flex flex-col justify-center items-center'>
        <header className='w-full h-28 p-5
                            flex justify-between items-center
                            bg-lime-100'>
          <p className='title text-7xl text-emerald-950 mt-1 w-5/12'>
            REACT 리액트
          </p>
          <p><Link to='/'><img className='w-16 h-16' src={home} alt='home' /></Link></p>
        </header>
        <main className='w-full flex-grow 
                          flex flex-col items-center 
                          overflow-y-auto'>
          
        </main>
        <footer className='w-full h-28 mt-2 flex-shrink-0
                            flex flex-col justify-center items-center
                            bg-green-950'>
          <p className='foot text-2xl text-yellow-100 my-4'>
            K-DIGIPAL 윤찬희
          </p>
          <p className="text-gray-300">© 2024 My Awesome App. All rights reserved.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
