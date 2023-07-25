import { useState } from 'react'

type SetToken = {
    token: string | null,
    setToken: Function,
    removeToken: Function
}

function useToken() : SetToken {

  function getToken() : string | null{
    const userToken = localStorage.getItem('token')
    return userToken && userToken
  }

  const [token, setToken] = useState(getToken())

  function saveToken(userToken: string) {
    localStorage.setItem('token', userToken)
    setToken(userToken);
  }

  function removeToken() {
    localStorage.removeItem("token")
    setToken(null);
  }

  return {
    setToken: saveToken,
    token,
    removeToken
  }

}

export default useToken
