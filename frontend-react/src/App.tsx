import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Profile from './components/Profile'
import Header from './components/Header'
import useToken from './components/useToken'
import './App.css'

function App() {

  const [count, setCount] = useState(0)
  const { token, removeToken, setToken } = useToken()

  return (
    <BrowserRouter>
      <div className='App'>
        <Header removeToken={removeToken} token={token} />
        {!token && token !== "" && token !== undefined ?
          <Login setToken={setToken} />
          : (
            <>
              <Routes>
                <Route path="/profile" element={<Profile token={token} />}></Route>
              </Routes>
            </>
          )}
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </BrowserRouter>
  )
}

export default App
