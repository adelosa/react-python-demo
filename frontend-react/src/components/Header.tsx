import axios from "axios"

type HeaderProps = {
    clearToken: Function,
    token: string | null
}

function Header(props: HeaderProps) {
  
  function logMeOut() {
    axios({
      method: "POST",
      url:"http://localhost:5000/logout",
    })
    .then((_response) => {
       props.clearToken()
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

    return(
        <header className="App-header">
            <h1>Vite + React</h1>
            {props.token ?
            <button onClick={logMeOut}> 
                Logout
            </button>
            :
            <></>}
        </header>
    )
}

export default Header;

