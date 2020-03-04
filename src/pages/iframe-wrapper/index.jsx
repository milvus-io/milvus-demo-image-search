import React, { useContext, useMemo, useEffect, useState } from 'react'
import { systemContext } from '../../context/system'
import { httpContext } from '../../context/http'

const IframeWrapper = props => {
  const { milvusAddress } = useContext(systemContext)
  const { currentAddress } = useContext(httpContext)
  const [url, setUrl] = useState("")
  const { type } = props
  const { metrics = {}, elk = {} } = useMemo(() => {
    return milvusAddress[currentAddress] || {}
  }, [currentAddress, milvusAddress])

  useEffect(() => {
    switch (type) {
      case 'elk':
        setUrl(elk.address)
        break
      case 'metrics':
        setUrl(metrics.address)
        break
      default:
        return
    }

  }, [metrics, elk, type])
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