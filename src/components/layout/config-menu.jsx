import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
const ConfigMenu = props => {
  const history = useHistory()
  useEffect(() => {
    history.push('/configs/storage')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>Config Menu</div>
  )
}

export default ConfigMenu