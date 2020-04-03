import React, { useEffect, useState, useRef, useContext } from 'react'
import FileDrop from 'react-file-drop'
import Gallery from '../../components/Gallery'
import Cropper from '../../components/Cropper'
import { getImgUrl } from '../../utils/helpers'
import { CircularProgress } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import { httpContext } from '../../context/Http'
import "./index.less"

let timer = null
const Home = props => {
  const [show, setShow] = useState(false)
  const [imgs, setImgs] = useState([])
  const [loading, setLoading] = useState(false)
  const [globalLoading, setGlobalLoading] = useState(false)
  const [selectedImg, setSelectedImg] = useState("")
  const [blob, setBlob] = useState("")
  const [page, setPage] = useState(0)
  const [noData, setNoData] = useState(false)
  const dropRef = useRef(null)
  const inputRef = useRef(null)
  const { search } = useContext(httpContext)

  const handleDrop = (files, event) => {
    if (!files[0]) {
      return
    }
    const src = getImgUrl(files[0])
    setSelectedImg(files[0] ? src : "")
    setShow(false)
  }
  useEffect(() => {
    window.addEventListener("dragover", (e) => {
      // This prevents the browser from trying to load whatever file the user dropped on the window
      e.preventDefault();
      setShow(true)
    })
    window.addEventListener("dragleave", (e) => {
      e.preventDefault();
      setShow(false)
    })
    window.addEventListener("drop", (e) => {
      e.preventDefault();
      const inArea = e.path.includes(dropRef.current)
      if (!inArea) {
        setShow(false)
      }
    })

  }, [])

  const handleScroll = async e => {
    const { scrollTop, offsetHeight, scrollHeight } = e.currentTarget
    console.log(scrollHeight - scrollTop - offsetHeight, timer)
    if (scrollHeight - scrollTop - offsetHeight < 30 && !loading && !timer && imgs.length) {
      timer = setTimeout(async () => {
        setLoading(true)
        setPage(v => v + 1)
        await handleImgSearch(blob, false)
        timer = null
      }, 200)

    }
  }

  const handleInput = () => {
    inputRef.current.click()
  }

  const handleInputChange = async (e) => {
    const file = inputRef.current.files[0] || ""
    if (!file) {
      return
    }
    const src = getImgUrl(file)
    setSelectedImg(file ? src : "")
  }


  const handleImgSearch = async (file, reset = true) => {
    if (reset) {
      setImgs([])
      setPage(0)
      setGlobalLoading(true)
      setNoData(false)

    }
    const fd = new FormData()
    fd.append("file", file)
    fd.append("Num", 30)
    fd.append("Page", page)

    setBlob(file)
    const res = await search(fd)
    if (!res.length) {
      setNoData(true)
      return
    }
    setImgs(v => ([
      ...v,
      ...res.map(v => ({
        src: v[0],
        distance: v[1]
      }))
    ]))
  }
  const handleSearch = src => {
    setSelectedImg(src)
  }

  return <div className="home-wrapper">
    <div className={`file-drop ${show && 'open'}`} ref={dropRef}>
      <FileDrop onDrop={handleDrop} className="target" >
        <div className="tip" >Drop Image here!</div>
      </FileDrop>
    </div>
    <div className={`cropper-wrapper ${selectedImg && 'show'}`}>
      <Cropper src={selectedImg} propSend={handleImgSearch} className="crop-img-wrapper" imgClassName="crop-img"></Cropper>
    </div>
    <div className="imgs-wrapper" onScroll={handleScroll}>
      {
        imgs.length ? <Gallery
          handleSearch={handleSearch}
          setLoading={setLoading}
          setGlobalLoading={setGlobalLoading}
          imgs={imgs}
        ></Gallery> : ""
      }
      {
        globalLoading && (<div className="global-loading-wrapper">
          <CircularProgress></CircularProgress>
        </div>)
      }
      {
        loading && !noData && (<div className="loading-wrapper">
          <CircularProgress></CircularProgress>
        </div>)
      }
      {
        noData && (<p style={{ textAlign: "center" }}>No More Data.</p>)
      }
    </div>
    <span className="upload" onClick={handleInput}>
      <Search></Search>
    </span>
    <input type="file" ref={inputRef} className="input" onChange={handleInputChange}></input>

  </div>
}

export default Home