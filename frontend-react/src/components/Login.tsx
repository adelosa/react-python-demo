import { useState } from 'react';
import axios from "axios";

type LoginProps = {
    setToken: Function
}

function Login(props: LoginProps) {

    const [loginForm, setloginForm] = useState({
      email: "",
      password: "",
      message: ""
    })

    function logMeIn(event: { preventDefault: () => void; }) {
      axios({
        method: "POST",
        url:"http://localhost:5000/token",
        data:{
          email: loginForm.email,
          password: loginForm.password
         }
      })
      .then((response) => {
        props.setToken(response.data.access_token)
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          setloginForm(({email: loginForm.email ,password: loginForm.password, message: error.response.data["msg"]}))
        }
      })

      // setloginForm(({
      //   email: "",
      //   password: "",
      //   message: ""
      // }))

      event.preventDefault()
    }

    function handleChange(event: { target: { value: any; name: any; }; }) { 
      const {value, name} = event.target
      setloginForm(prevNote => ({
          ...prevNote, [name]: value})
      )}

    return (
      <div>
        <h2>Login</h2>
          <form className="login">
            <input onChange={handleChange} 
                  type="email"
                  name="email" 
                  placeholder="Email" 
                  value={loginForm.email} />
            <input onChange={handleChange} 
                  type="password"
                  name="password" 
                  placeholder="Password" 
                  value={loginForm.password} />

          <button className='btn btn-primary' onClick={logMeIn}>Submit</button>
        </form>
        <p>Message: { loginForm.message }</p>
      </div>
    );
}

export default Login;

