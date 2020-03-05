import React, { useContext, useMemo, useEffect, useState } from 'react'
import { systemContext } from '../../context/system'
import { httpContext } from '../../context/http'

const IframeWrapper = props => {
  const { milvusAddress } = useContext(systemContext)
  const { currentAddress } = useContext(httpContext)
  const [url, setUrl] = useState("")
  const { type } = props
  const { prometheus = {}, elk = {} } = useMemo(() => {
    return milvusAddress[currentAddress] || {}
  }, [currentAddress, milvusAddress])

  useEffect(() => {
    switch (type) {
      case 'elk':
        setUrl(elk)
        break
      case 'prometheus':
        setUrl(prometheus)
        break
      default:
        return
    }

  }, [prometheus, elk, type])
  return (
    <iframe
      title="Ifram for milvus "
      width="100%"
      height={window.innerHeight + 'px'}
      style={{ background: "#fff" }}
      src={url}>
    </iframe>
  )
}

export default IframeWrapper