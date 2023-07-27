import axios from "axios"

type HeaderProps = {
    removeToken: Function,
    token: string | null
}

function Header(props: HeaderProps) {
  
  function logMeOut() {
    axios({
      method: "POST",
      url:"http://localhost:5000/logout",
    })
    .then((_response) => {
       props.removeToken()
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

    return(
        <header className="App-header">
            <h1>react-python-demo</h1>
            {props.token ?
            <button className='btn btn-primary' onClick={logMeOut}> 
                Logout
            </button>
            :
            <></>}
        </header>
    )
}

export default Header;

