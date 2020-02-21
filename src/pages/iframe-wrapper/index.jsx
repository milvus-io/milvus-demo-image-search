import React, { useContext, useMemo, useEffect, useState } from 'react'
import { systemContext } from '../../context/system'
import { httpContext } from '../../context/http'
import { useHistory } from 'react-router-dom'

const IframeWrapper = props => {
  const history = useHistory()
  const { milvusAddress } = useContext(systemContext)
  const { currentAddress } = useContext(httpContext)
  const [url, setUrl] = useState("")
  const { logServer, pmServer } = useMemo(() => {
    return milvusAddress[currentAddress] || {}
  }, [currentAddress, milvusAddress])

  useEffect(() => {
    if (history.location.pathname.includes('logs')) {
      console.log(logServer)
      setUrl(logServer)
    } else {
      setUrl(pmServer)
    }
  }, [history.location.pathname, logServer, milvusAddress, pmServer])

  console.log(url)
  return (
    <iframe
      title="Ifram for milvus "
      width="100%"
      height="700px"
      src={url}>
    </iframe>
  )
}

export default IframeWrapper