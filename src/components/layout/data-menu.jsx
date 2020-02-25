import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const DataMenu = props => {
  const history = useHistory()

  useEffect(() => {
    history.push('/data/table')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>Data Menu</div>
  )
}

export default DataMenu