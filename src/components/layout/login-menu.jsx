import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const LoginMenu = props => {
  const history = useHistory()

  useEffect(() => {
    history.push('/login')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>Login Menu</div>
  )
}

export default LoginMenu