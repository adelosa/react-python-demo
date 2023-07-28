import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';

import Login from './components/Login'
import Profile from './components/Profile'
import Header from './components/Header'
import Nav from './components/Nav'
import useToken from './components/useToken'
import logout from './components/logout'

function App() {

  const { token, removeToken, setToken } = useToken()

  const logoutFunc = logout(removeToken)

  return (
    <div className='container-fluid'>
      <div className="row">
        {token ?
          <>
            <div className="col-sm-auto bg-light sticky-top">
              <div className="d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-center sticky-top">
                <Nav />
                <Dropdown>
                  <Dropdown.Toggle variant="" id="dropdown-basic">
                    <i className="bi-person-circle h2"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                    <Dropdown.Item onClick={logoutFunc}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </>
          :
          <></>}
        <div className="col-sm p-3 min-vh-100">
          {/* CONTENT AREA */}
          <BrowserRouter>
            <Header />
            {!token && token !== "" && token !== undefined ?
              <Login setToken={setToken} />
              : (
                <>
                  <Routes>
                    <Route path="/profile" element={<Profile token={token} setToken={setToken} />}></Route>
                  </Routes>
                </>
              )}
          </BrowserRouter>
        </div>
      </div>
    </div>
  )
}

export default App
