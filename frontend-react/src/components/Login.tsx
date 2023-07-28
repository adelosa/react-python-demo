import { useState } from 'react';
import axios from "axios";
import Form from "react-bootstrap/Form"
import { Alert, Button } from 'react-bootstrap';

type LoginProps = {
  setToken: Function
}

function Login(props: LoginProps) {

  const [loginForm, setloginForm] = useState({
    email: "",
    password: "",
    message: ""
  })

  const [validated, setValidated] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  const logMeIn: React.MouseEventHandler<HTMLButtonElement> =
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      
      axios({
        method: "POST",
        url: "http://localhost:5000/token",
        data: {
          email: loginForm.email,
          password: loginForm.password
        }
      })
        .then((response) => {
          props.setToken(response.data.access_token)
        }).catch((error) => {
          setShowAlert(true)
          if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            setloginForm(({ email: loginForm.email, password: loginForm.password, message: error.response.data["msg"] }))
          } else {
            setloginForm(({ email: loginForm.email, password: loginForm.password, message: "service unavailable" }))
          }
        })

      event.preventDefault()
    }
    
  function handleChange(event) {
    const { value, name } = event.target
    setloginForm(prevNote => ({
      ...prevNote, [name]: value
    })
    )
    const form = event.currentTarget;

    if (form && form.checkValidity() === false) {
      console.log("Validation failed")
      event.preventDefault();
      event.stopPropagation();
      setValidated(false);
      return
    }
    setValidated(true);

  }

  return (
    <>
      {showAlert ? <Alert dismissible show={showAlert} onClose={() => setShowAlert(false)} variant="danger">{loginForm.message}</Alert> : ""}
      <Form validated={validated}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>User Id</Form.Label>
          <Form.Control required name="email" onChange={handleChange} placeholder="User Id" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control required name="password" onChange={handleChange} type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="primary" onClick={logMeIn}>
          Login
        </Button>
      </Form>
    </>
  );
}

export default Login;

